import { ProposalLargeCard } from "@/components/ProposalLargeCard";
import { getAllProposalsByUserId } from "@/features/private/home/components/MyDiscussions/components/MyDiscussionsContent/queries/getAllProposalsByUserId";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { getUserIdFromCookie } from "@/utils/getUserIdFromCookie";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import styles from "./MyDiscussionsContent.module.css";

export const MyDiscussionsContent = async () => {
  const locale = await getLocale();
  const t = await getTranslations("homePage.myDiscussions");

  const userId = await getUserIdFromCookie();
  if (!userId) return <div>{t("couldNotFetch")}</div>;

  const allProposals = await getAllProposalsByUserId(userId);
  const proposals = allProposals?.slice(0, 4);
  if (!proposals) return <div>{t("noProposals")}</div>;

  return proposals.map((proposal) => (
    <Link
      className={styles.myDiscussionsContainer}
      key={proposal.id}
      href={`${AppSectionsRoutes.PROPOSAL}/${proposal.id}`}
    >
      <ProposalLargeCard
        title={proposal.title}
        createdAt={t("createdAt", {
          timeAgo: formatRelativeDate(proposal.createdAt, locale),
        })}
        basicInfo={t("proposedFor", {
          parentPost: proposal.postTitle,
        })}
        status={proposal.status}
      />
    </Link>
  ));
};
