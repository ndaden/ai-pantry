import { type ClassValue, clsx } from "clsx";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthHeaders(cookies: ReadonlyRequestCookies) {
  return {
    Cookie: `access_token=${
      cookies.get("access_token")?.value || ""
    };id_token=${cookies.get("id_token")?.value || ""};refresh_token=${
      cookies.get("refresh_token")?.value || ""
    };`,
  };
}
