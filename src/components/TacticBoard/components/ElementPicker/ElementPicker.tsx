import { Button } from "@/components/Button/Button";
import { FieldElement } from "@/components/TacticBoard/components/FieldElement";
import { FieldElementType } from "@/types/FieldElementType";
import { useTranslations } from "next-intl";
import styles from "./ElementPicker.module.css";

type ElementPickerProps = {
  boardMode: "idle" | "placing" | "deleting";
  pendingType: FieldElementType | null;
  onStartPlacing: (pieceType: FieldElementType) => void;
  onToggleDelete: () => void;
};

export const ElementPicker = ({
  boardMode,
  pendingType,
  onStartPlacing,
  onToggleDelete,
}: ElementPickerProps) => {
  const t = useTranslations("createPage.createForm.tacticBoard.elementControls");
  return (
    <div className={styles.palette}>
      <Button
        type="button"
        variant={
          boardMode === "placing" && pendingType === FieldElementType.TEAMMATE
            ? "primary"
            : "secondary"
        }
        onClick={() => onStartPlacing(FieldElementType.TEAMMATE)}
      >
        <div className={styles.buttonContent}>
          <FieldElement type={FieldElementType.TEAMMATE} />
          <p>{t("addTeammate")}</p>
        </div>
      </Button>
      <Button
        type="button"
        variant={
          boardMode === "placing" && pendingType === FieldElementType.RIVAL
            ? "primary"
            : "secondary"
        }
        onClick={() => onStartPlacing(FieldElementType.RIVAL)}
      >
        <div className={styles.buttonContent}>
          <FieldElement type={FieldElementType.RIVAL} />
          <p>{t("addRival")}</p>
        </div>
      </Button>
      <Button
        type="button"
        variant={
          boardMode === "placing" && pendingType === FieldElementType.BALL
            ? "primary"
            : "secondary"
        }
        onClick={() => onStartPlacing(FieldElementType.BALL)}
      >
        <div className={styles.buttonContent}>
          <FieldElement type={FieldElementType.BALL} size="large" />
          <p>{t("addBall")}</p>
        </div>
      </Button>
      <Button
        type="button"
        variant={boardMode === "deleting" ? "primary" : "secondary"}
        onClick={onToggleDelete}
      >
        <div className={styles.buttonContent}>
          <span className={styles.deleteIcon}>✕</span>
          <p>{t("deleteElement")}</p>
        </div>
      </Button>
    </div>
  );
};
