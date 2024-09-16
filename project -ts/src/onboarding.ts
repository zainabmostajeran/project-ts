const swiperEl= document.querySelector("swiper-container")!;
const params = {
  injectStyles: [
    `
  .swiper-pagination-bullet {
    width:20px;
    height:2px;
    margin-top:20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
  }
  .swiper-pagination-bullet-active {
    color: #fff;
    background: #007aff;
  }
  `,
  ],
  pagination: {
    clickable: true,
    renderBullet: function (index:Number, className:string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
};
Object.assign(swiperEl, params);
swiperEl.initialize();

document.addEventListener("DOMContentLoaded", function () {
  const swiper = document.querySelector(".mySwiper")as HTMLBodyElement;

  // Generate pagination buttons
  const slides = document.querySelectorAll(".mySwiper swiper-slide");
  const nextButton = document.getElementById("nextSlide") as HTMLButtonElement;
  const paginationContainer = document.querySelector(".custom-pagination")as HTMLBodyElement;
  paginationContainer.classList.add("flex", "gap-2", "justify-center", "mt-6");

  slides.forEach((slide, index:Number) => {
    const button = document.createElement("button");
    button.classList.add(
      "pagination-button",
      "py-[2px]",
      "px-5",
      "bg-white",
      "border",
      "border-[#212529]",
      "text-[#212529]",
      "rounded",
      "cursor-pointer"
    );
    button.addEventListener("click", () => {
      swiper.slideTo(index);
    });
    paginationContainer.appendChild(button);
  });

  // Function to update the active pagination button
  function updateActivePagination() {
    const activeIndex:Number= swiper.realIndex;
    const buttons = document.querySelectorAll(".pagination-button");

    buttons.forEach((button, index) => {
      if (index === activeIndex) {
        button.classList.add("active", "bg-[#212529]");
      } else {
        button.classList.remove("active");
        button.classList.add("bg-[#]");
      }
    });
    if (activeIndex === slides.length - 1) {
      nextButton.innerText = "Get started";
    } else nextButton.innerText = "Next";
  }

  swiper.on("slideChange", updateActivePagination);
  updateActivePagination();

  nextButton.addEventListener("click", () => {
    if (swiper.realIndex === slides.length - 1) {
      window.location.href = "/signup";
    } else {
      swiper.slideNext();
    }
  });
});
