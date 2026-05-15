import { MagnifyingGlassIcon } from "@/components/Icons/MagnifyingGlassIcon";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  placeholder: string;
  onChange: (term: string) => void;
  defaultValue: string;
}

export const SearchBar = ({
  placeholder,
  onChange,
  defaultValue,
}: SearchBarProps) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.textFieldContainer}>
        <div className={styles.iconInsideInput}>
          <MagnifyingGlassIcon />
        </div>
        <input
          placeholder={placeholder}
          className={styles.textField}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};
