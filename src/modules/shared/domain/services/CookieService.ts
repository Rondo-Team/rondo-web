import { CookieTokens } from "@/modules/shared/domain/CookieTokens";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface CookieService {
  setCookie(
    name: CookieTokens,
    value: string,
    options?: Partial<ResponseCookie>,
  ): Promise<void>;
  getCookie(name: CookieTokens): Promise<string | undefined>;
  deleteCookie(name: CookieTokens, options?: { path?: string }): Promise<void>;
}
