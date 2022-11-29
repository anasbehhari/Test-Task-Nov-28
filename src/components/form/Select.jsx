import { useState } from "react";
import "./select.css";
const Select = (props) => {
  const [focused, setFocused] = useState(false);

  const handlefocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="SelectForm">
      <label> {props.label}</label>
      <span>{props.placeholder}</span>
      <select
        name={props.name}
        multiple={props.multiple}
        required={true}
        onBlur={handlefocus}
        focused={focused.toString()}
      >
        {props.options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}{" "}
          </option>
        ))}
      </select>
      <small className="error">{props.error}</small>
    </div>
  );
};

export default Select;
