import { useState } from "react";
import "./input.css"
const Input  = (props) => {
  const  [focused,setFocused] = useState(false);  

  const handlefocus = e => {
    setFocused(true)
  }
  return <div className={"Inputform "+props.className}>
      <label> {props.label}</label>
      <span>{props.placeholder}</span>
      <input type={props.type} name={props.name}  required={true} onBlur={handlefocus} focused={focused.toString()} />
      <small className="error">{props.error}</small>
  </div>
}
export default Input;