import { CookieTokens } from "@/modules/shared/domain/CookieTokens";
import { CookieService } from "@/modules/shared/domain/services/CookieService";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export class NextCookieService implements CookieService {
  async setCookie(
    name: CookieTokens,
    value: string,
    options?: Partial<ResponseCookie>,
  ): Promise<void> {
    const cookiesManager = await cookies();
    cookiesManager.set(name, value, options);
  }

  async getCookie(name: CookieTokens): Promise<string | undefined> {
    const cookiesManager = await cookies();
    return cookiesManager.get(name)?.value;
  }

  async deleteCookie(
    name: CookieTokens,
    options?: Omit<ResponseCookie, "value" | "expires">,
  ): Promise<void> {
    const cookiesManager = await cookies();
    cookiesManager.delete({ name, ...options });
  }
}
