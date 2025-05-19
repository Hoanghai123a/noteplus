import React from "react";
import { Layout, Typography, Card, Row, Col, Button } from "antd";
import {
  EditOutlined,
  FileTextOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  AudioOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <Layout className="min-h-screen">
      <Content className="py-8">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Title level={1} className="mb-4">
              Welcome to Note Plus
            </Title>
            <Paragraph className="text-lg mb-6">
              Your ultimate note-taking companion for organizing thoughts,
              ideas, and media with powerful features and intuitive design.
            </Paragraph>
            <Button type="primary" size="large" href="/get-started">
              Get Started
            </Button>
          </div>

          {/* Features Section */}
          <Title level={2} className="text-center mb-8">
            Why Choose Note Plus?
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="text-center"
                cover={<EditOutlined className="text-4xl mt-4 text-blue-500" />}
              >
                <Card.Meta
                  title="Rich Text Editing"
                  description="Create and format notes with a powerful, user-friendly editor."
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <FileTextOutlined className="text-4xl mt-4 text-blue-500" />
                }
              >
                <Card.Meta
                  title="Organized Notes"
                  description="Categorize and tag notes for easy retrieval and management."
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <PictureOutlined className="text-4xl mt-4 text-blue-500" />
                }
              >
                <Card.Meta
                  title="Image Support"
                  description="Add and annotate images directly within your notes."
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <VideoCameraOutlined className="text-4xl mt-4 text-blue-500" />
                }
              >
                <Card.Meta
                  title="Video Integration"
                  description="Embed and organize video content seamlessly."
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <AudioOutlined className="text-4xl mt-4 text-blue-500" />
                }
              >
                <Card.Meta
                  title="Audio Notes"
                  description="Record and attach audio clips to capture ideas on the go."
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="text-center"
                cover={<EditOutlined className="text-4xl mt-4 text-blue-500" />}
              >
                <Card.Meta
                  title="Cross-Platform Sync"
                  description="Access your notes anywhere, anytime with real-time syncing."
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <VideoCameraOutlined className="text-4xl mt-4 text-blue-500" />
                }
              >
                <Card.Meta
                  title="Video Integration"
                  description="Embed and organize video content seamlessly."
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
