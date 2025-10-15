// ===== SISTEMA DE SUGERENCIAS INTELIGENTES =====
// Sugiere vinos para alcanzar el siguiente nivel de descuento
// Creado: 2025-10-15

// =============================================
// CONFIGURACIÓN DE SUGERENCIAS
// =============================================

var SUGGESTIONS_CONFIG = {
  enabled: true,
  maxSuggestions: 1, // Solo 1 vino sugerido - eliminar decisión
  strategy: 'best-value-for-next-tier' // Estrategia: mejor valor para el siguiente tier
};

// =============================================
// FUNCIÓN PRINCIPAL: GENERAR SUGERENCIAS
// =============================================

/**
 * Genera sugerencias inteligentes de vinos para alcanzar el siguiente tier de descuento
 * @param {Object} cart - Carrito actual
 * @param {Array} products - Lista de productos disponibles
 * @param {Object} totals - Totales calculados del carrito
 * @returns {Array} Array de sugerencias con vino y monto necesario
 */
function generateSmartSuggestions(cart, products, totals){
  if(!SUGGESTIONS_CONFIG.enabled || !typeof calculateCartTotals === 'function'){
    return [];
  }
  
  // Si ya está en el tier máximo, no sugerir nada
  var currentBottles = totals.bottles;
  var maxTier = DISCOUNT_CONFIG.tiers[0]; // El primer tier es el máximo
  if(currentBottles >= maxTier.minBottles){
    return [];
  }
  
  // Si ya se agregó un producto sugerido, no mostrar más sugerencias
  if(window.suggestedProductAdded){
    return [];
  }
  
  // Encontrar el siguiente tier disponible
  var nextTier = null;
  for(var i = DISCOUNT_CONFIG.tiers.length - 1; i >= 0; i--){
    var tier = DISCOUNT_CONFIG.tiers[i];
    if(currentBottles < tier.minBottles){
      nextTier = tier;
      break;
    }
  }
  
  if(!nextTier) return []; // No hay siguiente tier
  
  var bottlesNeeded = nextTier.minBottles - currentBottles;
  var suggestions = [];
  
  // Estrategia 1: Buscar vinos que ya están en el carrito (para aumentar cantidad)
  // SOLO si necesita exactamente 1 botella más
  if(bottlesNeeded === 1){
    for(var productId in cart){
      var product = products.find(p => p.id === productId);
      if(!product) continue;
      
      // Verificar stock disponible
      var currentQuantity = cart[productId];
      var stockAvailable = product.stock !== undefined ? product.stock - currentQuantity : 999;
      
      if(stockAvailable > 0){
        suggestions.push({
          product: product,
          type: 'increase_quantity',
          bottlesToAdd: 1,
          additionalCost: product.precio,
          reason: 'Ya en tu carrito',
          priority: 1 // Alta prioridad porque ya lo tiene
        });
      }
    }
  }
  
  // Estrategia 2: Buscar vinos nuevos que no están en el carrito
  var availableProducts = products.filter(function(product){
    // No sugerir si ya está en el carrito
    if(cart[product.id]) return false;
    
    // No sugerir si ya fue agregado como sugerencia
    if(window.suggestedProductAdded === product.id) return false;
    
    // No sugerir si no tiene stock
    var stockAvailable = product.stock !== undefined ? product.stock : 999;
    if(stockAvailable <= 0) return false;
    
    // No sugerir el combo del mes (ID 0)
    if(product.id === "0") return false;
    
    return true;
  });
  
  // Ordenar por precio (más baratos primero para facilitar la decisión)
  availableProducts.sort(function(a, b){
    return a.precio - b.precio;
  });
  
  // Agregar vinos nuevos a las sugerencias - VARIAR las sugerencias
  var startIndex = Math.floor(Math.random() * Math.min(3, availableProducts.length)); // Elegir entre los 3 más baratos
  
  for(var i = startIndex; i < Math.min(startIndex + 1, availableProducts.length); i++){
    var product = availableProducts[i];
    var bottlesToAdd = Math.min(bottlesNeeded, product.stock || 1);
    
    suggestions.push({
      product: product,
      type: 'new_product',
      bottlesToAdd: bottlesToAdd,
      additionalCost: product.precio * bottlesToAdd,
      reason: 'Perfecto para tu pedido',
      priority: 2 // Prioridad media
    });
  }
  
  // Ordenar sugerencias por costo (más baratas primero)
  suggestions.sort(function(a, b){
    return a.additionalCost - b.additionalCost;
  });
  
  // Retornar SOLO la mejor sugerencia (la más barata)
  return suggestions.slice(0, 1);
}

