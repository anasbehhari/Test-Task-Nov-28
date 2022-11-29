import { useEffect, useState } from "react";
import axios from "../api/axios";

const Validate = () => {
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
      }
      else {
        setLogged(false);
      }
    });
  }, []);

  if(logged) {
   return <h1>Logged</h1>
  }
  else {
      return <h1>not logged</h1>
  }
};

export default Validate;
