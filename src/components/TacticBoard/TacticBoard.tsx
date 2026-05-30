"use client";

import { FieldElement } from "@/components/TacticBoard/components/FieldElement";
import { FieldElementType } from "@/types/FieldElementType";
import { Play, PlayElement, PlayStep } from "@/types/Play";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./TacticBoard.module.css";
import { ElementPicker } from "./components/ElementPicker";
import { FootballPitch } from "./components/FootballPitch/FootballPitch";
import { StepControls } from "./components/StepControls";

type DragState = {
  elementId: string;
  offsetXPercent: number;
  offsetYPercent: number;
};

type TacticBoardProps = {
  readOnly?: boolean;
  play?: Play;
  onPlayChange?: (play: Play) => void;
};

export type TacticBoardHandle = {
  getPlay: () => Play;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const STEP_PLAYBACK_MS = 800;

export const TacticBoard = forwardRef<TacticBoardHandle, TacticBoardProps>(
  ({ readOnly = false, play, onPlayChange }, ref) => {
    const boardRef = useRef<HTMLDivElement | null>(null);
    const [steps, setSteps] = useState<PlayStep[]>(
      play?.steps || [{ elements: [] }],
    );
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playStepIndex, setPlayStepIndex] = useState(0);
    const [dragState, setDragState] = useState<DragState | null>(null);
    const [boardMode, setBoardMode] = useState<"idle" | "placing" | "deleting">(
      "idle",
    );
    const [pendingType, setPendingType] = useState<FieldElementType | null>(
      null,
    );

    const visibleStepIndex = isPlaying ? playStepIndex : activeStepIndex;
    const visibleElements = steps[visibleStepIndex]?.elements ?? [];

    useImperativeHandle(ref, () => ({
      getPlay: () => ({ steps }),
    }));

    useEffect(() => {
      onPlayChange?.({ steps });
    }, [steps, onPlayChange]);

    const updateActiveStepElements = useCallback(
      (updater: (currentElements: PlayElement[]) => PlayElement[]) => {
        setSteps((currentSteps) => {
          return currentSteps.map((step, index) => {
            if (index !== activeStepIndex) {
              return step;
            }

            return {
              ...step,
              elements: updater(step.elements),
            };
          });
        });
      },
      [activeStepIndex],
    );

    useEffect(() => {
      if (!dragState) {
        return;
      }

      const handlePointerMove = (event: PointerEvent) => {
        const board = boardRef.current;
        if (!board) {
          return;
        }

        const rect = board.getBoundingClientRect();
        const pointerXPercent =
          ((event.clientX - rect.left) / rect.width) * 100;
        const pointerYPercent =
          ((event.clientY - rect.top) / rect.height) * 100;
        const xPercent = clamp(
          pointerXPercent - dragState.offsetXPercent,
          0,
          100,
        );
        const yPercent = clamp(
          pointerYPercent - dragState.offsetYPercent,
          0,
          100,
        );

        updateActiveStepElements((currentElements) => {
          return currentElements.map((element) => {
            if (element.id !== dragState.elementId) {
              return element;
            }

            return {
              ...element,
              x: xPercent,
              y: yPercent,
            };
          });
        });
      };

      const handlePointerUp = () => {
        setDragState(null);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }, [dragState, updateActiveStepElements]);

    useEffect(() => {
      if (!isPlaying) {
        return;
      }

      if (playStepIndex >= steps.length - 1) {
        const endTimer = window.setTimeout(() => {
          setIsPlaying(false);
          setActiveStepIndex(steps.length - 1);
        }, STEP_PLAYBACK_MS);

        return () => {
          window.clearTimeout(endTimer);
        };
      }

      const timer = window.setTimeout(() => {
        setPlayStepIndex((currentIndex) => currentIndex + 1);
      }, STEP_PLAYBACK_MS);

      return () => {
        window.clearTimeout(timer);
      };
    }, [isPlaying, playStepIndex, steps.length]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setBoardMode("idle");
          setPendingType(null);
          (document.activeElement as HTMLElement)?.blur();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const startPlacing = (pieceType: FieldElementType) => {
      if (isPlaying || readOnly) {
        return;
      }
      if (boardMode === "placing" && pendingType === pieceType) {
        setBoardMode("idle");
        setPendingType(null);
      } else {
        setBoardMode("placing");
        setPendingType(pieceType);
      }
    };

    const toggleDeleteMode = () => {
      if (isPlaying || readOnly) {
        return;
      }
      setBoardMode((prev) => (prev === "deleting" ? "idle" : "deleting"));
      setPendingType(null);
    };

    const createStep = () => {
      if (isPlaying || readOnly) {
        return;
      }

      setSteps((currentSteps) => {
        const currentStep = currentSteps[activeStepIndex];
        const nextStep: PlayStep = {
          elements: currentStep.elements.map((element) => ({ ...element })),
        };

        return [
          ...currentSteps.slice(0, activeStepIndex + 1),
          nextStep,
          ...currentSteps.slice(activeStepIndex + 1),
        ];
      });

      setActiveStepIndex((currentIndex) => currentIndex + 1);
    };

    const deleteActiveStep = () => {
      if (isPlaying || readOnly || steps.length === 1) {
        return;
      }

      const nextStepIndex = Math.max(activeStepIndex - 1, 0);

      setSteps((currentSteps) => {
        return currentSteps.filter((_, index) => index !== activeStepIndex);
      });

      setActiveStepIndex(nextStepIndex);
    };

    const goToStep = (stepIndex: number) => {
      if (isPlaying) {
        return;
      }

      setActiveStepIndex(stepIndex);
    };

    const handlePlayToggle = () => {
      if (isPlaying) {
        setIsPlaying(false);
        setActiveStepIndex(playStepIndex);
        return;
      }

      if (steps.length < 2) {
        return;
      }

      setPlayStepIndex(0);
      setIsPlaying(true);
    };

    const handleBoardClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (boardMode !== "placing" || !pendingType) {
        return;
      }

      const board = boardRef.current;
      if (!board) {
        return;
      }

      const rect = board.getBoundingClientRect();
      const xPercent = clamp(
        ((event.clientX - rect.left) / rect.width) * 100,
        0,
        100,
      );
      const yPercent = clamp(
        ((event.clientY - rect.top) / rect.height) * 100,
        0,
        100,
      );

      updateActiveStepElements((currentElements) => [
        ...currentElements,
        { id: uuidv4(), elementType: pendingType, x: xPercent, y: yPercent },
      ]);
    };

    const handlePiecePointerDown = (
      event: React.PointerEvent<HTMLDivElement>,
      element: PlayElement,
    ) => {
      if (isPlaying || readOnly) {
        return;
      }

      if (boardMode === "deleting") {
        event.preventDefault();
        event.stopPropagation();
        updateActiveStepElements((els) =>
          els.filter((e) => e.id !== element.id),
        );
        return;
      }

      if (boardMode === "placing") {
        return;
      }

      const board = boardRef.current;
      if (!board) {
        return;
      }

      event.preventDefault();

      const rect = board.getBoundingClientRect();
      const pointerXPercent = ((event.clientX - rect.left) / rect.width) * 100;
      const pointerYPercent = ((event.clientY - rect.top) / rect.height) * 100;

      setDragState({
        elementId: element.id,
        offsetXPercent: pointerXPercent - element.x,
        offsetYPercent: pointerYPercent - element.y,
      });
    };

    return (
      <div className={styles.wrapper}>
        <div
          ref={boardRef}
          className={`${styles.board} ${dragState ? styles.boardDragging : ""}`}
        >
          <FootballPitch />
          <div
            className={`${styles.overlay} ${boardMode === "placing" ? styles.overlayPlacing : ""}`}
            onClick={handleBoardClick}
          >
            {visibleElements.map((element) => {
              return (
                <div
                  key={element.id}
                  className={`${styles.piece} ${isPlaying ? styles.pieceAnimated : ""} ${readOnly ? styles.pieceReadOnly : ""} ${boardMode === "deleting" ? styles.pieceDeleteMode : ""}`}
                  style={{
                    left: `${element.x}%`,
                    top: `${element.y}%`,
                  }}
                  onPointerDown={(event) =>
                    handlePiecePointerDown(event, element)
                  }
                >
                  <FieldElement type={element.elementType} />
                </div>
              );
            })}
          </div>
        </div>
        {!readOnly && (
          <ElementPicker
            boardMode={boardMode}
            pendingType={pendingType}
            onStartPlacing={startPlacing}
            onToggleDelete={toggleDeleteMode}
          />
        )}
        <StepControls
          steps={steps}
          activeStepIndex={activeStepIndex}
          isPlaying={isPlaying}
          playStepIndex={playStepIndex}
          onGoToStep={goToStep}
          onCreateStep={createStep}
          onDeleteStep={deleteActiveStep}
          onPlayToggle={handlePlayToggle}
          readOnly={readOnly}
        />
      </div>
    );
  },
);

TacticBoard.displayName = "TacticBoard";
