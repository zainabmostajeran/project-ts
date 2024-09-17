import { getSneakersItem } from "../apis/services/sneaker.service";
import { errorHandler } from "../libs/errorhandler";

let quantity: number = 0;
let price:number = 0;

function getQueryParameter(value:string){
    const urlParams=new  URLSearchParams(window.location.search);
    // console.log(window.location);
    // console.log(window.location.search);
    // console.log(urlParams);
    // console.log(urlParams.get(name));
    return urlParams.get(value);
}
const selectedProductId=getQueryParameter("id");
if(selectedProductId) SneakersItem(selectedProductId)
//get item
export async function SneakersItem(id: string) {
  try {
    const response = await getSneakersItem(id);
    console.log(response);
    const image = document.querySelector(".container img") as HTMLImageElement;
    image.src = response.imageURL;
    const category = document.querySelector(
      ".font-bold.text-xl"
    ) as HTMLParagraphElement;
    category.innerText = response.category;
    const sold = document.querySelector(
      ".bg-gray-300.p-2.rounded-lg.text-sm"
    ) as HTMLButtonElement;
    sold.innerText = `5.371 sold`;

    const imgStar = document.querySelector(".w-4.h-4") as HTMLImageElement;
    imgStar.src = "img/star-outline.svg";
    const review = document.querySelector(
      ".flex.items-center.gap-1 p"
    ) as HTMLDivElement;
    review.innerText = `4.3 (5.389 reviews)`;

    const colors = response.colors.split("|");
    const colorContainer = document.querySelector(
      ".flex.items-start.w-44.overflow-x-auto"
    ) as HTMLDivElement;
    colorContainer.innerHTML = colors
      .map((color: string) => {
        return `<button
          class="rounded-full border border-gray-600 p-4"
          style="background-color: ${color};"
        ></button>`;
      })
      .join("");

    const sizes = response.sizes.split("|");
    const sizeContainer = document.querySelector(
      ".flex.gap-2.items-start"
    ) as HTMLDivElement;
    sizeContainer.innerHTML = sizes
      .map((size: number) => {
        return ` <button class="rounded-full border border-gray-600 px-2 py-1">${size}</button>`;
      })
      .join("");
    //set quantity
    price= response.price;
    const increase = document.querySelector(
      '[data-action="increase"]'
    ) as HTMLParagraphElement;
    increase.addEventListener("click", () => updateQuantity(1));
    const decrease = document.querySelector(
      '[data-action="decrease"]'
    ) as HTMLParagraphElement;
    decrease.addEventListener("click", () => updateQuantity(-1));
  } catch (error) {
    errorHandler(error);
    console.log(error);
  }
}
function updateQuantity(change: number) {
  quantity = Math.max(0, quantity + change);
  const result =document.querySelector("#quantity") as HTMLParagraphElement;
  result.innerText = quantity.toString();
 const total= document.querySelector("#totalPrice")as HTMLParagraphElement;
 total.innerText = `$${price * quantity}.00`;
}

// const selectedProductId = localStorage.getItem("selectedProductId");
// if (selectedProductId) {
//   SneakersItem(selectedProductId);
// }
