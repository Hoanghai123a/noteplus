import React, { useState } from "react";
import {
  Typography,
  Switch,
  Select,
  Button,
  Divider,
  Modal,
  Form,
  Input,
  message,
} from "antd";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("vi");
  const [isFreezeVisible, setFreezeVisible] = useState(false);
  const [isDeleteVisible, setDeleteVisible] = useState(false);

  const handleSave = () => {
    message.success("Cài đặt đã được lưu!");
    console.log({ darkMode, language });
  };

  const handleFreeze = () => {
    setFreezeVisible(false);
    message.info("Tài khoản của bạn đã được đóng băng tạm thời.");
  };

  const handleDelete = () => {
    setDeleteVisible(false);
    message.warning("Tài khoản của bạn đã bị xoá.");
    // Gọi API xoá tài khoản ở đây
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Title className="text-center" level={2}>
        Settings
      </Title>
      <Paragraph>Tuỳ chỉnh cài đặt tài khoản của bạn:</Paragraph>

      <Divider />

      {/* Toggle Dark Mode */}
      <div className="flex items-center justify-between mb-4">
        <span>Dark Mode</span>
        <Switch checked={darkMode} onChange={setDarkMode} />
      </div>

      {/* Language Selection */}
      <div className="flex items-center justify-between mb-4">
        <span>Ngôn ngữ</span>
        <Select value={language} onChange={setLanguage} style={{ width: 120 }}>
          <Option value="en">English</Option>
          <Option value="vi">Tiếng Việt</Option>
        </Select>
      </div>

      {/* Change Password */}
      <div className="mb-4">
        <Title level={4}>Thay đổi mật khẩu</Title>
        {/* click button show modals */}
        <Button type="primary">Thay đổi mật tự</Button>
        {/* <Modals */}
      </div>

      <Divider />

      {/* Freeze Account */}
      <div className="mb-4">
        <Title level={4}>Đóng băng tài khoản</Title>
        <Paragraph type="secondary">
          Bạn có thể đóng băng tài khoản nếu không sử dụng trong thời gian dài.
        </Paragraph>
        <Button danger onClick={() => setFreezeVisible(true)}>
          Đóng băng tài khoản
        </Button>
      </div>

      {/* Delete Account */}
      <div className="mb-4">
        <Title level={4}>Xoá tài khoản</Title>
        <Paragraph type="secondary">
          Cẩn thận! Việc này sẽ xoá toàn bộ dữ liệu của bạn vĩnh viễn.
        </Paragraph>
        <Button danger type="primary" onClick={() => setDeleteVisible(true)}>
          Xoá tài khoản
        </Button>
      </div>

      <Divider />

      {/* Save Settings */}
      <Button type="primary" onClick={handleSave}>
        Lưu cài đặt
      </Button>

      {/* Modal Freeze */}
      <Modal
        title="Đóng băng tài khoản"
        open={isFreezeVisible}
        onOk={handleFreeze}
        onCancel={() => setFreezeVisible(false)}
        okText="Xác nhận"
        cancelText="Huỷ"
      >
        <p>Bạn có chắc chắn muốn đóng băng tài khoản không?</p>
      </Modal>

      {/* Modal Delete */}
      <Modal
        title="Xoá tài khoản"
        open={isDeleteVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteVisible(false)}
        okText="Xoá"
        okButtonProps={{ danger: true }}
        cancelText="Huỷ"
      >
        <p>
          Bạn có chắc chắn muốn xoá tài khoản? Thao tác này không thể hoàn tác.
        </p>
      </Modal>
    </div>
  );
};

export default Settings;
