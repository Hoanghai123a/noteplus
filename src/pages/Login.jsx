import React, { useContext, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../components/api.js";
import { UserContext } from "../components/context/UserContext.jsx";

const { Title, Text } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // nên là null thay vì chuỗi rỗng
  console.log("user login", user);

  const { login } = useContext(UserContext);
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const data = await api.post("/pheduyet/login/", {
        username: values.username,
        password: values.password,
      });

      console.log("Login response:", data);

      if (data?.access_token) {
        setUser({ token: data.access_token });

        // Lưu vào localStorage
        // localStorage.setItem("access_token", data.access_token);
        // localStorage.setItem("refresh_token", data.refresh_token);
        login({ username: values.username, token: data.access_token });
        message.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        message.error("Không nhận được token từ server.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Tài khoản hoặc mật khẩu không đúng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen-md bg-gradient-to-br from-white to-blue-50"
      style={{ padding: "1rem" }}
    >
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Đăng nhập
        </Title>
        <Form
          layout="vertical"
          onFinish={handleLogin}
          initialValues={{ username: "", password: "" }}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              size="large"
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <Text type="secondary" className="block text-center">
            Chưa có tài khoản?{" "}
            <a href="#" className="text-blue-500">
              Đăng ký
            </a>
          </Text>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
