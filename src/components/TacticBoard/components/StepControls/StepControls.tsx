import { Button } from "@/components/Button/Button";
import { StepButton } from "./components/StepButton";
import styles from "./StepControls.module.css";

type Step = {
  id: string;
};

type StepControlsProps = {
  steps: Step[];
  activeStepIndex: number;
  isPlaying: boolean;
  playStepIndex: number;
  onGoToStep: (index: number) => void;
  onCreateStep: () => void;
  onDeleteStep: () => void;
  onPlayToggle: () => void;
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
}: StepControlsProps) => {
  return (
    <div className={styles.stepControls}>
      <div className={styles.stepActions}>
        <Button
          type="button"
          variant="secondary"
          onClick={onCreateStep}
          disabled={isPlaying}
        >
          Add step
        </Button>
        <Button
          type="button"
          variant="tertiary"
          onClick={onDeleteStep}
          disabled={steps.length === 1 || isPlaying}
        >
          Delete step
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={onPlayToggle}
          disabled={steps.length < 2}
        >
          {isPlaying ? "Stop" : "Play"}
        </Button>
      </div>
      <div className={styles.stepList}>
        {steps.map((step, index) => {
          const isStepActive = index === activeStepIndex && !isPlaying;
          const isStepPlaying = index === playStepIndex && isPlaying;

          return (
            <StepButton
              key={step.id}
              type="button"
              variant={isStepActive || isStepPlaying ? "active" : "default"}
              onClick={() => onGoToStep(index)}
            >
              {`Step ${index + 1}`}
            </StepButton>
          );
        })}
      </div>
    </div>
  );
};
