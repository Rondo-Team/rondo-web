import styles from "./NumericInput.module.css";

interface NumericInputProps {
  ariaLabel?: string;
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export const NumericInput = ({
  ariaLabel = "Numeric input",
  value,
  onChange,
  min = 0,
  max = 999999,
  step = 1,
  disabled = false,
}: NumericInputProps) => {
  const safeValue = Number.isNaN(value) ? min : value;
  const valueDigits = String(Math.abs(Math.trunc(safeValue))).length;
  const inputChars = Math.min(Math.max(valueDigits, 1), 6);

  const clampValue = (nextValue: number) => {
    if (Number.isNaN(nextValue)) {
      return min;
    }

    return Math.max(min, Math.min(nextValue, max));
  };

  const handleChange = (nextValue: number) => {
    onChange?.(clampValue(nextValue));
  };

  return (
    <div className={styles.container} aria-label={ariaLabel}>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.stepButton}
          onClick={() => handleChange(value - step)}
          disabled={disabled || value <= min}
          aria-label="Decrease value"
        >
          -
        </button>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => handleChange(Number(e.target.value))}
          className={styles.numberInput}
          style={{ width: `${inputChars}ch`, maxWidth: "6ch" }}
          aria-label={ariaLabel}
        />
        <button
          type="button"
          className={styles.stepButton}
          onClick={() => handleChange(value + step)}
          disabled={disabled || value >= max}
          aria-label="Increase value"
        >
          +
        </button>
      </div>
    </div>
  );
};
