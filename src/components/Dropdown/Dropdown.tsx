import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import styles from "./Dropdown.module.css";

export interface DropdownOption<T extends string = string> {
  label: string;
  value: T;
}

interface DropdownProps<T extends string = string> {
  options: DropdownOption<T>[];
  value?: T;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: T) => void;
}

export const Dropdown = <T extends string = string>({
  options,
  value,
  placeholder = "Select…",
  disabled = false,
  onChange,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (optionValue: T) => {
    onChange?.(optionValue);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedLabel ?? placeholder}
        <ChevronDownIcon />
      </button>

      {open && (
        <div className={styles.menu} role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={`${styles.option} ${option.value === value ? styles.optionSelected : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
