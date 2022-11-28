import "./select.css"
const Select = (props) => {
  return (
    <div className="SelectForm">
      <label> {props.label}</label>
      <span>{props.placeholder}</span>
      <select name={props.name} multiple={props.multiple}>
          {props.options.map((option)  => (
              <option key={option.id} value={option.value}>{option.name} </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
