import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, HTMLProps, useRef, useState } from "react";
import styles from "./SearchInput.module.scss";

type ModifiedInputElement = Omit<HTMLProps<HTMLInputElement>, "onChange">;

interface PropTypes extends ModifiedInputElement {
  onChange: (value: string) => void;
  showChangesFromLength: number;
  containterClassName: string;
}

const SearchInput = ({
  type,
  containterClassName,
  className,
  onChange,
  showChangesFromLength,
  ...otherProps
}: PropTypes) => {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    if (value.length >= showChangesFromLength) onChange(value);
    else onChange("");
  };

  const handleClearButton = () => {
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={`${containterClassName} ${styles.inputContainer}`.trim()}>
      <div className={`d-flex ai-center jc-center ${styles.icon}`} onClick={() => inputRef.current?.focus()}>
        <FontAwesomeIcon icon={faSearch} width={48} height={48} />
      </div>

      <div className={`d-flex ai-center jc-center ${styles.icon} ${styles.closeIcon}`} onClick={handleClearButton}>
        <FontAwesomeIcon icon={faTimes} width={48} height={48} />
      </div>

      <input
        ref={inputRef}
        className={`${styles.searchInput} ${className}`.trim()}
        type={type}
        value={value}
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  );
};

SearchInput.defaultProps = {
  type: "text",
  className: "",
  onChange: () => {},
  showChangesFromLength: 2,
  containterClassName: "",
};

export default SearchInput;
