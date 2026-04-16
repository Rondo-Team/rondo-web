import { CookieTokens } from "@/modules/shared/domain/CookieTokens";
import { NextCookieService } from "@/modules/shared/infrastructure/services/NextCookieService";
import { jwtDecode } from "jwt-decode"; // Necesitarías instalar este paquete

export async function getUserIdFromCookie() {
  const cookieService = new NextCookieService();
  const accessToken = await cookieService.getCookie(CookieTokens.ACCESS_TOKEN);
  if (accessToken) return jwtDecode(accessToken).sub;
  return undefined;
}
