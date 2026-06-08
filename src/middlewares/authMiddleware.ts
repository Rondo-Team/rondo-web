import { CustomMiddleware } from "@/middlewares/chain";
import { refreshSessionUseCase } from "@/modules/auth/AuthModule";
import { cookies } from "next/headers";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register"];
const privateRoutes = [
  "/home",
  "/create",
  "/post",
  "/community",
  "/my-tactics",
];

export function authMiddleware(customMiddleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const pathname = request.nextUrl.pathname.replace(/^\/(en|es)/, "");

    const accessToken = (await cookies()).get("accessToken");
    const refreshToken = (await cookies()).get("refreshToken");

    const isPublicRoute = publicRoutes.some((route) =>
      pathname.startsWith(route),
    );

    const isPrivateRoute = privateRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (isPublicRoute && accessToken) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    if (isPrivateRoute && !accessToken) {
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      try {
        await refreshSessionUseCase.run();
        return NextResponse.redirect(
          new URL(
            request.nextUrl.pathname + request.nextUrl.search,
            request.url,
          ),
        );
      } catch {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    return customMiddleware(request, event, response);
  };
}
