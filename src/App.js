import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import FormBuilder from "./components/FormBuilder";
import FormRenderer from "./components/FormRenderer";
import { FormConfigProvider } from "./customContext/FormConfigContext";
import Home from "./components/Home";

function App() {
  return (
    <FormConfigProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/form-builder" element={<FormBuilder/>} />
            <Route path="/form-renderer" element={<FormRenderer/>} />
          </Routes>
        </div>
      </Router>
    </FormConfigProvider>
  );
}

export default App;
