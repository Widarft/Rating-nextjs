"use client";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPage from "@/pages/AdminPage";
import Rating from "@/pages/Rating";

const Home: React.FC = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Rating />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
