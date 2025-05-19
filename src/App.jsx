import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginForm from "./pages/Login";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import UserProvider from "./components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="flex-1 px-4 py-6 pb-[70px] sm:pb-[60px] md:pb-[50px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
