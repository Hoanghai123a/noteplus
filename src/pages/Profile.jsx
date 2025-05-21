import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Spin,
  Typography,
  Avatar,
  Form,
  Input,
  Button,
  message,
} from "antd";
import { UserContext } from "../components/context/UserContext";
import api from "../components/api";

const { Title, Paragraph } = Typography;

const Profile = () => {
  const { user } = useContext(UserContext);
  const [basicInfo, setBasicInfo] = useState(null);
  const [profileDetail, setProfileDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await api.get("/pheduyet/user", user.token);
        setBasicInfo(userData);

        const profileId = userData?.id || 1;
        const detail = await api.get(
          `/pheduyet/profile/${profileId}`,
          user.token
        );
        setProfileDetail(detail);
        form.setFieldsValue(detail);
      } catch (err) {
        message.error("Không thể tải hồ sơ.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchProfile();
    }
  }, [user, form]);

  const handleUpdate = async (values) => {
    try {
      const profileId = basicInfo?.id || 1;
      const updated = await api.patch(
        `/pheduyet/profile/${profileId}/`,
        values,
        user.token
      );
      setProfileDetail(updated);
      setEditing(false);
      message.success("Cập nhật thành công!");
    } catch (err) {
      message.error("Lỗi khi cập nhật.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (!basicInfo || !profileDetail) {
    return <p>Không tìm thấy hồ sơ.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <Title level={2}>Hồ sơ người dùng</Title>

      <Card bordered className="shadow mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar size={80} src={profileDetail.avatar || undefined}>
            {basicInfo.username?.[0]}
          </Avatar>
          <div>
            <Title level={4}>
              {/* {localStorage.getItem("username") || "User"} */}
            </Title>
            {/* <Paragraph>{basicInfo.email}</Paragraph> */}
          </div>
        </div>

        {!editing ? (
          <>
            <Paragraph>
              <strong>Họ tên:</strong> {profileDetail.full_name}
            </Paragraph>
            <Paragraph>
              <strong>Điện thoại:</strong> {profileDetail.phone}
            </Paragraph>
            <Paragraph>
              <strong>Created:</strong>{" "}
              {new Date(profileDetail.created_at).toLocaleDateString()}
            </Paragraph>
            <Paragraph>
              <strong>Updated:</strong>{" "}
              {new Date(profileDetail.updated_at).toLocaleDateString()}
            </Paragraph>
            <Paragraph>
              <strong>Địa chỉ:</strong> {profileDetail.address}
            </Paragraph>
            <Paragraph>
              <strong>Link ảnh:</strong> {profileDetail.avatar}
            </Paragraph>
            <Paragraph>
              <strong>Số nhóm:</strong> {basicInfo.group.length}
            </Paragraph>
            <Paragraph>
              <strong>Số yêu cầu:</strong> {basicInfo.request.length}
            </Paragraph>
            <Paragraph>
              <strong>Số bạn bè:</strong> {basicInfo.friend.length}
            </Paragraph>
            <Button type="primary" onClick={() => setEditing(true)}>
              Cập nhật
            </Button>
          </>
        ) : (
          <Form
            layout="vertical"
            form={form}
            onFinish={handleUpdate}
            initialValues={profileDetail}
          >
            <Form.Item name="full_name" label="Họ tên">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Địa chỉ">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item name="avatar" label="Link ảnh đại diện">
              <Input />
            </Form.Item>
            <Form.Item>
              <div className="flex gap-4">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Button onClick={() => setEditing(false)}>Huỷ</Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default Profile;
