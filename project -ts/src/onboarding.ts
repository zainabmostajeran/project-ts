import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function injectStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
    }
    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;

    }
    .swiper-pagination-bullet {
      width:43px;
      height: 5px;
      background: rgba(0, 0, 0, 0.2);
      margin: 5px;
      border:1px solid gray;
    }
    .swiper-pagination-bullet-active {
      background: #007aff;
    }
    #nextSlide {
      background-color: #212529;
      color: white;
      padding: 10px;
      cursor: pointer;
      border-radius: 50px;
    }`;
  document.head.appendChild(style);
}

injectStyles();

document.addEventListener("DOMContentLoaded", () => {
  const swiperEl = <HTMLElement>document.querySelector(".mySwiper");
  const paginationEl = <HTMLDivElement>(
    document.querySelector(".swiper-pagination")
  );

  const swiper = new Swiper(swiperEl, {
    modules: [Pagination],
    loop: false,
    pagination: {
      el: paginationEl,
      clickable: true,
    },
  });
  const nextButton = <HTMLButtonElement>document.getElementById("nextSlide");
  const slides = document.querySelectorAll(".swiper-slide");

  function updateNextButton() {
    if (swiper.realIndex === slides.length - 1) {
      nextButton.innerText = "Get started";
    } else {
      nextButton.innerText = "Next";
    }
  }

  swiper.on("slideChange", updateNextButton);
  updateNextButton();

  nextButton.addEventListener("click", () => {
    if (swiper.realIndex === slides.length - 1) {
      window.location.href = "/signup";
    } else {
      swiper.slideNext();
    }
  });
});
