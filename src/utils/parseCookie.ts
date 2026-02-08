import { CookieTokens } from "@/modules/shared/domain/CookieTokens";

interface ParsedCookieOptions {
  path?: string;
  domain?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number;
  expires?: Date;
}

interface ParsedCookie {
  name: CookieTokens;
  value: string;
  options: ParsedCookieOptions;
}

export function parseCookie(cookieString: string): ParsedCookie {
  const [nameValuePair, ...attributes] = cookieString
    .split(";")
    .map((s) => s.trim());

  const [name, value] = nameValuePair.split("=");

  const options: ParsedCookieOptions = {};

  for (const attr of attributes) {
    const [key, val] = attr.split("=").map((s) => s.trim());

    switch (key.toLowerCase()) {
      case "path":
        options.path = val;
        break;
      case "domain":
        options.domain = val;
        break;
      case "httponly":
        options.httpOnly = true;
        break;
      case "secure":
        options.secure = true;
        break;
      case "samesite":
        options.sameSite = val as "strict" | "lax" | "none";
        break;
      case "max-age":
        options.maxAge = parseInt(val, 10);
        break;
      case "expires":
        options.expires = new Date(val);
        break;
      default:
        break;
    }
  }

  return { name: name as CookieTokens, value, options };
}
