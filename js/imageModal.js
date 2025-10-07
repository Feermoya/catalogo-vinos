// ===== FUNCIONALIDAD DEL MODAL DE IMAGEN =====
// Manejo del modal para ver imágenes de vinos en tamaño completo

function openImageModal(imageSrc, wineName){
  var imageModal = document.getElementById('image-modal');
  var modalImage = document.getElementById('modal-image');
  
  modalImage.src = imageSrc;
  modalImage.alt = wineName;
  imageModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeImageModal(){
  var imageModal = document.getElementById('image-modal');
  imageModal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function initImageModal(){
  // Event listeners para modal de imagen
  document.getElementById('close-image').addEventListener('click', closeImageModal);
  document.getElementById('image-modal').addEventListener('click', function(event){
    if(event.target == this){
      closeImageModal();
    }
  });
  
  // Cerrar con tecla Escape
  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape'){
      var imageModal = document.getElementById('image-modal');
      var wineModal = document.getElementById('wine-modal');
      if(imageModal.style.display === 'block'){
        closeImageModal();
      } else if(wineModal.style.display === 'block'){
        closeModal();
      }
    }
  });
}
