import React from "react";
import styles from "./StepButton.module.css";

interface StepButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "default" | "active";
}

export const StepButton = ({
  variant = "default",
  children,
  ...rest
}: StepButtonProps) => {
  return (
    <button
      className={`${styles[variant]} ${styles.buttonContainer}`}
      {...rest}
    >
      {children}
    </button>
  );
};
