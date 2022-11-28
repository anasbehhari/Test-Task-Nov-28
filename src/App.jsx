import "./App.css";
import Select from "react-select";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Form from "./components/Form";
import Validate from "./components/Validate";
import Header from "./components/Header";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
function App() {
  return (
    <div className="App">
      <Header />
      <div className="components-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Form />}></Route>
            <Route path="/validate" element={<Validate />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
