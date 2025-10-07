// ===== CARRITO FLOTANTE =====
// Manejo del carrito flotante que sigue al usuario

function updateFloatingCart(){
  var floatingCart = document.getElementById('floating-cart');
  var floatingItems = document.querySelector('.floating-cart-items');
  var floatingTotal = document.querySelector('.floating-cart-total');
  
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
  
  if(items > 0){
    floatingItems.textContent = items;
    floatingTotal.textContent = money(total);
    floatingCart.classList.add('show');
  } else {
    floatingCart.classList.remove('show');
  }
}

// Función para hacer scroll al carrito principal
function scrollToCart(){
  var cartbar = document.querySelector('.cartbar');
  cartbar.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Destacar el carrito por un momento
  cartbar.style.background = 'linear-gradient(135deg, #8b3a3a, var(--accent))';
  setTimeout(function(){
    cartbar.style.background = '#1f1b18';
  }, 1000);
}
