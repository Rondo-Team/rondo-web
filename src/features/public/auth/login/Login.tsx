import { Avatar } from "@/components/Avatar";
import { useTranslations } from "next-intl";

export const Login = () => {
  const t = useTranslations("LoginPage");
  return (
    <div>
      <p>{t("title")}</p>
      <Avatar initials="GD" />
    </div>
  );
};
