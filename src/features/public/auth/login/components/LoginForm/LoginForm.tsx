"use client";
import { Button } from "@/components/Button/Button";
import { TextField } from "@/components/TextField";
import { loginAction } from "@/features/public/auth/login/actions/loginAction";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginAction, {});
  console.log("State", state);

  const t = useTranslations("loginPage.loginForm");

  return (
    <form action={formAction} className={styles.loginFormContainer}>
      <p
        className={`${styles.errorText} ${
          !state.success && state.message
            ? styles.errorVisible
            : styles.errorHidden
        }`}
      >
        {state.message || " "}
      </p>
      <TextField
        name="email"
        type="text"
        placeholder={t("email.placeholder")}
        label={t("email.label")}
        error={state.errors?.email}
      />
      <TextField
        name="password"
        type="password"
        placeholder={t("password.placeholder")}
        label={t("password.label")}
        error={state.errors?.password}
      />
      <Button type="submit" disabled={isPending}>
        {t("loginButton.title")}
      </Button>
    </form>
  );
};
