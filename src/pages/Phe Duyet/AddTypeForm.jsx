import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import api from "../../components/api";

const AddTypeForm = ({ groupId }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.post(`/pheduyet/group/${groupId}/add_type/`, values, token);
      message.success("Thêm type phê duyệt thành công");
    } catch {
      message.error("Thêm thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên loại phê duyệt"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Tạo
      </Button>
    </Form>
  );
};

export default AddTypeForm;
