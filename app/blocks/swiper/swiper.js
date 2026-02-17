document.addEventListener("DOMContentLoaded", function () {
  const initSwiper = (selector, breakpoints) => {
    document.querySelectorAll(selector).forEach((swiperEl) => {
      const parent = swiperEl.parentElement;

      const paginationAttr = parent.querySelector('.swiper-pagination')?.dataset.swiperPagination;
      const paginationEl = paginationAttr
        ? parent.querySelector(`[data-swiper-pagination="${paginationAttr}"]`)
        : null;

      const nextBtn = parent.querySelector('[data-swiper-button-next]');
      const prevBtn = parent.querySelector('[data-swiper-button-prev]');
      const controls = parent.querySelector('.swiper-controls'); // блок с контролами

      const swiper = new Swiper(swiperEl, {
        spaceBetween: 8,
        slidesPerView: 1,
        updateOnWindowResize: true,
        breakpoints,
        ...(paginationEl && {
          pagination: {
            el: paginationEl,
            clickable: true,
          }
        }),
        ...(nextBtn && prevBtn && {
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
          }
        }),
        on: {
          init(sw) {
            toggleContainerClasses(sw);
            toggleControls(sw);
          },
          slideChange(sw) {
            toggleContainerClasses(sw);
          }
        }
      });

      function toggleContainerClasses(sw) {
        const container = sw.el.closest(".swiper-container");

        if (!container) return;

        container.classList.remove("first-slide", "last-slide");

        if (sw.isBeginning) {
          container.classList.add("first-slide");
        }
        if (sw.isEnd) {
          container.classList.add("last-slide");
        }
      }

      function toggleControls(sw) {
        if (!controls) return;

        if (sw.slides.length <= 1) {
          controls.style.display = "none";
        } else {
          controls.style.display = "";
        }
      }
    });
  };

  if (document.querySelector('[data-swiper="sliderCategories"]')) {
    initSwiper('[data-swiper="sliderCategories"]', {
      991: { slidesPerView: 9, spaceBetween: 38 },
    });
  }

  if (document.querySelector('[data-swiper="sliderBlog"]')) {
    initSwiper('[data-swiper="sliderBlog"]', {
      1400: { slidesPerView: 3, spaceBetween: 38 },
      800: { slidesPerView: 2, spaceBetween: 38 },
    });
  }

  if (document.querySelector('[data-swiper="sliderBlogProducts"]')) {
    initSwiper('[data-swiper="sliderBlogProducts"]', {
      991: { slidesPerView: 1, spaceBetween: 16 },
      767: { slidesPerView: 2, spaceBetween: 16 },
    });
  }

  if (document.querySelector('[data-swiper="sliderPartners"]')) {
    initSwiper('[data-swiper="sliderPartners"]', {
      1400: { slidesPerView: 6, spaceBetween: 38 },
      1200: { slidesPerView: 5, spaceBetween: 38 },
      1000: { slidesPerView: 4, spaceBetween: 24 },
      800: { slidesPerView: 3, spaceBetween: 16 },
      540: { slidesPerView: 2, spaceBetween: 16 },
    });
  }

  if (document.querySelector('[data-swiper="sliderProducts"]')) {
    initSwiper('[data-swiper="sliderProducts"]', {
      991: { slidesPerView: 4, spaceBetween: 24 },
      880: { slidesPerView: 3, spaceBetween: 24 },
      540: { slidesPerView: 2, spaceBetween: 24 },
    });
  }
  if (document.querySelector('[data-swiper="sliderOtherProducts"]')) {
    initSwiper('[data-swiper="sliderOtherProducts"]', {
      1400: { slidesPerView: 3, spaceBetween: 40 },
      900: { slidesPerView: 2, spaceBetween: 40 },
    });
  }
  if (document.querySelector('[data-swiper="sliderHistory"]')) {
    initSwiper('[data-swiper="sliderHistory"]', {
      1200: { slidesPerView: 4, spaceBetween: 0 },
      880: { slidesPerView: 3, spaceBetween: 0 },
      540: { slidesPerView: 2, spaceBetween: 0 },
      300: { slidesPerView: 1, spaceBetween: 0 },
    });
  }
  if (document.querySelector('[data-swiper="sliderTeam"]')) {
    initSwiper('[data-swiper="sliderTeam"]', {
      1200: { slidesPerView: 4, spaceBetween: 24 },
      991: { slidesPerView: 3, spaceBetween: 24 },
      767: { slidesPerView: 2, spaceBetween: 24 },
      540: { slidesPerView: 1, spaceBetween: 8 },
    });
  }
  if (document.querySelector('[data-swiper="sliderStaff"]')) {
    initSwiper('[data-swiper="sliderStaff"]', {
      1200: { slidesPerView: 8, spaceBetween: 24 },
      991: { slidesPerView: 2, spaceBetween: 24 },
      540: { slidesPerView: 2, spaceBetween: 8 },
    });
  }
  if (document.querySelector('[data-swiper="sliderCertificates"]')) {
    initSwiper('[data-swiper="sliderCertificates"]', {
      1200: { slidesPerView: 4, spaceBetween: 38 },
      991: { slidesPerView: 3, spaceBetween: 24 },
      767: { slidesPerView: 2, spaceBetween: 24 },
      540: { slidesPerView: 1, spaceBetween: 8 },
    });
  }
});
