import styles from "./TwoOptionsToggle.module.css";

interface ToggleOption<T extends string> {
  label: string;
  value: T;
}

interface TwoOptionsToggleProps<T extends string> {
  firstOption: ToggleOption<T>;
  secondOption: ToggleOption<T>;
  value: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export const TwoOptionsToggle = <T extends string>({
  firstOption,
  secondOption,
  value,
  onChange,
  disabled = false,
  ariaLabel,
}: TwoOptionsToggleProps<T>) => {
  const isFirstOptionActive = value === firstOption.value;
  const activeOption = isFirstOptionActive ? firstOption : secondOption;

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    onChange?.(isFirstOptionActive ? secondOption.value : firstOption.value);
  };

  return (
    <button
      type="button"
      className={styles.toggleButton}
      onClick={handleToggle}
      disabled={disabled}
      aria-label={
        ariaLabel ??
        `Current option ${activeOption.label}. Click to switch option.`
      }
    >
      {activeOption.label}
    </button>
  );
};
