// ===== EVENT LISTENERS =====
// Manejo de todos los eventos de la aplicación

function initEvents(){
  // Event listeners para botones principales
  document.getElementById('whatsapp').addEventListener('click',function(){
    var btn = this;
    btn.classList.add('anim-bump');
    setTimeout(function(){ btn.classList.remove('anim-bump'); }, 320);
    sendWhatsApp();
  });
  
  document.getElementById('clear').addEventListener('click',function(){ 
    var btn = this;
    btn.classList.add('anim-shake');
    setTimeout(function(){ btn.classList.remove('anim-shake'); }, 250);
    state.cart={}; 
    render(); 
  });
  
  // Event listeners para filtros
  document.getElementById('search').addEventListener('input',applyFilters);
  document.getElementById('order').addEventListener('change',applyFilters);
}
