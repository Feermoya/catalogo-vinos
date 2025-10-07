// ===== FUNCIONALIDAD DEL MODAL =====
// Manejo del modal para agregar nuevos vinos

function initModal(){
  var modal = document.getElementById('wine-modal');
  var addWineBtn = document.getElementById('add-wine');
  var closeBtn = document.getElementsByClassName('close')[0];
  var cancelBtn = document.getElementById('cancel-wine');
  var wineForm = document.getElementById('wine-form');

  // Abrir modal
  addWineBtn.addEventListener('click', function(){
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  });

  // Cerrar modal
  function closeModal(){
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    wineForm.reset(); // Limpiar formulario
  }

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Cerrar al hacer click fuera del modal
  window.addEventListener('click', function(event){
    if(event.target == modal){
      closeModal();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape' && modal.style.display === 'block'){
      closeModal();
    }
  });

  // Manejar envío del formulario
  wineForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    // Obtener datos del formulario
    var nombre = document.getElementById('wine-name').value.trim();
    var bodega = document.getElementById('wine-bodega').value.trim();
    var variedad = document.getElementById('wine-variedad').value.trim();
    var ml = parseInt(document.getElementById('wine-ml').value);
    var precio = parseInt(document.getElementById('wine-precio').value);
    var foto = document.getElementById('wine-foto').value.trim();

    // Validar campos requeridos
    if(!nombre || !bodega || !variedad || !precio){
      alert('Por favor completa todos los campos obligatorios (*)');
      return;
    }

    // Generar nuevo ID
    var newId = (PRODUCTOS.length + 1).toString();

    // Crear nuevo vino
    var nuevoVino = {
      id: newId,
      nombre: nombre,
      bodega: bodega,
      variedad: variedad,
      ml: ml,
      precio: precio,
      foto: foto
    };

    // Agregar a la lista
    PRODUCTOS.push(nuevoVino);
    
    // Actualizar estado y renderizar
    state.rows = PRODUCTOS.slice();
    applyFilters(); // Esto también llama a render()
    
    // Cerrar modal
    closeModal();
    
    // Mostrar confirmación
    alert('✅ ¡Vino agregado exitosamente!');
  });
}
