/* eslint-disable consistent-return */
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";

export default function App() {
  const [cookies] = useCookies();

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={cookies.log ? <Home /> : <Navigate to="login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
