import { useEffect, useState } from "react";
import Input from "./form/Input";
import axios from "../api/axios";
import Select from "./form/Select";
const Validate = () => {
  //check if user already logged and if it exist too!!
  var [logged, setLogged] = useState(localStorage.getItem("Logged"));

  useEffect(() => {
    const options = {
      url: "/api/user/check",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { _id: logged },
    };
    axios(options).then((res) => {
      if (res.status == 200 && res.data.success) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, []);

  //GET user data from localstorage
 
  if (logged) {
    let data = JSON.parse(localStorage.getItem("data"));
    let selectedSectors = data.sectors;
    let selectedIds = [];

    for (let index = 0; index < selectedSectors.length; index++) {
        const element = selectedSectors[index];
        selectedIds.push(element.id)
    }

    return (
      <form>
        <h3>Hi {data.name}! 👋  <br /> Here you can Edit your information</h3>
        <Input
          className="text"
          label="1. username"
          name="name"
          type="text"
          placeholder="Edit your username"
          error="*field required"
          value={data.name}
        />
        <Select
          label="2. Sectors"
          name="sectors"
          placeholder="Edit your sectors "
          error="*field required"
          selected={selectedIds}
        />
        <div className="con">
          <button>Edit & save</button>
          <button>Delete user</button>
        </div>
      </form>
    );
  } else {
    return <h1>not logged</h1>;
  }
};

export default Validate;
