"use client";
import { Button } from "@/components/Button/Button";
import { PasswordField } from "@/components/PasswordField";
import { TextField } from "@/components/TextField";
import { registerAction } from "@/features/public/auth/register/actions/registerAction";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import styles from "./RegisterForm.module.css";

export const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerAction, {});

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
        defaultValue={state.values?.name}
        error={state.errors?.name?.at(0)}
      />
      <TextField
        name="username"
        type="text"
        placeholder={t("username.placeholder")}
        label={t("username.label")}
        defaultValue={state.values?.username}
        error={state.errors?.username?.at(0)}
      />
      <TextField
        name="email"
        type="text"
        placeholder={t("email.placeholder")}
        label={t("email.label")}
        defaultValue={state.values?.email}
        error={state.errors?.email?.at(0)}
      />
      <PasswordField
        name="password"
        placeholder={t("password.placeholder")}
        label={t("password.label")}
        description={t("password.description")}
        error={state.errors?.password?.at(0)}
        showLabel={t("password.show")}
        hideLabel={t("password.hide")}
      />
      <PasswordField
        name="passwordConfirm"
        placeholder={t("passwordConfirm.placeholder")}
        label={t("passwordConfirm.label")}
        error={state.errors?.passwordConfirm?.at(0)}
        showLabel={t("password.show")}
        hideLabel={t("password.hide")}
      />
      <Button type="submit" disabled={isPending}>
        {t("registerButton.title")}
      </Button>
    </form>
  );
};
