import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import UserProvider from "./components/context/UserContext";
import PublicRoute from "./routes/PublicRoute";
import Settings from "./pages/Setting";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import Contact from "./pages/Contact";
import Note from "./pages/Note";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import GroupDetail from "./pages/GroupDetail";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="flex-1 px-4 py-1 pb-[70px] sm:pb-[60px] md:pb-[50px] mb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                // <PublicRoute>
                <LoginForm />
                // </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />

            <Route
              path="/settings"
              element={
                // <PrivateRoute>
                <Settings />
                // </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                // <PrivateRoute>
                <Profile />
                // </PrivateRoute>
              }
            />
            <Route
              path="/notes"
              element={
                // <PrivateRoute>
                <Note />
                // </PrivateRoute>
              }
            />
            <Route path="/notes/group/:id" element={<GroupDetail />} />
            {/* <Route path="/group/:id" element={<GroupDetail />} /> */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
