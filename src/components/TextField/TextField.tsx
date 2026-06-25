import { ReactNode } from "react";
import styles from "./TextField.module.css";

export interface TextFieldProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  description?: string;
  defaultValue?: string;
  error?: string;
  trailing?: ReactNode;
}

export const TextField = ({
  name,
  type,
  placeholder,
  label,
  description,
  defaultValue,
  error,
  trailing,
  ...rest
}: TextFieldProps) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.labelText}>
        {label}
      </label>
      {description && <p className={styles.descriptionText}>{description}</p>}
      <div className={styles.textFieldContainer}>
        <div className={styles.inputWrapper}>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`${styles.textField} ${trailing ? styles.textFieldWithTrailing : ""} ${error ? styles.textFieldError : ""}`}
            {...rest}
          />
          {trailing && <div className={styles.trailing}>{trailing}</div>}
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    </div>
  );
};
