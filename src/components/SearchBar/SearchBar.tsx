import { MagnifyingGlassIcon } from "@/components/Icons/MagnifyingGlassIcon";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  placeholder: string;
  onChange: (term: string) => void;
}

export const SearchBar = ({ placeholder, onChange }: SearchBarProps) => {
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
        />
      </div>
    </div>
  );
};
