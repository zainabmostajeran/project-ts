import { httpClient } from "../client";
import { urls } from "../urls";

export async function getUserInfo() {
  const response = await httpClient().get(urls.user);
  return response.data;
}