document.addEventListener("DOMContentLoaded", () => {
  // Recupera los "likes" desde localStorage, si existen
  const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};

  document.querySelectorAll(".gallery-section").forEach((section) => {
    const thumbnails = Array.from(section.querySelectorAll(".thumbnail"));
    const modal = section.querySelector(".modal");
    if (!modal) return;

    const modalImg = modal.querySelector(".modal-img");
    const arrowLeft = modal.querySelector(".arrow-left");
    const arrowRight = modal.querySelector(".arrow-right");
    const closeBtn = modal.querySelector(".close-btn");
    const likeBtn = modal.querySelector(".like-btn");

    let currentIndex = 0;

    // Abrir modal
    thumbnails.forEach((thumb, i) => {
      thumb.addEventListener("click", () => {
        currentIndex = i;
        openModal();
      });
    });

    function openModal() {
      if (!modalImg) return;
      modal.classList.remove("hidden");
      updateModal();
    }

    function closeModal() {
      modal.classList.add("hidden");
    }

    closeBtn?.addEventListener("click", closeModal);

    // Navegación
    arrowLeft?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      updateModal();
    });

    arrowRight?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % thumbnails.length;
      updateModal();
    });

    function updateModal() {
      const src = thumbnails[currentIndex].src;
      modalImg.src = src;

      // Actualiza likes
      updateLikeBtn(src);
    }

    function updateLikeBtn(src) {
      const data = storedLikes[src] || { count: 0, liked: false };
      likeBtn.textContent = `${data.liked ? "💖" : "🤍"} Me gusta (${
        data.count
      })`;

      if (data.liked) {
        likeBtn.classList.add("liked");
      } else {
        likeBtn.classList.remove("liked");
      }
    }

    // Maneja el clic en "Me gusta"
    likeBtn?.addEventListener("click", () => {
      const src = thumbnails[currentIndex].src;

      // Alternar like
      if (!storedLikes[src]) {
        storedLikes[src] = { count: 1, liked: true };
      } else {
        // Si ya está "liked", lo quitamos
        if (storedLikes[src].liked) {
          storedLikes[src].count--;
          storedLikes[src].liked = false;
        } else {
          storedLikes[src].count++;
          storedLikes[src].liked = true;
        }
      }

      // Actualiza el "Me gusta" visualmente
      updateLikeBtn(src);

      // Guarda los cambios en localStorage
      localStorage.setItem("likes", JSON.stringify(storedLikes));
    });
  });
});
