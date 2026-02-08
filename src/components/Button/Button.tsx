import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "login";
}

export const Button = ({
  variant = "login",
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
