import "./form.css"
import Input from "./form/Input";
import Select from "./form/Select";

const Form = () => {
  let options = [
    {
      id: 1,
      value: 1,
      name: "Manufacturing",
    },
    {
      id: 2,
      value: 2,
      name: "Construction materials",
    },

    {
      id: 3,
      value: 3,
      name: "Electronics and Optics",
    }
  ];
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <form onSubmit={handlesubmit}>
      <Input  className="text"label="1. username" name="name" type="text" placeholder="Enter a valid username." />
      <Select label="2. Sectors" name="sectors" placeholder="pick the Sectors you are currently involved in." multiple={true} options={options}/>
      <Input className="checkbox" label=" Agree to terms" name="terms" type="checkbox"/>
      <button >Send </button>
    </form>
  );
};

export default Form;
