import { removeSessionToken } from "./session-manager";
import { toast } from "./toast";

export type ErrorResponse = {
  response?: {
    data?: {
      message?: string | string[];
      statusCode?: number;
    };
  };
};

export const errorHandler = (err: unknown) => {
  const error = err as ErrorResponse;
  const message = error.response?.data?.message;
  if (typeof message === "string") {
    toast(message, "error");
  } else if (Array.isArray(message)) {
    for (const msgText of message) {
      toast(msgText, "error");
    }
  }

  const statusCode = Number(error.response?.data?.statusCode || 0);
  if (statusCode === 403) {
    toast("Please login again", "error");
    removeSessionToken();
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }
};
