import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

// Inicializa un lightbox por cada .pswp-gallery presente en el DOM
function initAllGalleries () {
  document.querySelectorAll<HTMLElement>('.pswp-gallery').forEach(el => {
    // evita inicializar dos veces
    if (el.dataset.pswpInit === '1') return
    const id = el.id ? `#${el.id}` : '.pswp-gallery' // por si acaso

    const lb = new PhotoSwipeLightbox({
      gallery: id,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      showHideAnimationType: 'zoom',
      wheelToZoom: true,
      preload: [1, 2],
      secondaryZoomLevel: 1.5,
      paddingFn: () => ({ top: 20, bottom: 20, left: 16, right: 16 })
    })
    lb.init()
    el.dataset.pswpInit = '1'
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllGalleries)
} else {
  initAllGalleries()
}
