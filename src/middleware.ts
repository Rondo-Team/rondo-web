import { authMiddleware } from "@/middlewares/authMiddleware";
import { chain } from "@/middlewares/chain";
import intlMiddleware from "@/middlewares/intlMiddleware";

export default chain([intlMiddleware, authMiddleware]);

export const config = {
  matcher: ["/((?!_next|.*\\..*|health).*)"],
};
