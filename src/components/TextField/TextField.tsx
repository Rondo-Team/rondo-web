import styles from "./TextField.module.css";

interface TextFieldProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  error?: string;
}

export const TextField = ({
  name,
  type,
  placeholder,
  label,
  error,
  ...rest
}: TextFieldProps) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.labelText}>
        {label}
      </label>
      <div className={styles.textFieldContainer}>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${styles.textField} ${error ? styles.textFieldError : ""}`}
          {...rest}
        />
        <p
          className={`${styles.errorText} ${
            error ? styles.errorVisible : styles.errorHidden
          }`}
        >
          {error || " "}
        </p>
      </div>
    </div>
  );
};
