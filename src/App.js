import "./App.css";
import Form from "./components/Form";
import Display from "./components/Display";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./components/Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Form />}></Route>
          <Route exact path="/create" element={<Display />}></Route>
          <Route exact path="/edit/:id" element={<Edit />}></Route>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
