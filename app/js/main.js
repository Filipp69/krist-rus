document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('[data-modal-open="team-modal"]');
  const modal = document.querySelector('[data-modal="team-modal"]');

  if (!modal) return;

  const modalTitle = modal.querySelector("h2");
  const modalText = modal.querySelector("p");

  if (!modalTitle || !modalText) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const hiddenText = card.querySelector(".card-team__hidden-text");
      if (!hiddenText) return;

      const h2 = hiddenText.querySelector("h2")?.innerHTML || "";
      const p = hiddenText.querySelector("p")?.innerHTML || "";

      modalTitle.innerHTML = h2;
      modalText.innerHTML = p;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-certificates[data-modal-open]");
  const modal = document.querySelector('[data-modal="certificates-modal"]');
  const overlay = document.querySelector('[data-overlay]');

  if (!modal || !overlay) return;

  const modalImage = modal.querySelector("img");
  const modalTitle = modal.querySelector("h3");
  const modalClose = modal.querySelector("[data-modal-close]");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const imgEl = card.querySelector("img.card-certificates__image");
      const titleEl = card.querySelector("h3.card-certificates__name");

      if (!imgEl || !titleEl) return;

      modalImage.src = imgEl.src;
      modalTitle.textContent = titleEl.textContent;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const phoneBtns = document.querySelectorAll(".modal__consultant .button");

  phoneBtns.forEach((phoneBtn) => {
    const rawPhone = phoneBtn.dataset.phone;
    const formattedPhone = phoneBtn.textContent.trim();

    phoneBtn.addEventListener("click", () => {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.location.href = `tel:${rawPhone}`;
      } else {
        navigator.clipboard.writeText(rawPhone).then(() => {
          phoneBtn.textContent = "Скопировано!";
          setTimeout(() => {
            phoneBtn.textContent = formattedPhone;
          }, 2000);
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("showCategories");
  const overlay = document.querySelector(".catalog-categories__overlay");
  const sidebar = document.querySelector(".catalog-categories__sidebar");
  const closeBtn = document.querySelector(".catalog-categories__sidebar-close");

  if (!btn || !overlay || !sidebar) return;

  const disableScrolling = () => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  };

  const enableScrolling = () => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  };

  const openSidebar = () => {
    overlay.classList.add("active");
    sidebar.classList.add("active");
    sidebar.style.transition = "transform 0.3s ease";
    sidebar.style.transform = "translate(-50%, 0)";
    disableScrolling();
  };

  const closeSidebar = () => {
    overlay.classList.remove("active");
    sidebar.classList.remove("active");
    sidebar.style.transition = "transform 0.3s ease";
    sidebar.style.transform = "translate(-50%, 100%)";
    enableScrolling();
  };

  btn.addEventListener("click", openSidebar);
  overlay.addEventListener("click", closeSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);

  let startY = 0;
  let currentY = 0;
  let dragging = false;

  sidebar.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    dragging = true;
    sidebar.style.transition = "none";
  });

  sidebar.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    currentY = e.touches[0].clientY;
    let delta = currentY - startY;
    if (delta > 0) {
      sidebar.style.transform = `translate(-50%, ${delta}px)`;
    }
  });

  sidebar.addEventListener("touchend", () => {
    if (!dragging) return;
    dragging = false;

    let delta = currentY - startY;
    sidebar.style.transition = "transform 0.3s ease";

    if (delta > 100) {
      closeSidebar();
    } else {
      sidebar.style.transform = "translate(-50%, 0)";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const headerTop = document.querySelector(".header--top");
  const headerBottom = document.querySelector(".header--bottom");
  const headerGap = document.querySelector(".header__gap");
  let lastScroll = 0;
  const delta = 50;

  const desktopGap = 25;
  const mobileGap = 10;

  function getGap() {
    return window.innerWidth > 767 ? desktopGap : mobileGap;
  }

  function isMobile() {
    return window.innerWidth <= 767;
  }

  // === scroll ===
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (Math.abs(currentScroll - lastScroll) < delta) return;

    if (isMobile()) {
      // mobile → управляем bottom
      if (currentScroll > lastScroll && currentScroll > delta) {
        headerBottom.style.maxHeight = "0px";
        headerBottom.style.opacity = "0";
        headerGap.style.height = "0px";
      } else {
        headerBottom.style.maxHeight = "9999px";
        headerBottom.style.opacity = "1";
        headerGap.style.height = getGap() + "px";
      }
    } else {
      // desktop → управляем top
      if (currentScroll > lastScroll && currentScroll > delta) {
        headerTop.style.maxHeight = "0px";
        headerTop.style.opacity = "0";
        headerGap.style.height = "0px";
      } else {
        headerTop.style.maxHeight = "9999px";
        headerTop.style.opacity = "1";
        headerGap.style.height = getGap() + "px";
      }
    }

    lastScroll = currentScroll;
  });

  // === transitions & overflow ===
  if (headerTop) {
    headerTop.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
    headerTop.style.overflow = "hidden";
    headerTop.style.maxHeight = "9999px";
    headerTop.style.opacity = "1";
  }

  if (headerGap) {
    headerGap.style.transition = "height 0.3s ease";
    headerGap.style.height = getGap() + "px";
  }

  if (isMobile() && headerBottom) {
    headerBottom.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
    headerBottom.style.overflow = "hidden";
    headerBottom.style.maxHeight = "9999px";
    headerBottom.style.opacity = "1";
  }

  // === resize ===
  window.addEventListener("resize", () => {
    if (headerTop && headerTop.style.maxHeight !== "0px") {
      headerGap.style.height = getGap() + "px";
    }
    if (isMobile() && headerBottom && headerBottom.style.maxHeight !== "0px") {
      headerGap.style.height = getGap() + "px";
    }
  });

  // === anchors smooth scroll ===
  const desktopOffset = 150;
  const mobileOffset = 75;

  function getCollapsedHeaderHeight() {
    return headerGap ? headerGap.offsetHeight : 0;
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerHeight = getCollapsedHeaderHeight();
      const extraOffset = isMobile() ? mobileOffset : desktopOffset;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      const scrollTo = targetPosition - headerHeight - extraOffset;

      window.scrollTo({
        top: scrollTo,
        behavior: "smooth",
      });
    });
  });
});


