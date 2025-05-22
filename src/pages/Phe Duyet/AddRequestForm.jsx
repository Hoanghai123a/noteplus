import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Collapse,
  Button,
  Spin,
  message,
  Input,
  Form as AntForm,
  Descriptions,
  Upload,
} from "antd";
import AddMemberForm from "./AddMemberForm";
import AddTypeForm from "./AddTypeForm";
import api from "../../components/api";
import { UploadOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const AddRequestForm = ({ groupId }) => {
  const [loading, setLoading] = useState(false);
  const [form] = AntForm.useForm();
  const token = localStorage.getItem("access_token");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        title: values.title,
        description: values.description,
        amount: Number(values.amount || 0),
        picture_base64: null, // xử lý sau nếu cần
        dt_picture_link: values.dt_picture_link || null,
        dt_sendto: [], // có thể thêm UI chọn người dùng sau
        dt_types: [], // có thể thêm UI chọn loại phê duyệt sau
      };
      await api.post(`/pheduyet/group/${groupId}/add_request/`, payload, token);
      message.success("Tạo request thành công");
      form.resetFields();
    } catch {
      message.error("Lỗi khi tạo request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AntForm layout="vertical" onFinish={onFinish} form={form}>
      <AntForm.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
        <Input placeholder="Tiêu đề yêu cầu" />
      </AntForm.Item>

      <AntForm.Item name="description" label="Chi tiết yêu cầu">
        <Input.TextArea rows={3} placeholder="Mô tả chi tiết" />
      </AntForm.Item>

      <AntForm.Item name="amount" label="Số tiền">
        <Input type="number" placeholder="0" />
      </AntForm.Item>

      <AntForm.Item name="dt_picture_link" label="Link ảnh minh họa">
        <Input placeholder="https://example.com/image.jpg" />
      </AntForm.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        Tạo
      </Button>
    </AntForm>
  );
};

export default AddRequestForm;
