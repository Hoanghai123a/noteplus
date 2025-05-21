import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Collapse, Button, Spin, message } from "antd";
import AddMemberForm from "./AddMemberForm";
import AddRequestForm from "./AddRequestForm";
import AddTypeForm from "./AddTypeForm";
import api from "../components/api";

const { Panel } = Collapse;

const GroupDetail = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
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
    fetchGroup();
  }, [id, token]);

  if (loading || !group) return <Spin fullscreen />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card title={`Nhóm: ${group.name}`} bordered={false}>
        <p>
          <strong>ID:</strong> {group.id}
        </p>
        <p>
          <strong>Mô tả:</strong> {group.description}
        </p>
        <p>
          <strong>Số thành viên:</strong> {group.members?.length || 0}
        </p>
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
