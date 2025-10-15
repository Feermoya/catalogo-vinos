// ===== SISTEMA DE DESCUENTOS POR VOLUMEN =====
// Sistema modular de descuentos que NO afecta la lógica existente
// Creado: 2025-10-15

// =============================================
// CONFIGURACIÓN DE DESCUENTOS (FÁCIL DE EDITAR)
// =============================================

var DISCOUNT_CONFIG = {
  enabled: true, // Cambiar a false para desactivar descuentos completamente
  tiers: [
    { minBottles: 10, discount: 20, label: '10+ vinos' },
    { minBottles: 6,  discount: 18, label: '6-9 vinos' },
    { minBottles: 4,  discount: 15, label: '4-5 vinos' },
    { minBottles: 3,  discount: 15, label: '3 vinos' },
    { minBottles: 2,  discount: 10, label: '2 vinos' }
  ]
};

// =============================================
// FUNCIÓN PRINCIPAL: CALCULAR DESCUENTO
// =============================================

/**
 * Calcula el descuento aplicable según la cantidad de vinos
 * @param {number} totalBottles - Cantidad total de botellas en el carrito
 * @returns {Object} { percentage: number, amount: number, tier: Object|null }
 */
function calculateDiscount(totalBottles, subtotal){
  // Si los descuentos están deshabilitados, retornar 0
  if(!DISCOUNT_CONFIG.enabled){
    return { percentage: 0, amount: 0, tier: null };
  }
  
  // Si no hay suficientes botellas, no hay descuento
  if(totalBottles < 2){
    return { percentage: 0, amount: 0, tier: null };
  }
  
  // Buscar el tier de descuento aplicable (ya están ordenados de mayor a menor)
  var applicableTier = null;
  for(var i = 0; i < DISCOUNT_CONFIG.tiers.length; i++){
    var tier = DISCOUNT_CONFIG.tiers[i];
    if(totalBottles >= tier.minBottles){
      applicableTier = tier;
      break;
    }
  }
  
  // Si no encontramos tier, no hay descuento
  if(!applicableTier){
    return { percentage: 0, amount: 0, tier: null };
  }
  
  // Calcular monto del descuento
  var discountAmount = Math.round(subtotal * (applicableTier.discount / 100));
  
  return {
    percentage: applicableTier.discount,
    amount: discountAmount,
    tier: applicableTier
  };
}

// =============================================
// FUNCIONES DE CÁLCULO DE TOTALES
// =============================================

/**
 * Calcula subtotal, descuento y total del carrito
 * @param {Object} cart - Objeto del carrito con productos
 * @param {Array} products - Array de productos disponibles
 * @returns {Object} { subtotal, discount, total, bottles, discountInfo }
 */
function calculateCartTotals(cart, products){
  var subtotal = 0;
  var totalBottles = 0;
  
  // Calcular subtotal y cantidad de botellas
  for(var productId in cart){
    var quantity = cart[productId];
    var product = null;
    
    // Buscar producto
    for(var i = 0; i < products.length; i++){
      if(products[i].id === productId){
        product = products[i];
        break;
      }
    }
    
    if(!product) continue;
    
    subtotal += quantity * product.precio;
    totalBottles += quantity;
  }
  
  // Calcular descuento
  var discountInfo = calculateDiscount(totalBottles, subtotal);
  
  // Total final
  var total = subtotal - discountInfo.amount;
  
  return {
    subtotal: subtotal,
    discount: discountInfo.amount,
    discountPercentage: discountInfo.percentage,
    total: total,
    bottles: totalBottles,
    discountInfo: discountInfo
  };
}

// =============================================
// FUNCIONES DE FORMATO VISUAL
// =============================================

/**
 * Genera HTML para mostrar el desglose de precios
 * @param {Object} totals - Resultado de calculateCartTotals()
 * @returns {string} HTML formateado
 */
