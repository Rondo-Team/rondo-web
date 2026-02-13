"use client";
import { Button } from "@/components/Button/Button";
import { TextField } from "@/components/TextField";
import { registerAction } from "@/features/public/auth/register/actions/registerAction";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import styles from "./RegisterForm.module.css";

export const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerAction, {});
  console.log("State", state);

  const t = useTranslations("registerPage.registerForm");

  return (
    <form action={formAction} className={styles.registerFormContainer}>
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
        name="name"
        type="text"
        placeholder={t("name.placeholder")}
        label={t("name.label")}
        error={state.errors?.name}
      />
      <TextField
        name="username"
        type="text"
        placeholder={t("username.placeholder")}
        label={t("username.label")}
        error={state.errors?.username}
      />
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
      <TextField
        name="passwordConfirm"
        type="password"
        placeholder={t("passwordConfirm.placeholder")}
        label={t("password.label")}
        error={state.errors?.passwordConfirm}
      />
      <Button type="submit" disabled={isPending}>
        {t("registerButton.title")}
      </Button>
    </form>
  );
};
