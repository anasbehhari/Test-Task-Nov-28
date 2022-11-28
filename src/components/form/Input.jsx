import "./input.css"
const Input  = (props) => {
  return <div className={"Inputform "+props.className}>
      <label> {props.label}</label>
      <span>{props.placeholder}</span>
      <input type={props.type} name={props.name}  />
  </div>
}
export default Input;