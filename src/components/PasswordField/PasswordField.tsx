"use client";
import { EyeIcon } from "@/components/Icons/EyeIcon";
import { EyeOffIcon } from "@/components/Icons/EyeOffIcon";
import { TextField, TextFieldProps } from "@/components/TextField/TextField";
import { useState } from "react";
import styles from "./PasswordField.module.css";

interface PasswordFieldProps extends Omit<TextFieldProps, "type" | "trailing"> {
  showLabel?: string;
  hideLabel?: string;
}

export const PasswordField = ({
  showLabel,
  hideLabel,
  ...rest
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...rest}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
    />
  );
};
