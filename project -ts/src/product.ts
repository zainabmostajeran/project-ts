import { getSneakersItem } from "../apis/services/sneaker.service";
import { errorHandler } from "../libs/errorhandler";

let quantity: number = 0;
let price: number = 0;

function getQueryParameter(value: string) {
  const urlParams = new URLSearchParams(window.location.search);
  // console.log(window.location);
  // console.log(window.location.search);
  // console.log(urlParams);
  // console.log(urlParams.get(name));
  return urlParams.get(value);
}
const selectedProductId = getQueryParameter("id");
if (selectedProductId) SneakersItem(selectedProductId);
//get item
export async function SneakersItem(id: string) {
  try {
    const response = await getSneakersItem(id);
    console.log(response);
    const image = <HTMLImageElement>document.querySelector(".container img");
    image.src = response.imageURL;
    const category = <HTMLParagraphElement>(
      document.querySelector(".font-bold.text-xl")
    );
    category.innerText = response.category;
    const sold = <HTMLButtonElement>(
      document.querySelector(".bg-gray-300.p-2.rounded-lg.text-sm")
    );
    sold.innerText = `5.371 sold`;

    const imgStar = <HTMLImageElement>document.querySelector(".w-4.h-4");
    imgStar.src = "img/star-outline.svg";
    const review = <HTMLDivElement>(
      document.querySelector(".flex.items-center.gap-1 p")
    );
    review.innerText = `4.3 (5.389 reviews)`;

    const colors = response.colors.split("|");
    const colorContainer = <HTMLDivElement>(
      document.querySelector(".flex.items-start.w-44.overflow-x-auto")
    );
    colorContainer.innerHTML = colors
      .map((color: string) => {
        return `<button
          class="rounded-full border border-gray-600 p-4"
          style="background-color: ${color};"
        ></button>`;
      })
      .join("");

    const sizes = response.sizes.split("|");
    const sizeContainer = <HTMLDivElement>(
      document.querySelector(".flex.gap-2.items-start")
    );

    sizeContainer.innerHTML = sizes
      .map((size: number) => {
        return ` <button class="rounded-full  border border-gray-600 px-2 py-1 select" data-select="select">${size}</button>`;
      })
      .join("");
    sizeContainer.addEventListener("click", (event: Event) => {
      const sizeBtn = (<HTMLElement>event.target).dataset.select;
      if (sizeBtn) {
        const sizeButton = sizeContainer.querySelectorAll(".select");
        sizeButton.forEach((button) => {
          button.classList.remove("text-white", "bg-gray-800");
        });
        (<HTMLElement>event.target).classList.add("text-white", "bg-gray-800");
      }
    });
    //set quantity
    price = response.price;
    const increase = <HTMLParagraphElement>(
      document.querySelector('[data-action="increase"]')
    );
    increase.addEventListener("click", () => updateQuantity(1));
    const decrease = <HTMLParagraphElement>(
      document.querySelector('[data-action="decrease"]')
    );
    decrease.addEventListener("click", () => updateQuantity(-1));
  } catch (error) {
    errorHandler(error);
    console.log(error);
  }
}
function updateQuantity(change: number) {
  quantity = Math.max(0, quantity + change);
  const result = <HTMLParagraphElement>document.querySelector("#quantity");
  result.innerText = quantity.toString();
  const total = <HTMLParagraphElement>document.querySelector("#totalPrice");
  total.innerText = `$${price * quantity}.00`;
}

// const selectedProductId = localStorage.getItem("selectedProductId");
// if (selectedProductId) {
//   SneakersItem(selectedProductId);
// }
