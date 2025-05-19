import React from "react";
import { Layout, Typography, Button } from "antd";
import { Link } from "react-router-dom";

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const NotFound = () => {
  return (
    <Layout className="min-h-screen">
      <Content className="container mx-auto py-8 text-center">
        <Title level={2} className="mb-4">
          404 - Page Not Found
        </Title>
        <Paragraph className="text-lg mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </Paragraph>
        <Button type="primary" size="large">
          <Link to="/">Return to Home</Link>
        </Button>
      </Content>
    </Layout>
  );
};

export default NotFound;
