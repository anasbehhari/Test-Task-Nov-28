import { useEffect, useState } from "react";
import Input from "./form/Input";
import axios from "../api/axios";
import Select from "./form/Select";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Validate = () => {
  //check if user already logged and if it exist too!!
  var [logged, setLogged] = useState(localStorage.getItem("Logged"));
  var [edited, setEdited] = useState("");
  const data = JSON.parse(localStorage.getItem("data"));
  const navigate = useNavigate();

  //check if session is staring (data available and user already submitted data from previous step)
  if (logged && data) {
    //CHECK IF USER REAL FROM DATABASE
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
          localStorage.clear();
          navigate("/");
          setLogged(false);
        }
      });
    }, []);

    //GET Selected sectors to display

    let selectedSectors = data.sectors;
    let selectedIds = [];
    for (let index = 0; index < selectedSectors.length; index++) {
      const element = selectedSectors[index];
      selectedIds.push(element.id);
    }

    //handle sumbit events
    const HandleDelete = (e) => {
      e.preventDefault();
      //delete user request
      axios({
        url: "/api/user/delete",
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { _id: localStorage.getItem("Logged") },
      }).then((res) => {
        if (res.status == 200 && res.data.success) {
          //logged out from session
          localStorage.clear();
          navigate("/");
        } else {
          console.log("something went wrong");
        }
      });
    };

    const HandleEdit = (e) => {
      e.preventDefault();
      setEdited("loading.....");
      let form = e.target.parentNode.parentNode;
      let name = form[0].value;
      let selected = form[1].selectedOptions;
      let selectedSectors = [];
      for (let i = 0; i < selected.length; i++) {
        const el = selected[i];
        selectedSectors.push({
          id: el.getAttribute("data-id"),
          name: el.textContent,
        });
      }

      if (selectedSectors && name) {
        axios({
          url: "/api/user/edit",
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            _id: localStorage.getItem("Logged"),
            name,
            sectors: selectedSectors,
          },
        }).then((res) => {
          if (res.status == 200 && res.data.success) {
            localStorage.setItem("data", JSON.stringify(res.data.updated));
            form[0].value = name;
            var today = new Date();
            var time =
              today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds();

            setEdited("edit " + time);
          } else {
            console.log("something went wrong");
          }
        });
      }
    };

    return (
      <form>
        <h3>
          Hello {data.name}! 👋 <br /> Edit your information
        </h3>
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
        />
        <div className={"message " + edited}>Last {edited}</div>
        <div className="con">
          <button onClick={HandleEdit}>Edit & save</button>
          <button onClick={HandleDelete}>Delete user</button>
        </div>
      </form>
    );
  } else {
    return (
      <div className="lg" >
        <h1>Not logged 🚫</h1>
        <Link to="/">
          Home page
        </Link>
      </div>
    );
  }
};

export default Validate;
