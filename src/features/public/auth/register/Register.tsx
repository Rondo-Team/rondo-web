import { RondoLoginComposition } from "@/components/RondoLoginComposition";
import { RegisterForm } from "@/features/public/auth/register/components/RegisterForm/RegisterForm";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./Register.module.css";

export const Register = () => {
  const t = useTranslations("registerPage");
  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.welcomeText}>
        {t.rich("breefing.title", {
          subtitle: (chunks: React.ReactNode) => (
            <span className={styles.spanText}>{chunks}</span>
          ),
        })}
      </h1>
      <RondoLoginComposition />
      <RegisterForm />
      <p className={styles.signUpText}>
        {t.rich("registerForm.haveAccount", {
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
