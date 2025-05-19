import React, { useContext } from "react";
import { Layout, Menu, Button } from "antd";
import { HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegStickyNote } from "react-icons/fa";
import { UserContext } from "../components/context/UserContext";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  //   const handleLogout = () => {
  //     logout();
  //     navigate("/login");
  //   };
  console.log("user", user);

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      icon: <InfoCircleOutlined />,
      key: "/about",
      label: <Link to="/about">About</Link>,
    },
    {
      key: "/note",
      icon: <FaRegStickyNote />,
      label: <Link to="/note">Note</Link>,
    },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        background: "white",
      }}
      className="header-navbar"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-black text-2xl font-bold mr-8">Note Plus</div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="flex-1"
        />
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span>Hi, {user.username}</span>
              <Button
                danger
                size="small"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
