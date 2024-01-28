/* eslint-disable consistent-return */
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import EditProfile from "./EditProfile";
import NewBookReview from "./NewBookReview";
import BookReview from "./BookReview";
import EditBookReview from "./EditBookReview";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/edit/:id" element={<EditBookReview />} />
          <Route path="/detail/:id" element={<BookReview />} />
          <Route path="/new" element={<NewBookReview />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
