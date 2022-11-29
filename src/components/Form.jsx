import { useState } from "react";
import axios from "../api/axios";
import "./form.css";
import Input from "./form/Input";
import Select from "./form/Select";
import { useNavigate } from "react-router-dom";
import Validate from "./Validate";

const Form = () => {
  const navigate = useNavigate();
  var [Data, setData] = useState();
  const handlesubmit = (e) => {
    e.preventDefault();
    let values = new FormData(e.target);
    let data = Object.fromEntries(values.entries());
    if (data.name && data.terms == "on") {
      let selected = e.target[1].selectedOptions;
      let selectedSectors = [];
      for (let i = 0; i < selected.length; i++) {
        const el = selected[i];
        selectedSectors.push({
          id: el.getAttribute("data-id"),
          name: el.textContent,
        });
      }
      if (selectedSectors.length > 0) {
        data.sectors = selectedSectors;
        //Store the state
        setData(data);

        //store to localstorage

        //success push to database
        //request to API for storing data after Rechecking all data.
        const options = {
          url: "/api/user/add",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          data,
        };
        axios(options).then((response) => {
          if (response.status == 200) {
            //redirect to next component
            localStorage.setItem("data", JSON.stringify(data));
            console.log(response.data);
            localStorage.setItem("Logged", response.data._id);
            navigate("/validate");
          }
        });
      } else {
        //someone played with the HTML element fire a error and load the page
        console.log("jm3 krk1");
      }
    } else {
      //someone played with the HTML element fire a error and load the page
      console.log("jm3 krk2");
    }
  };

  // if (localStorage.getItem("Logged")) {
  //   return <Validate />
  // }
  // else {
  return (
    <form onSubmit={handlesubmit}>
      <Input
        className="text"
        label="1. username"
        name="name"
        type="text"
        placeholder="Enter a valid username."
        error="*field required"
      />
      <Select
        label="2. Sectors"
        name="sectors"
        placeholder="pick the Sectors you are currently involved in."
        error="*field required"
      />
      <Input
        className="checkbox"
        label="Agree to terms"
        name="terms"
        type="checkbox"
        error="*"
      />
      <button>Send</button>
    </form>
  );
  // }
};

export default Form;
