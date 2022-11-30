import "./App.css";
import Form from "./components/Form";
import Validate from "./components/Validate";
import NotFound from "./components/NotFound"
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Form />}/>
        <Route exact path="/validate" element={<Validate/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
  </Router>
  );
}

export default App;
