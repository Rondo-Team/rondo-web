import { DraftMediumCard } from "@/components/DraftMediumCard/Card/DraftMediumCard";
import { getDraftsByUser } from "@/features/private/myTactics/components/MyTacticsContent/components/DraftsContainer/queries/getDraftsByUser";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import Link from "next/link";
import styles from "./DraftsContainer.module.css";

export const DraftsContainer = async () => {
  const drafts = await getDraftsByUser();
  if (!drafts) return <div>Could not fetch drafts</div>;
  if (drafts.length === 0) return <div>You dont have drafts yet</div>;
  return (
    <div className={styles.draftsContainer}>
      {drafts.map((draft) => (
        <Link href={`${AppSectionsRoutes.DRAFT}/${draft.id}`} key={draft.id}>
          <DraftMediumCard
            title={draft.title}
            description={draft.description}
          />
        </Link>
      ))}
    </div>
  );
};
