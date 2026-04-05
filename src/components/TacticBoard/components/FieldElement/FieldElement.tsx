import { FieldElementType } from "@/types/FieldElementType";
import styles from "./FieldElement.module.css";

interface FieldElementProps {
  type: FieldElementType;
  size?: "default" | "large";
}

export const FieldElement = ({ type, size = "default" }: FieldElementProps) => {
  const typeClassName = styles[type.toLowerCase() as "player" | "ball"];
  const sizeClassName = size === "large" ? styles.large : "";

  return (
    <div className={`${styles.piece} ${typeClassName} ${sizeClassName}`}></div>
  );
};
