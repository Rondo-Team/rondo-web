import { LoginForm } from "@/features/public/auth/login/components/LoginForm";
import { useTranslations } from "next-intl";
import styles from "./Login.module.css";

export const Login = () => {
  const t = useTranslations("LoginPage");
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
};
