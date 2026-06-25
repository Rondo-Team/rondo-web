import { CookieTokens } from "@/modules/shared/domain/CookieTokens";
import type { CookieService } from "@/modules/shared/domain/services/CookieService";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class SignOut {
  constructor(
    @inject(Token.COOKIES_SERVICE)
    private readonly cookieService: CookieService,
  ) {}

  async run() {
    await this.cookieService.deleteCookie(CookieTokens.ACCESS_TOKEN);
    await this.cookieService.deleteCookie(CookieTokens.REFRESH_TOKEN);
  }
}
