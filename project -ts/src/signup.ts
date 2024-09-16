import { signup } from "../apis/services/auth.service";
import { errorHandler } from "../libs/errorhandler";
import { setSessionToken } from "../libs/session-manager";
import { toast } from "../libs/toast";
let formsignup = document.getElementById("signup-form") as HTMLFormElement;

formsignup.addEventListener("submit", sendForminfo);
async function sendForminfo(event:Event){
  event.preventDefault();
  const userInput = document.getElementById("user-input") as HTMLInputElement;
  const passwordInput = document.getElementById("password-input") as HTMLInputElement;
  try {
    const response= await signup({
      username:userInput.value,
      password:passwordInput.value,
    });

    toast("Signup successful!","success");
    console.log(response);
    setSessionToken(response.token);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  } catch (error) {
    errorHandler(error);
    console.log(error);
  }
}
////////////////////////////////////////////////////////////////
let passwordEye= document.getElementById("password-eye") as HTMLElement;
let passwordInput = document.getElementById("password-input") as HTMLInputElement;

passwordEye.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
