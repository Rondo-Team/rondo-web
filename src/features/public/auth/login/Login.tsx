import { LoginForm } from "@/features/public/auth/login/components/LoginForm/LoginForm";
import { RondoLoginComposition } from "@/features/public/auth/login/components/RondoLoginComposition";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./Login.module.css";

export const Login = () => {
  const t = useTranslations("loginPage");
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.welcomeText}>
        {t.rich("breefing.title", {
          subtitle: (chunks: React.ReactNode) => (
            <span className={styles.spanText}>{chunks}</span>
          ),
        })}
      </h1>
      <RondoLoginComposition />
      <LoginForm />
      <p className={styles.signUpText}>
        {t.rich("loginForm.noAccount", {
          signUp: (chunks: React.ReactNode) => (
            <Link href="/register" className={styles.signUpLink}>
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
};
