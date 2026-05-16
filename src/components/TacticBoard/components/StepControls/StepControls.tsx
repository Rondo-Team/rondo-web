import { Button } from "@/components/Button/Button";
import { PlayStep } from "@/types/Play";
import { useTranslations } from "next-intl";
import { StepButton } from "./components/StepButton";
import styles from "./StepControls.module.css";

type StepControlsProps = {
  steps: PlayStep[];
  activeStepIndex: number;
  isPlaying: boolean;
  playStepIndex: number;
  onGoToStep: (index: number) => void;
  onCreateStep?: () => void;
  onDeleteStep?: () => void;
  onPlayToggle: () => void;
  readOnly?: boolean;
};

export const StepControls = ({
  steps,
  activeStepIndex,
  isPlaying,
  playStepIndex,
  onGoToStep,
  onCreateStep,
  onDeleteStep,
  onPlayToggle,
  readOnly = false,
}: StepControlsProps) => {
  const t = useTranslations("createPage.createForm.tacticBoard.stepControls");
  return (
    <div className={styles.stepControls}>
      <div className={styles.stepActions}>
        {!readOnly && (
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={onCreateStep}
              disabled={isPlaying}
            >
              {t("addStep")}
            </Button>
            <Button
              type="button"
              variant="tertiary"
              onClick={onDeleteStep}
              disabled={steps.length === 1 || isPlaying}
            >
              {t("deleteStep")}
            </Button>
          </>
        )}
        <Button
          type="button"
          variant="primary"
          onClick={onPlayToggle}
          disabled={steps.length < 2}
        >
          {isPlaying ? t("stop") : t("play")}
        </Button>
      </div>
      <div className={styles.stepList}>
        {steps.map((step, index) => {
          const isStepActive = index === activeStepIndex && !isPlaying;
          const isStepPlaying = index === playStepIndex && isPlaying;

          return (
            <StepButton
              key={index}
              type="button"
              variant={isStepActive || isStepPlaying ? "active" : "default"}
              onClick={() => onGoToStep(index)}
            >
              {`${t("step")} ${index + 1}`}
            </StepButton>
          );
        })}
      </div>
    </div>
  );
};
