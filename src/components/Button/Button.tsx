import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button = ({
  variant = "primary",
  children,
  ...rest
}: ButtonProps) => {

  return (
    <button
      className={`${styles[variant]} ${styles.buttonContainer}`}
      {...rest}
    >
      {children}
    </button>
  );
};
