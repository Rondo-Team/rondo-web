"use client";

import { FieldElement } from "@/components/TacticBoard/components/FieldElement";
import { FieldElementType } from "@/types/FieldElementType";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./TacticBoard.module.css";
import { ElementPicker } from "./components/ElementPicker";
import { FootballPitch } from "./components/FootballPitch/FootballPitch";
import { StepControls } from "./components/StepControls";

type PieceType = FieldElementType;

enum BaseXPercentByType {
  "TEAMMATE" = 35,
  "RIVAL" = 85,
  "BALL" = 50,
}

type BoardPiece = {
  id: string;
  type: PieceType;
  xPercent: number;
  yPercent: number;
};

type BoardStep = {
  id: string;
  pieces: BoardPiece[];
};

type DragState = {
  pieceId: string;
  offsetXPercent: number;
  offsetYPercent: number;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const generatePieceId = () => {
  return uuidv4();
};

const generateStepId = () => {
  return uuidv4();
}; // Use the same as piece id

const STEP_PLAYBACK_MS = 800;

export const TacticBoard = () => {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [steps, setSteps] = useState<BoardStep[]>([
    { id: generateStepId(), pieces: [] },
  ]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playStepIndex, setPlayStepIndex] = useState(0);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const visibleStepIndex = isPlaying ? playStepIndex : activeStepIndex;
  const visiblePieces = steps[visibleStepIndex]?.pieces ?? [];

  const updateActiveStepPieces = useCallback(
    (updater: (currentPieces: BoardPiece[]) => BoardPiece[]) => {
      setSteps((currentSteps) => {
        return currentSteps.map((step, index) => {
          if (index !== activeStepIndex) {
            return step;
          }

          return {
            ...step,
            pieces: updater(step.pieces),
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
      const pointerXPercent = ((event.clientX - rect.left) / rect.width) * 100;
      const pointerYPercent = ((event.clientY - rect.top) / rect.height) * 100;
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

      updateActiveStepPieces((currentPieces) => {
        return currentPieces.map((piece) => {
          if (piece.id !== dragState.pieceId) {
            return piece;
          }

          return {
            ...piece,
            xPercent,
            yPercent,
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
  }, [dragState, updateActiveStepPieces]);

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

  const addPiece = (pieceType: PieceType) => {
    if (isPlaying) {
      return;
    }

    updateActiveStepPieces((currentPieces) => {
      const sameTypeCount = currentPieces.filter(
        (piece) => piece.type === pieceType,
      ).length;
      const baseXPercent = BaseXPercentByType[pieceType];
      const nextXPercent = clamp(baseXPercent + sameTypeCount * 3, 8, 92);

      return [
        ...currentPieces,
        {
          id: generatePieceId(),
          type: pieceType,
          xPercent: nextXPercent,
          yPercent: 50,
        },
      ];
    });
  };

  const createStep = () => {
    if (isPlaying) {
      return;
    }

    setSteps((currentSteps) => {
      const currentStep = currentSteps[activeStepIndex];
      const nextStep: BoardStep = {
        id: generateStepId(),
        pieces: currentStep.pieces.map((piece) => ({ ...piece })),
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
    if (isPlaying || steps.length === 1) {
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

  const handlePiecePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    piece: BoardPiece,
  ) => {
    if (isPlaying) {
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
      pieceId: piece.id,
      offsetXPercent: pointerXPercent - piece.xPercent,
      offsetYPercent: pointerYPercent - piece.yPercent,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div
        ref={boardRef}
        className={`${styles.board} ${dragState ? styles.boardDragging : ""}`}
      >
        <FootballPitch />
        <div className={styles.overlay}>
          {visiblePieces.map((piece) => {
            return (
              <div
                key={piece.id}
                className={`${styles.piece} ${isPlaying ? styles.pieceAnimated : ""}`}
                style={{
                  left: `${piece.xPercent}%`,
                  top: `${piece.yPercent}%`,
                }}
                onPointerDown={(event) => handlePiecePointerDown(event, piece)}
              >
                <FieldElement type={piece.type} />
              </div>
            );
          })}
        </div>
      </div>
      <ElementPicker onSelect={addPiece} />
      <StepControls
        steps={steps}
        activeStepIndex={activeStepIndex}
        isPlaying={isPlaying}
        playStepIndex={playStepIndex}
        onGoToStep={goToStep}
        onCreateStep={createStep}
        onDeleteStep={deleteActiveStep}
        onPlayToggle={handlePlayToggle}
      />
    </div>
  );
};
