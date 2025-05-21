import React, { useEffect, useState } from "react";
import { Button, Card, List, Modal, Form, Input, message } from "antd";
import api from "../components/api";

const Note = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const data = await api.get("/pheduyet/group/");

      console.log("Groups fetched:", data.results);
      setGroups(data.results);
    } catch (err) {
      console.log("Error fetching groups:", err);
      setGroups([]); // fallback tránh lỗi render
      message.error("Không thể tải danh sách nhóm.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreateGroup = async (values) => {
    try {
      await api.post("/pheduyet/group/", values);
      message.success("Tạo nhóm thành công!");
      setShowModal(false);
      form.resetFields();
      fetchGroups();
    } catch (err) {
      message.error("Tạo nhóm thất bại.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Danh sách Nhóm</h2>
        <Button type="primary" onClick={() => setShowModal(true)}>
          Tạo Nhóm
        </Button>
      </div>
      {/* {Array.isArray(groups) && (
        <List
          itemLayout="horizontal"
          dataSource={groups}
          renderItem={(group) => (
            <List.Item>
              <List.Item.Meta
                title={group.name}
                description={group.description}
              />
            </List.Item>
          )}
        />
      )} */}

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={groups}
        loading={loading}
        renderItem={(group) => (
          <List.Item>
            <Card
              title={group.name}
              extra={<a href={`/notes/group/${group.id}`}>Chi tiết</a>}
            >
              {group.description || "Không có mô tả"}
            </Card>
          </List.Item>
        )}
      />

      {/* Modal tạo nhóm */}
      <Modal
        title="Tạo Nhóm Mới"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateGroup}>
          <Form.Item
            label="Tên nhóm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Note;
