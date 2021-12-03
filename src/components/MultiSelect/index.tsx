import Select, { ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";

export interface Option {
  value: string;
  label: string;
}

interface PropTypes {
  className?: string;
  options: Option[];
  onChange: ((newValue: unknown, actionMeta: ActionMeta<unknown>) => void) | undefined;
  placeholder: string;
}

const animatedComponents = makeAnimated();

const MultiSelect = ({ options, className, onChange, placeholder }: PropTypes) => {
  const customStyles = {
    valueContainer: (provided: any) => {
      return { ...provided, maxHeight: "31px", overflowX: "auto", flexWrap: "no-wrap !important" };
    },
    multiValue: (provided: any) => {
      return { ...provided, flexShrink: 0, flexGrow: 1, position: "relative" };
    },
  };
  return (
    <Select
      className={className}
      options={options}
      isMulti
      closeMenuOnSelect={false}
      components={animatedComponents}
      onChange={onChange}
      placeholder={placeholder}
      styles={customStyles}
    />
  );
};

export default MultiSelect;
