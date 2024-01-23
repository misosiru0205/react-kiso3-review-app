/* eslint-disable consistent-return */
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { useSelector } from "react-redux";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import NewBookReview from "./NewBookReview";


export default function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/new" element={<NewBookReview/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
