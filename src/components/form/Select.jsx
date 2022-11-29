import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./select.css";
const Select = (props) => {
  //init state for focus event for better UI
  const [focused, setFocused] = useState(false);
  //Focus function
  const handlefocus = (e) => {
    setFocused(true);
  };


  //init state for loading component
  const [loading, setLoading] = useState(true);
  //init state for storing options and retreiving it from database
  const [options, setOptions] = useState(true);

  //Request function
  const getOptions = async () => {
    const options = {
      method: "GET",
      url: "/api/sectors",
      headers: {
        "x-rapidapi-key": "",
        "x-rapidapi-host": "",
      },
    };
    try {
      const { data } = await axios.request(options);
      setOptions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //firing function for getting data from database 
  useEffect(() => {
    getOptions();
  }, []);

  //check if data is loaded 
  if (loading) return <p> Loading ... </p>;

  return (
    <div className="SelectForm">
      <label> {props.label}</label>
      <span>{props.placeholder}</span>
      <select
        name={props.name}
        multiple={true}
        required={true}
        onBlur={handlefocus}
        focused={focused.toString()}
      >
        {options.map((option) => (
          <option data-id={option._id} key={option._id} value={option.name}>
            {option.name}{" "}
          </option>
        ))}
      </select>
      <small className="error">{props.error}</small>
    </div>
  );
};

export default Select;
