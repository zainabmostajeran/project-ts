import { httpClient } from "../client";
import { urls } from "../urls";

 export type paramsDeclaration={
    page:number,
    limit:number,
    search:string,
    brands:string[];
}
 export type Sneaker={
    brand:string,
    category:string,
    color:string,
    gender:string,
    id:number,
    imageURL:string,
    name:string,
    pid:number,
    price:number,
    size:string
}
export type SneakersResponse={
  data:Sneaker[];
  totalPage:number;
}
export async function getSneakers({
  page = 1,
  limit = 10,
  search = "",
  brands = []
}:paramsDeclaration):Promise<SneakersResponse> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (search) params.append("search", search);
  if (brands.length > 0) params.append("brands", brands.join(","));

  const response = await httpClient().get(
    `${urls.sneaker.new}?${params.toString()}`
  );
  return response.data as SneakersResponse;
}
export async function getSneakersBrand() {
  const response = await httpClient().get(urls.sneaker.brands);
  return response.data;
}
export async function getSneakersItem(id:string) { 
  const response = await httpClient().get(urls.sneaker.item + '/' + id); 
  return response.data; 
}

