import { httpClient } from "../client";
import { urls } from "../urls";

type userCredential={
  username:string;
  password:string;
}
type signinResponse={
  token:string;
}
type signupResponse={
  token:string;
}
export async function login(data:userCredential):Promise<signinResponse> {
  const response = await httpClient().post(urls.auth.login, data);
  return response.data;
}
export async function signup(data:userCredential):Promise<signupResponse> {
    const response = await httpClient().post(urls.auth.signup, data);
    return response.data;
  }