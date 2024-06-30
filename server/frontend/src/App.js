// frontend/src/App.js

import LoginPanel from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Dealers from './components/Dealers/Dealers';  // Import the Dealers component
import PostReview from "./components/Dealers/PostReview";
import Dealer from "./components/Dealers/Dealer"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dealers" element={<Dealers />} />  // Ensure route matches Django URL
      <Route path="/dealer/:id" element={<Dealers />} />  // Ensure route matches Django URL
      <Route path="/postreview/:id" element={<PostReview />} />  // Ensure route matches Django URL
      <Route path="/dealer/:id" element={<Dealer/>} />
    </Routes>
  );
}

export default App;
