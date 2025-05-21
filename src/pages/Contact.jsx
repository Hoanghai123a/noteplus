import React from "react";
import { Typography, Form, Input, Button } from "antd";

const { Title } = Typography;

const Contact = () => {
  const onFinish = (values) => {
    console.log("Contact form values:", values);
  };

  return (
    <div className="max-w-xl mx-auto">
      <Title level={2}>Contact Us</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Message" name="message" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Contact;
