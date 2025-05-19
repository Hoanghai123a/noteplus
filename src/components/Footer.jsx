import React from "react";
import { Layout, Typography, Space } from "antd";
const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  return (
    <AntFooter
      style={{
        position: "fixed", // luôn hiện ở cuối
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        background:
          "linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0))",
        backdropFilter: "blur(6px)", // hiệu ứng mờ
        backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent
        borderTop: "1px solid #ddd",
        marginTop: "20px",
      }}
      className="py-2 text-center"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <Space direction="vertical" size="small">
          <Text className="text-sm text-gray-600">
            Note Plus © {new Date().getFullYear()} - All Rights Reserved
          </Text>
        </Space>
      </div>
    </AntFooter>
  );
};

export default Footer;
