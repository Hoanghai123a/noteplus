import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import api from "../components/api";

const AddRequestForm = ({ groupId }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.post(`/pheduyet/group/${groupId}/add_request/`, values, token);
      message.success("Tạo request thành công");
    } catch {
      message.error("Lỗi khi tạo request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
        <Input placeholder="Tiêu đề yêu cầu" />
      </Form.Item>
      <Form.Item name="content" label="Nội dung">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Tạo
      </Button>
    </Form>
  );
};

export default AddRequestForm;