// =============================================
// FUNCIÓN PARA FORMATEAR SUGERENCIAS EN HTML
// =============================================

/**
 * Genera HTML para mostrar las sugerencias en el modal del carrito
 * @param {Array} suggestions - Array de sugerencias
 * @param {Object} totals - Totales del carrito
 * @returns {string} HTML formateado
 */
function formatSuggestionsHTML(suggestions, totals){
  if(!suggestions || suggestions.length === 0){
    // Si no hay sugerencias, mostrar botón de WhatsApp prominente
    return '<div style="background:linear-gradient(135deg, #fff8f0, #f6f0e8); border:2px solid #e9ecef; border-radius:12px; padding:20px; margin-top:16px; text-align:center;">' +
           '<div style="font-size:20px; font-weight:700; color:var(--accent); margin-bottom:12px;">' +
           '🎉 ¡Perfecto! Ya tenés el mejor descuento' +
           '</div>' +
           '<div style="font-size:14px; color:#666; margin-bottom:20px;">' +
           'Tu pedido está listo para enviar' +
           '</div>' +
           '<button onclick="closeCartModal(); sendWhatsApp();" style="background:linear-gradient(135deg, #25D366, #20BA5A); color:white; border:none; padding:16px 32px; border-radius:12px; font-size:18px; font-weight:700; cursor:pointer; transition:all .2s ease; box-shadow:0 6px 20px rgba(37,211,102,0.4);">' +
           '📱 Enviar Pedido por WhatsApp' +
           '</button>' +
           '</div>';
  }
  
  var nextTier = null;
  var currentBottles = totals.bottles;
  
  // Encontrar el siguiente tier
  for(var i = DISCOUNT_CONFIG.tiers.length - 1; i >= 0; i--){
    var tier = DISCOUNT_CONFIG.tiers[i];
    if(currentBottles < tier.minBottles){
      nextTier = tier;
      break;
    }
  }
  
  if(!nextTier) return '';
  
  var bottlesNeeded = nextTier.minBottles - currentBottles;
  var suggestion = suggestions[0]; // Solo mostramos 1 sugerencia
  var product = suggestion.product;
  
  // Calcular el ahorro total si agrega este vino
  var newSubtotal = totals.subtotal + suggestion.additionalCost;
  var newDiscount = Math.round(newSubtotal * (nextTier.discount / 100));
  var newTotal = newSubtotal - newDiscount;
  var totalSavings = newDiscount - totals.discount;
  
  var html = '<div style="background:linear-gradient(135deg, #fff8f0, #f6f0e8); border:2px solid #e9ecef; border-radius:12px; padding:16px; margin-top:16px;">';
  
  // Título principal - mensaje directo y claro
  html += '<div style="text-align:center; margin-bottom:16px;">';
  html += '<div style="font-size:18px; font-weight:700; color:var(--accent); margin-bottom:8px;">';
  html += '💡 Agregá 1 vino más y ahorrá ' + money(totalSavings);
  html += '</div>';
  html += '<div style="font-size:14px; color:#666; margin-bottom:12px;">';
  html += 'Recomendamos: ' + product.nombre;
  html += '</div>';
  html += '</div>';
  
  // Información del vino sugerido
  html += '<div style="display:flex; gap:12px; padding:12px; background:white; border-radius:8px; border:1px solid #e9ecef; align-items:center; margin-bottom:12px;">';
  
  // Imagen del vino
  html += '<img src="' + (product.foto || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect fill="%23efe7db"/><text x="30" y="38" text-anchor="middle" font-size="20">🍷</text></svg>') + '" style="width:60px; height:60px; object-fit:cover; border-radius:8px;">';
  
  // Información del vino
  html += '<div style="flex:1; min-width:0;">';
  html += '<div style="font-weight:700; font-size:16px; margin-bottom:4px;">' + product.nombre + '</div>';
  html += '<div style="color:#666; font-size:13px; margin-bottom:6px;">' + product.bodega + ' · ' + product.variedad + '</div>';
  html += '<div style="color:var(--accent); font-weight:700; font-size:14px;">' + money(product.precio) + '</div>';
  html += '</div>';
  
  html += '</div>';
  
  // Botón principal - grande y claro
  html += '<button onclick="addSuggestedProduct(\'' + product.id + '\', ' + suggestion.bottlesToAdd + ')" style="background:linear-gradient(135deg, #25D366, #20BA5A); color:white; border:none; padding:12px 24px; border-radius:10px; font-size:16px; font-weight:700; cursor:pointer; transition:all .2s ease; width:100%; box-shadow:0 4px 12px rgba(37,211,102,0.3);">';
  html += '💰 ¡Quiero ahorrar ' + money(totalSavings) + '!';
  html += '</button>';
  
  // Información adicional del ahorro
  html += '<div style="text-align:center; margin-top:12px; font-size:12px; color:#666;">';
  html += 'Total final: ' + money(newTotal) + ' (ahorrás ' + money(totalSavings) + ')';
  html += '</div>';
  
  // Cierre del contenedor
  html += '</div>';
  
  return html;
}

// =============================================
// FUNCIÓN PARA AGREGAR PRODUCTO SUGERIDO
// =============================================

/**
 * Agrega un producto sugerido al carrito desde el modal
 * @param {string} productId - ID del producto
 * @param {number} quantity - Cantidad a agregar
 */
function addSuggestedProduct(productId, quantity){
  // Verificar stock disponible
  var product = null;
  for(var i = 0; i < state.rows.length; i++){
    if(state.rows[i].id === productId){
      product = state.rows[i];
      break;
    }
  }
  
  if(!product) return;
  
  var cantidadActual = state.cart[productId] || 0;
  var cantidadTotal = cantidadActual + quantity;
  
  // Verificar stock
  if(product.stock !== undefined && cantidadTotal > product.stock){
    return; // No hay suficiente stock
  }
  
  // Agregar al carrito SOLO la cantidad especificada
  state.cart[productId] = cantidadTotal;
  
  // Guardar carrito en localStorage
  localStorage.setItem('cart', JSON.stringify(state.cart));
  
  // Marcar que ya no mostrar más sugerencias para este producto
  window.suggestedProductAdded = productId;
  
  // Actualizar la interfaz
  updateCartDisplay(productId);
  renderCart();
  render();
  
  // Cerrar y reabrir el modal para mostrar las actualizaciones
  closeCartModal();
  setTimeout(function(){
    openCartModal();
  }, 100);
}

// =============================================
// FUNCIÓN PARA CALCULAR AHORRO POTENCIAL
// =============================================

/**
 * Calcula cuánto ahorraría el cliente con la sugerencia
 * @param {Object} currentTotals - Totales actuales
 * @param {number} additionalCost - Costo adicional de la sugerencia
 * @param {number} nextTierDiscount - Descuento del siguiente tier
 * @returns {Object} { totalSavings, netSavings }
 */
function calculatePotentialSavings(currentTotals, additionalCost, nextTierDiscount){
  var newSubtotal = currentTotals.subtotal + additionalCost;
  var newDiscount = Math.round(newSubtotal * (nextTierDiscount / 100));
  var newTotal = newSubtotal - newDiscount;
  
  var totalSavings = newDiscount;
  var netSavings = totalSavings - additionalCost;
  
  return {
    totalSavings: totalSavings,
    netSavings: netSavings,
    newTotal: newTotal
  };
}
