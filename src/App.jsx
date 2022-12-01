import "./App.css";
import Form from "./components/Form";
import Validate from "./components/Validate";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Form />}/>
        <Route exact path="/validate" element={<Validate/>}/>
      </Routes>
  </Router>
  );
}

export default App;
