import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Button, Dropdown, Avatar, Drawer, Switch } from "antd";
import {
  BulbOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MdOutlineNoteAlt } from "react-icons/md";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import { GrGroup } from "react-icons/gr";
import { FcApprove } from "react-icons/fc";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const isAdmin = user?.role === "admin";
  console.log("user", user);
  console.log("level", user?.level);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      icon: <HomeOutlined />,
      key: "/",
      label: "Home",
    },
    {
      icon: <MdOutlineNoteAlt />,
      key: "/notes",
      label: "Notes",
    },
    {
      icon: <GrGroup />,
      key: "/group",
      label: "Group",
    },
    // {
    //   icon: <InfoCircleOutlined />,
    //   key: "/about",
    //   label: "About",
    // },
    // {
    //   icon: <MailOutlined />,
    //   key: "/contact",
    //   label: "Contact",
    // },
    {
      icon: <FcApprove />,
      key: "/pheduyet",
      label: "Phê Duyệt",
    },
  ];

  if (isAdmin) {
    menuItems.push({
      icon: <SettingOutlined />,
      key: "/admin/dashboard",
      label: "Admin Panel",
    });
  }

  const userMenu = (
    <Menu className="dark:bg-gray-900">
      {/* admin dashboard */}
      <Menu.Item
        key="admin"
        icon={<SettingOutlined />}
        hidden={!isAdmin}
        onClick={() => navigate("/admin/dashboard")}
      >
        Admin Dashboard
      </Menu.Item>

      <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={() => navigate("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="settings"
        icon={<SettingOutlined />}
        onClick={() => navigate("/settings")}
      >
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        danger
        icon={<LogoutOutlined />}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          background: isDarkMode ? "#1f1f1f" : "white",
          transition: "background 0.3s ease",
          // scrolled
        }}
        className={`shadow-sm dark:shadow dark:border-b dark:border-gray-700
        ${scrolled ? "bg-white dark:bg-black shadow-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo & Menu (left-aligned) */}
          <div className="flex items-center space-x-8">
            <div className="text-black text-2xl font-bold dark:text-white">
              <Link to="/">Note Plus</Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              {/* {user && ( */}
              <Menu
                theme={isDarkMode ? "dark" : "light"}
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
              />
              {/* )} */}
            </div>
          </div>
          {/* Right side (auth or avatar) */}
          <div className="hidden md:flex items-center space-x-4">
            <span>Hi {localStorage.getItem("username")}</span>
            <div className="flex items-center gap-1">
              <BulbOutlined className="text-yellow-500" />
              <Switch
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
              />
            </div>

            {user ? (
              <Dropdown overlay={userMenu} placement="bottomRight">
                <Avatar
                  className="cursor-pointer bg-blue-500"
                  icon={<UserOutlined />}
                />
              </Dropdown>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-white  hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 dark:text-white  hover:text-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Drawer Button */}
          <div className="md:hidden">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
            />
          </div>
        </div>

        {/* Drawer for Mobile */}
        <Drawer
          // title="Menu"
          title={
            <div className="flex justify-between items-center">
              <span>Menu</span>
              <div className="flex items-center gap-2">
                <BulbOutlined className="text-yellow-500" />
                <Switch
                  size="small"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                />
              </div>
            </div>
          }
          placement="right"
          closable
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          {user ? (
            <>
              {menuItems.map((item) => (
                <div
                  key={item.key}
                  className="mb-4 flex items-center cursor-pointer"
                  onClick={() => {
                    navigate(item.key);
                    setDrawerVisible(false);
                  }}
                >
                  {item.icon} <span className="ml-2">{item.label}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div
                className="mb-2 cursor-pointer"
                onClick={() => {
                  navigate("/settings");
                  setDrawerVisible(false);
                }}
              >
                <SettingOutlined /> <span className="ml-2">Settings</span>
              </div>
              <div
                className="mb-2 cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                  setDrawerVisible(false);
                }}
              >
                <UserOutlined /> <span className="ml-2">Profile</span>
              </div>
              <div
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  logout();
                  setDrawerVisible(false);
                  navigate("/login");
                }}
              >
                <LogoutOutlined /> <span className="ml-2">Logout</span>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setDrawerVisible(false)}
                className="block mb-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setDrawerVisible(false)}
                className="block"
              >
                Register
              </Link>
            </>
          )}
        </Drawer>
      </Header>
    </>
  );
};

export default Navbar;
