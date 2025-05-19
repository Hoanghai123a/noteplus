import React from "react";
import { Layout, Typography, Card } from "antd";

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <Layout className="min-h-screen">
      <Content className="container mx-auto py-8">
        <Title level={2} className="text-center mb-6">
          About Note Plus
        </Title>
        <Card className="mb-8">
          <Paragraph className="text-lg">
            Note Plus is a powerful and intuitive note-taking application
            designed to help you capture, organize, and manage your thoughts and
            ideas effortlessly. Whether you're a student, professional, or
            creative, Note Plus provides the tools you need to stay productive.
          </Paragraph>
          <Paragraph className="text-lg">
            Our mission is to simplify note-taking while offering advanced
            features like rich text editing, multimedia support (images, videos,
            and audio), and cross-platform synchronization. With Note Plus, you
            can create notes that are as dynamic and diverse as your ideas.
          </Paragraph>
        </Card>
        <div className="">
          <Title level={3} className="mb-4 ml-5">
            Key Features
          </Title>
          <ul className="list-disc pl-6 text-sm ml-10 decoration-solid">
            <li>Rich text editing with formatting options</li>
            <li>Support for images, videos, and audio notes</li>
            <li>Smart organization with tags and categories</li>
            <li>Real-time syncing across devices</li>
            <li>Secure and private note storage</li>
          </ul>
        </div>
      </Content>
    </Layout>
  );
};

export default About;
