export function setupModal(section, storedLikes) {
  const thumbnails = Array.from(section.querySelectorAll(".thumbnail"));
  const modal = section.querySelector(".modal");
  if (!modal) return;

  const modalImg = modal.querySelector(".modal-img");
  const arrowLeft = modal.querySelector(".arrow-left");
  const arrowRight = modal.querySelector(".arrow-right");

  let currentIndex = 0;

  const openModal = () => {
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    updateModal();
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  };

  const updateModal = () => {
    const src = thumbnails[currentIndex].src;
    modalImg.src = src;
    updateLikeBtn(src);
  };

  function updateLikeBtn(src) {
    const data = storedLikes[src] || { count: 0, liked: false };
    const icon = modal.querySelector(".like-icon");

    if (icon) {
      icon.src = data.liked ? "/icons/like1.png" : "/icons/like0.png";
    }
  }

  const toggleLike = () => {
    const src = thumbnails[currentIndex].src;
    const data = storedLikes[src] || { count: 0, liked: false };

    if (data.liked) {
      data.count--;
      data.liked = false;
    } else {
      data.count++;
      data.liked = true;
    }

    storedLikes[src] = data;
    updateLikeBtn(src);
    localStorage.setItem("likes", JSON.stringify(storedLikes));
  };

  // Listeners
  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      currentIndex = i;
      openModal();
    });
  });

  modal.addEventListener("click", (e) => {
    if (!modalImg.contains(e.target)) closeModal();
  });

  arrowLeft?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    updateModal();
  });

  arrowRight?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    updateModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  likeBtn?.addEventListener("click", toggleLike);
}
