import { NewPlayButton } from "@/components/NewPlayButton";
import { QuickAccessCard } from "@/components/QuickAccessCard";
import { getUserRecentPlays } from "@/features/private/home/components/QuickAccess/components/QuickAccessContent/queries/getUserRecentPlays";
import { playTypeToHref } from "@/features/private/home/components/QuickAccess/components/QuickAccessContent/utils/playTypeToHref";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import styles from "./QuickAccessContent.module.css";

export const QuickAccessContent = async () => {
  const recentlyViewedPlays = await getUserRecentPlays();
  const locale = await getLocale();
  const t = await getTranslations("homePage.quickAccess");

  return (
    <div className={styles.quickAccesContentContainer}>
      {recentlyViewedPlays?.map((play) => (
        <Link href={`${playTypeToHref(play.type)}/${play.id}`} key={play.id}>
          <QuickAccessCard
            title={play.title}
            openedAt={t("openedAt", {
              timeAgo: formatRelativeDate(play.openedAt, locale),
            })}
          />
        </Link>
      ))}
      <Link href={`${AppSectionsRoutes.CREATE}`}>
        <NewPlayButton text={t("newTactic")} />
      </Link>
    </div>
  );
};
