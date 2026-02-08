"use client";
import { Button } from "@/components/Button/Button";
import { TextField } from "@/components/TextField";
import { loginAction } from "@/features/public/auth/login/actions/loginAction";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginAction, {});
  console.log("State", state);

  const t = useTranslations("loginPage.loginForm");

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
    <form action={formAction} className={styles.loginFormContainer}>
      <TextField
        name="email"
        type="text"
        placeholder={t("email.placeholder")}
        label={t("email.label")}
        error={state.errors?.email && t("email.invalid")}
      />
      <TextField
        name="password"
        type="password"
        placeholder={t("password.placeholder")}
        label={t("password.label")}
        error={state.errors?.password && t("password.invalid")}
      />
      <Button type="submit" disabled={isPending}>
        {t("loginButton.title")}
      </Button>
    </form>
  );
};
