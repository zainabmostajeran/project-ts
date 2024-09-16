import { tokenName } from "./constant";

export function setSessionToken(token:string) {
    localStorage.setItem(tokenName,token);
}
export function getSessionToken():string|null {
    return localStorage.getItem(tokenName);
}
export function removeSessionToken():void {
    localStorage.removeItem(tokenName);
}