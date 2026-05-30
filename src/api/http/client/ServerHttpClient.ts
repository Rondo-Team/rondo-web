import { CookieTokens } from "@/modules/shared/domain/CookieTokens";
import { CookieService } from "@/modules/shared/domain/services/CookieService";
import { NextCookieService } from "@/modules/shared/infrastructure/services/NextCookieService";
import { HttpMethod } from "@/types/HttpMethod";
import { parseCookie } from "@/utils/parseCookie";

type QueryParams = Record<
  string,
  string | number | boolean | Array<string | number | boolean> | undefined
>;

type RequestOptions<T = unknown> = {
  method?: HttpMethod;
  body?: T;
  headers?: Record<string, string>;
  params?: QueryParams;
};

class ServerHttpClient {
  private baseUrl: string;
  private cookieService: CookieService;
  constructor() {
    this.baseUrl = process.env.API_URL || "localhost:3000";
    this.cookieService = new NextCookieService(); // Pass through dependency injection
  }

  private buildUrl(endpoint: string, params?: QueryParams) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      const cleanedParams = this.clean(params);
      Object.entries(cleanedParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            url.searchParams.append(key, String(item));
          });
          return;
        }

        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  private clean(params: QueryParams) {
    return Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined),
    ) as QueryParams;
  }

  private async getHeaders(aditionalHeaders?: Record<string, string>) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...aditionalHeaders,
    };

    // Seteamos la cookie en los headers
    const cookie = await this.cookieService.getCookie(
      CookieTokens.ACCESS_TOKEN,
    );
    if (cookie) headers["Cookie"] = `${CookieTokens.ACCESS_TOKEN}=${cookie}`;

    return headers;
  }

  async request<TResponse = unknown, TBody = unknown>(
    endpoint: string,
    options: RequestOptions<TBody>,
  ): Promise<TResponse> {
    const { method, body, headers: aditionalHeaders, params } = options;
    const url = this.buildUrl(endpoint, params);
    const headers = await this.getHeaders(aditionalHeaders);
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      console.log("setting cookies");
      const cookiesArray = response.headers.getSetCookie();

      if (cookiesArray.length > 0) {
        cookiesArray.forEach((cookie) => {
          const parsedCookie = parseCookie(cookie);
          this.cookieService.setCookie(
            parsedCookie.name,
            parsedCookie.value,
            parsedCookie.options,
          );
        });
      }

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw response;
      }

      return response.json();
    } catch (error) {
      console.error("HTTP Request failed:", error);
      throw error;
    }
  }

  async get<TResponse = unknown, TBody = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ) {
    return this.request<TResponse, TBody>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  async post<TResponse = unknown, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: Omit<RequestOptions, "method" | "body">,
  ) {
    return this.request<TResponse, TBody>(endpoint, {
      ...options,
      method: "POST",
      body,
    });
  }

  async patch<TResponse = unknown, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: Omit<RequestOptions, "method" | "body">,
  ) {
    return this.request<TResponse, TBody>(endpoint, {
      ...options,
      method: "PATCH",
      body,
    });
  }

  async delete<TResponse = unknown, TBody = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ) {
    return this.request<TResponse, TBody>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}

export const serverHttpClient = new ServerHttpClient();
