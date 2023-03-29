import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUser from "./views/CreateUser/CreateUser";
import EditUser from "./views/EditUser/EditUser";
import Home from "./views/Home/Home";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
