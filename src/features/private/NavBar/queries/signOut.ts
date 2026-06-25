"use server";

import { signOutUseCase } from "@/modules/auth/AuthModule";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { redirect } from "next/navigation";

export const signOut = async () => {
  try {
    await signOutUseCase.run();
  } catch {
    // Ignore errors: sign out is best-effort and only clears local cookies.
  }

  redirect(AppSectionsRoutes.LOGIN);
};
