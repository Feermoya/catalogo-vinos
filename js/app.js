// ===== APLICACIÓN PRINCIPAL =====
// Manejo del estado global y funciones principales

var state = { 
  rows: PRODUCTOS.slice(), 
  filtered: PRODUCTOS.slice(), 
  cart: {} 
};

// Función para formatear dinero
function money(n){ 
  return n.toLocaleString('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}); 
}

// Función principal de renderizado
function render(){
  var grid = document.getElementById('grid');
  var html = '';
  
  for(var i=0;i<state.filtered.length;i++){
    var r = state.filtered[i];
        html += "<div class='card'>"+
          (r.foto? ("<img class='thumb' src='"+r.foto+"' alt='"+r.nombre+"' onclick='openImageModal(\""+r.foto+"\", \""+r.nombre+"\")'/>") : "<div class='ph'>🍷</div>")+
      "<div class='body'>"+
        "<div class='name'>"+r.nombre+"</div>"+
        "<div class='meta'>"+r.bodega+" · "+r.variedad+" · "+r.ml+" ml</div>"+
        "<div class='price'>"+money(r.precio)+"</div>"+
        "<div class='qty'>"+
          "<button class='iconbtn iconbtn--minus' onclick=\"sub('"+r.id+"')\">−</button>"+
          "<span class='count'>"+(state.cart[r.id]||0)+"</span>"+
          "<button class='iconbtn iconbtn--plus' onclick=\"add('"+r.id+"')\">+</button>"+
        "</div>"+
      "</div>"+
    "</div>";
  }
  
  grid.innerHTML = html;
  renderCart();
}

// Función para agregar productos al carrito
function add(id){ 
  state.cart[id] = (state.cart[id]||0) + 1; 
  updateCartDisplay(id); // Solo actualizar el contador específico
  renderCart();
  
  // Animar el botón de WhatsApp
  var btn = document.getElementById('whatsapp');
  btn.classList.remove('anim-pulse');
  setTimeout(function(){ btn.classList.add('anim-pulse'); }, 10);
}

// Función para quitar productos del carrito
function sub(id){ 
  if(state.cart[id]){ 
    state.cart[id] = Math.max(0, state.cart[id]-1); 
    if(!state.cart[id]) delete state.cart[id]; 
    updateCartDisplay(id); // Solo actualizar el contador específico
    renderCart();
  } 
}

// Función para actualizar solo el contador de un producto específico
function updateCartDisplay(productId){
  var countElement = document.querySelector('[onclick="sub(\''+productId+'\')"]').parentElement.querySelector('.count');
  if(countElement){
    countElement.textContent = state.cart[productId] || 0;
  }
}

// Función para renderizar el carrito
function renderCart(){
  var total=0, items=0;
  
  for(var pid in state.cart){
    var q = state.cart[pid];
    var r = null;
    for(var i=0;i<state.rows.length;i++){ 
      if(state.rows[i].id===pid){ r=state.rows[i]; break; } 
    }
    if(!r) continue; 
    total += q * r.precio; 
    items += q;
  }
  
  // ===== INTEGRACIÓN CON SISTEMA DE DESCUENTOS =====
  // Si existe la función de descuentos, calcular total con descuento
  var displayTotal = total;
  var discountBadge = '';
  
  if(typeof calculateCartTotals === 'function'){
    var totals = calculateCartTotals(state.cart, state.rows);
    displayTotal = totals.total;
    
    // Agregar badge de descuento si existe
    if(totals.discount > 0){
      discountBadge = ' <span style="background:#25D366; color:white; padding:2px 6px; border-radius:8px; font-size:10px; font-weight:600;">🎉 -'+totals.discountPercentage+'%</span>';
    }
  }
  
  document.getElementById('cart-total').innerHTML = money(displayTotal) + discountBadge;
  document.getElementById('cart-items').textContent = '('+items+')';
  
  var hasItems = items>0;
  document.getElementById('whatsapp').disabled = !hasItems;
  document.getElementById('clear').disabled = !hasItems;
  
  // Actualizar carrito flotante
  updateFloatingCart();
}

// Función para aplicar filtros y ordenamiento
function applyFilters(){
  var q = document.getElementById('search').value.trim().toLowerCase();
  var order = document.getElementById('order').value;
  var arr = [];
  
  for(var i=0;i<state.rows.length;i++){
    var r = state.rows[i];
    var txt = (r.nombre+' '+r.bodega+' '+r.variedad).toLowerCase();
    if(!q || txt.indexOf(q)>-1) arr.push(r);
  }
  
  if(order==='name-asc') arr.sort(function(a,b){ return a.nombre.localeCompare(b.nombre); });
  if(order==='price-asc') arr.sort(function(a,b){ return a.precio-b.precio; });
  if(order==='price-desc') arr.sort(function(a,b){ return b.precio-a.precio; });
  
  state.filtered = arr; 
  render();
}

// Función para construir el texto de WhatsApp
function buildWhatsAppText(){
  // ===== INTEGRACIÓN CON SISTEMA DE DESCUENTOS =====
  // Si existe la función de descuentos, usarla
  if(typeof buildWhatsAppTextWithDiscounts === 'function'){
    return buildWhatsAppTextWithDiscounts(state.cart, state.rows);
  }
  
  // Fallback: versión original sin descuentos
  var lines=['Hola! Quiero pedir estos vinos:',''];
  var total=0;
  
  for(var pid in state.cart){
    var q = state.cart[pid];
    var r=null; 
    for(var i=0;i<state.rows.length;i++){ 
      if(state.rows[i].id===pid){ r=state.rows[i]; break; } 
    }
    if(!r) continue; 
    total += q*r.precio; 
    lines.push('• '+r.nombre+' x'+q+' — '+money(r.precio));
  }
  
  lines.push('');
  lines.push('Total: '+money(total));
  return lines.join('\n');
}

// Función para enviar por WhatsApp
function sendWhatsApp(){
  var empty = true; 
  for(var k in state.cart){ empty=false; break; }
  if(empty) return;
  
  var text = buildWhatsAppText();
  location.href = 'https://wa.me/'+WHATSAPP_PHONE+'?text='+encodeURIComponent(text);
}
