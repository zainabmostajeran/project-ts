import { httpClient } from "../client";
import { urls } from "../urls";

export type ParamsDeclaration = {
  page: number;
  limit: number;
  search: string;
  brands: string[];
};
export type Sneaker = {
  id: number;
  imageURL: string;
  name: string;
  price: number;
};
export type SneakersResponse = {
  data: Sneaker[];
  totalPages: number;
};
export async function getSneakers({
  page = 1,
  limit = 10,
  search = "",
  brands = [],
}: ParamsDeclaration): Promise<SneakersResponse> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (search) params.append("search", search);
  if (brands.length > 0) params.append("brands", brands.join(","));

  const response = await httpClient().get(
    `${urls.sneaker.new}?${params.toString()}`
  );
  return response.data;
}
export async function getSneakersBrand() {
  const response = await httpClient().get(urls.sneaker.brands);
  return response.data;
}
export async function getSneakersItem(id: string) {
  const response = await httpClient().get(urls.sneaker.item + "/" + id);
  return response.data;
}
