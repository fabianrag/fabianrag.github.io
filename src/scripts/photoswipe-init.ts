import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

// Inicializa un lightbox por cada galería presente
function initAllGalleries () {
  document.querySelectorAll<HTMLElement>('.pswp-gallery').forEach(el => {
    if (el.dataset.pswpInit === '1') return

    const selector = el.id ? `#${el.id}` : '.pswp-gallery'

    const lb = new PhotoSwipeLightbox({
      gallery: selector,
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
