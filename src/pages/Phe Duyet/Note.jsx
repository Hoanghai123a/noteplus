import React, { useContext, useEffect, useState } from "react";
import { Button, Card, List, Modal, Form, Input, Select, message } from "antd";
import api from "../../components/api";
import { UserContext } from "../../components/context/usercontext";

const { Option } = Select;

const Note = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleAddMembers = async () => {
    try {
      await api.post(`/pheduyet/group/${selectedGroupId}/add_member/`, {
        member_ids: selectedMembers,
      });
      message.success("Thêm thành viên thành công");
      setShowAddMemberModal(false);
      fetchGroups();
    } catch (err) {
      message.error("Thêm thành viên thất bại");
    }
  };

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const data = await api.get("/pheduyet/group/", currentUser?.token);
      setGroups(data.results || []);
    } catch (err) {
      message.error("Không thể tải danh sách nhóm.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.get("/pheduyet/user/", currentUser?.token);
      setUsers(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      message.error("Không thể tải danh sách người dùng.");
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchUsers();
  }, []);

  const handleCreateOrUpdateGroup = async (values) => {
    const payload = {
      ...values,
      member: Array.from(new Set([currentUser?.id, ...(values.member || [])])),
      amount_approvers: values.amount_approvers || [],
      payment_approvers: values.payment_approvers || [],
      approver: values.approver || [],
    };

    try {
      if (editMode && editingGroupId) {
        await api.patch(
          `/pheduyet/group/${editingGroupId}/`,
          payload,
          currentUser?.token
        );
        message.success("Cập nhật nhóm thành công!");
      } else {
        await api.post("/pheduyet/group/", payload, currentUser?.token);
        message.success("Tạo nhóm thành công!");
      }

      setShowModal(false);
      form.resetFields();
      fetchGroups();
      setEditMode(false);
      setEditingGroupId(null);
    } catch (err) {
      console.error(err);
      message.error(editMode ? "Cập nhật thất bại." : "Tạo nhóm thất bại.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Danh sách Nhóm</h2>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true);
            setEditMode(false);
            setEditingGroupId(null);
            form.resetFields();
          }}
        >
          Tạo Nhóm
        </Button>
      </div>

      <span className="mt-4">Tổng số nhóm: {groups.length}</span>

      <List
        className="mt-4"
        grid={{ gutter: 16, column: 1 }}
        dataSource={groups}
        loading={loading}
        renderItem={(group) => (
          <List.Item key={group.id} className="border rounded-md">
            <Card
              title={group.name}
              extra={<a href={`/notes/group/${group.id}`}>Chi tiết</a>}
            >
              <strong>Số thành viên: </strong>
              {group.member.length || "Không có"} <br />
              <strong>Tin nhắn gần nhất: </strong>
              {group.last_have_message_at
                ? new Date(group.last_have_message_at).toLocaleString()
                : "Không có"}
              <br />
              <Button
                style={{ marginTop: "8px" }}
                onClick={() => {
                  setEditMode(true);
                  form.setFieldsValue({
                    name: group.name,
                    member: Array.isArray(group.member)
                      ? group.member.map((m) => m.id)
                      : [],
                    amount_approvers: Array.isArray(group.amount_approvers)
                      ? group.amount_approvers.map((a) => a.id)
                      : [],
                    payment_approvers: Array.isArray(group.payment_approvers)
                      ? group.payment_approvers.map((p) => p.id)
                      : [],
                    approver: Array.isArray(group.approver)
                      ? group.approver.map((a) => a.id)
                      : [],
                  });
                  setEditingGroupId(group.id);
                  setShowModal(true);
                }}
              >
                Chỉnh sửa
              </Button>
              <Button
                className="ml-2"
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setShowAddMemberModal(true);
                }}
              >
                Thêm thành viên
              </Button>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        open={showAddMemberModal}
        onCancel={() => setShowAddMemberModal(false)}
        onOk={handleAddMembers}
        title="Thêm thành viên"
      >
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Chọn thành viên"
          onChange={setSelectedMembers}
        >
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.username || user.email}
            </Option>
          ))}
        </Select>
      </Modal>

      <Modal
        centered
        title={editMode ? "Cập nhật Nhóm" : "Tạo Nhóm Mới"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
          setEditMode(false);
          setEditingGroupId(null);
        }}
        onOk={() => form.submit()}
        okText={editMode ? "Cập nhật" : "Tạo nhóm"}
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateOrUpdateGroup}
        >
          <Form.Item
            label="Tên nhóm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm!" }]}
          >
            <Input placeholder="Nhập tên nhóm" />
          </Form.Item>

          <Form.Item label="Thành viên khác (ngoài bạn)" name="member">
            <Select mode="multiple" placeholder="Chọn thành viên">
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.username || user.email}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Người phê duyệt chi tiêu (amount)"
            name="amount_approvers"
          >
            <Select mode="multiple" placeholder="Chọn người phê duyệt chi tiêu">
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.username || user.email}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Người giải ngân (payment)" name="payment_approvers">
            <Select mode="multiple" placeholder="Chọn người giải ngân">
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.username || user.email}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Người phê duyệt chung" name="approver">
            <Select mode="multiple" placeholder="Chọn người phê duyệt">
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.username || user.email}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Note;