const input = document.querySelector('.catalog-categories__search-input');
const placeholder = document.querySelector('.catalog-categories__search-placeholder');

if(input && placeholder) {
  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      placeholder.style.display = 'none';
    } else {
      placeholder.style.display = '';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  function moveElements() {
    const article = document.querySelector('.article');
    const sidebar = document.querySelector('.article__sidebar');
    const toc = document.querySelector('.table-of-contents');
    const mention = document.querySelector('.mention');

    if (!article || !sidebar || !toc || !mention) return;

    const articleHead = article.querySelector('.article__head');
    const articleContent = article.querySelector('.article__content');

    if (window.innerWidth < 991) {
      if (toc.parentNode !== article) {
        article.insertBefore(toc, articleHead.nextSibling);
      }
      if (mention.parentNode !== article) {
        article.insertBefore(mention, articleContent.nextSibling);
      }
    } else {
      if (toc.parentNode !== sidebar) {
        sidebar.insertBefore(toc, sidebar.firstChild);
      }
      if (mention.parentNode !== sidebar) {
        sidebar.appendChild(mention);
      }
    }
  }

  moveElements();
  window.addEventListener('resize', moveElements);
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector('[data-modal="video-modal"]');
  if (!modal) return;

  const overlay = document.querySelector("[data-overlay]");
  const closeBtn = modal.querySelector("[data-modal-close]");
  const video = modal.querySelector("video");

  function openModal() {
    modal.classList.add("active");
    overlay.classList.add("active");
    video.currentTime = 0;
  }

  function closeModal() {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    video.pause();
    video.currentTime = 0;
  }

  document.querySelectorAll("[data-modal-open='video-modal']").forEach(btn => {
    btn.addEventListener("click", openModal);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);
});


