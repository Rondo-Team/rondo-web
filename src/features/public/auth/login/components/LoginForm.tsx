"use client";
import { loginAction } from "@/features/public/auth/login/actions/loginAction";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginAction, {});
  console.log("State", state);

  const t = useTranslations("LoginPage");

  useEffect(() => {
    if (state.success) {
      // Send to home page
      console.log("login succesfully");
    } else {
      // Show login incorrect message
      console.log("login failed");
    }
  }, [state]);

  return (
    // Custom components for textfields (in textfield component we can add real time validation) and buttons
    <form action={formAction}>
      {state.errors?.email && <p>{state.errors.email}</p>}
      <input name="email" type="text" placeholder="Enter your email" />
      {state.errors?.password && <p>{state.errors.password}</p>}
      <input
        name="password"
        type="password"
        placeholder="Enter your password"
      />
      <button type="submit">{t("loginButton")}</button>
    </form>
  );
};
