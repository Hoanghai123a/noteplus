import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import api from "../components/api";

const AddMemberForm = ({ groupId }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.post(`/pheduyet/group/${groupId}/add_member/`, values, token);
      message.success("Thêm thành viên thành công");
    } catch {
      message.error("Lỗi khi thêm thành viên");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="username"
        label="Tên người dùng"
        rules={[{ required: true }]}
      >
        <Input placeholder="Nhập username" />
      </Form.Item>
      <Button htmlType="submit" type="primary" loading={loading}>
        Thêm
      </Button>
    </Form>
  );
};

export default AddMemberForm;