function formatPriceBreakdown(totals){
  if(!totals.discount || totals.discount === 0){
    // Sin descuento
    return '<div style="font-size:24px; font-weight:800; color:var(--accent);">' + 
           money(totals.total) + 
           '</div>';
  }
  
  // Con descuento
  var html = '<div style="display:flex; flex-direction:column; gap:8px;">';
  
  // Subtotal
  html += '<div style="display:flex; justify-content:space-between; align-items:center; font-size:14px;">';
  html += '<span style="color:#666;">Subtotal:</span>';
  html += '<span style="font-weight:600;">'+money(totals.subtotal)+'</span>';
  html += '</div>';
  
  // Descuento
  html += '<div style="display:flex; justify-content:space-between; align-items:center; font-size:14px; color:#25D366;">';
  html += '<span>🎉 Descuento ('+totals.discountPercentage+'% por '+totals.bottles+' vinos):</span>';
  html += '<span style="font-weight:700;">-'+money(totals.discount)+'</span>';
  html += '</div>';
  
  // Total
  html += '<div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; border-top:2px solid #e0e0e0;">';
  html += '<span style="font-size:18px; font-weight:700;">Total:</span>';
  html += '<span style="font-size:24px; font-weight:800; color:var(--accent);">'+money(totals.total)+'</span>';
  html += '</div>';
  
  html += '</div>';
  
  return html;
}

/**
 * Genera badge de descuento para mostrar en el carrito
 * @param {Object} totals - Resultado de calculateCartTotals()
 * @returns {string} HTML del badge o string vacío
 */
function formatDiscountBadge(totals){
  if(!totals.discount || totals.discount === 0){
    return '';
  }
  
  return '<div style="background:#25D366; color:white; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:600; display:inline-block; margin-left:8px;">'+
         '🎉 -'+totals.discountPercentage+'%'+
         '</div>';
}

/**
 * Genera mensaje de incentivo para el siguiente nivel de descuento
 * @param {Object} totals - Resultado de calculateCartTotals()
 * @returns {string} HTML del mensaje o string vacío
 */
function formatDiscountIncentive(totals){
  if(!DISCOUNT_CONFIG.enabled) return '';
  
  var currentBottles = totals.bottles;
  var nextTier = null;
  
  // Buscar el siguiente tier disponible
  for(var i = DISCOUNT_CONFIG.tiers.length - 1; i >= 0; i--){
    var tier = DISCOUNT_CONFIG.tiers[i];
    if(currentBottles < tier.minBottles){
      nextTier = tier;
      break;
    }
  }
  
  if(!nextTier) return ''; // Ya está en el tier máximo
  
  var bottlesNeeded = nextTier.minBottles - currentBottles;
  
  return '<div style="background:linear-gradient(135deg, #fff8f0, #f6f0e8); padding:8px 12px; border-radius:8px; font-size:12px; color:var(--accent); text-align:center; margin-top:8px;">'+
         '💡 ¡Agregá '+bottlesNeeded+' vino'+(bottlesNeeded > 1 ? 's' : '')+' más y obtené '+nextTier.discount+'% de descuento!'+
         '</div>';
}

// =============================================
// FUNCIÓN PARA MENSAJE DE WHATSAPP
// =============================================

/**
 * Genera el texto de WhatsApp con descuentos incluidos
 * @param {Object} cart - Carrito de compras
 * @param {Array} products - Lista de productos
 * @returns {string} Texto formateado para WhatsApp
 */
function buildWhatsAppTextWithDiscounts(cart, products){
  var lines = ['Hola! Quiero pedir estos vinos:', ''];
  var totals = calculateCartTotals(cart, products);
  
  // Listar productos
  for(var productId in cart){
    var quantity = cart[productId];
    var product = null;
    
    for(var i = 0; i < products.length; i++){
      if(products[i].id === productId){
        product = products[i];
        break;
      }
    }
    
    if(!product) continue;
    
    lines.push('• ' + product.nombre + ' x' + quantity + ' — ' + money(product.precio));
  }
  
  lines.push('');
  
  // Mostrar subtotal si hay descuento
  if(totals.discount > 0){
    lines.push('Subtotal: ' + money(totals.subtotal));
    lines.push('Descuento (' + totals.discountPercentage + '% por ' + totals.bottles + ' vinos): -' + money(totals.discount));
    lines.push('');
  }
  
  lines.push('Total: ' + money(totals.total));
  
  return lines.join('\n');
}

