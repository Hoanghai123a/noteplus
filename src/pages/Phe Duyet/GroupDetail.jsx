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
} from "antd";
import AddMemberForm from "./AddMemberForm";
import AddRequestForm from "./AddRequestForm";
import AddTypeForm from "./AddTypeForm";
import api from "../../components/api";

const { Panel } = Collapse;

const GroupDetail = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form] = AntForm.useForm();
  const token = localStorage.getItem("access_token");

  const fetchGroup = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/pheduyet/group/${id}/`, token);
      setGroup(data);
    } catch (error) {
      message.error("Không thể tải thông tin nhóm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [id]);

  const handleUpdateGroup = async (values) => {
    try {
      await api.patch(`/pheduyet/group/${id}/`, values, token);
      message.success("Cập nhật nhóm thành công!");
      setEditMode(false);
      fetchGroup();
    } catch (err) {
      message.error("Cập nhật thất bại.");
    }
  };

  if (loading || !group) return <Spin fullscreen />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card
        title={`Chi tiết Nhóm: ${group.name}`}
        extra={
          !editMode && (
            <>
              <Button
                type="primary"
                onClick={() => {
                  setEditMode(true);
                  form.setFieldsValue({ name: group.name });
                }}
              >
                Cập nhật nhóm
              </Button>
            </>
          )
        }
      >
        {!editMode ? (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="ID">{group.id}</Descriptions.Item>
            <Descriptions.Item label="Tên">{group.name}</Descriptions.Item>
            <Descriptions.Item label="Key">{group.key}</Descriptions.Item>
            <Descriptions.Item label="Số thành viên">
              {group.members?.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Approver">
              {group.approver?.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Amount Approver">
              {group.amount_approver?.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Approver">
              {group.payment_approver?.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Requests">
              {group.requests?.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {new Date(group.created_at).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {new Date(group.updated_at).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {group.isGroup ? "Phải" : "Chưa phải"}
            </Descriptions.Item>
            <Descriptions.Item label="Tin nhắn cuối">
              {new Date(group.last_have_message_at).toLocaleDateString()}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <AntForm form={form} layout="vertical" onFinish={handleUpdateGroup}>
            <AntForm.Item
              name="name"
              label="Tên nhóm"
              rules={[{ required: true, message: "Vui lòng nhập tên nhóm" }]}
            >
              <Input />
            </AntForm.Item>
            <AntForm.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={() => setEditMode(false)}
              >
                Hủy
              </Button>
            </AntForm.Item>
          </AntForm>
        )}
      </Card>

      <Collapse className="mt-6">
        <Panel header="➕ Thêm thành viên" key="1">
          <AddMemberForm groupId={id} />
        </Panel>
        <Panel header="📝 Tạo request trong nhóm" key="2">
          <AddRequestForm groupId={id} />
        </Panel>
        <Panel header="⚙️ Tạo type phê duyệt" key="3">
          <AddTypeForm groupId={id} />
        </Panel>
      </Collapse>
    </div>
  );
};

export default GroupDetail;
