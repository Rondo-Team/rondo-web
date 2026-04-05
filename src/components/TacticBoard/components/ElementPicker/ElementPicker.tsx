import { Button } from "@/components/Button/Button";
import { FieldElement } from "@/components/TacticBoard/components/FieldElement";
import { FieldElementType } from "@/types/FieldElementType";
import styles from "./ElementPicker.module.css";

type ElementPickerProps = {
  onSelect: (pieceType: FieldElementType) => void;
};

export const ElementPicker = ({ onSelect }: ElementPickerProps) => {
  return (
    <div className={styles.palette}>
      <Button
        type="button"
        variant="secondary"
        onClick={() => onSelect(FieldElementType.TEAMMATE)}
      >
        <div className={styles.buttonContent}>
          <FieldElement type={FieldElementType.TEAMMATE} />
          <p>Add teammate</p>
        </div>
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => onSelect(FieldElementType.RIVAL)}
      >
        <div className={styles.buttonContent}>
          <FieldElement type={FieldElementType.RIVAL} />
          <p>Add rival</p>
        </div>
      </Button>

      <Button
        type="button"
        variant="secondary"
        onClick={() => onSelect(FieldElementType.BALL)}
      >
        <div className={styles.buttonContent}>
          <FieldElement type={FieldElementType.BALL} size="large" />
          <p>Add ball</p>
        </div>
      </Button>
    </div>
  );
};
