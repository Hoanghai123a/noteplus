import React, { useEffect, useState } from "react";
import { List, Card, Spin, message, Drawer, Descriptions } from "antd";
import api from "../../components/api";

const PheDuyet = ({ groupId = 1 }) => {
  const [items, setItems] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const token = localStorage.getItem("access_token");

  const fetchItems = async () => {
    setLoadingList(true);
    try {
      const data = await api.get(`/pheduyet/item/?group=${groupId}`, token);
      setItems(data.results || data);
      console.log("Danh sách phê duyệt", data);
    } catch (err) {
      message.error("Không thể tải danh sách phê duyệt");
    } finally {
      setLoadingList(false);
    }
  };

  const fetchDetail = async (id) => {
    setLoadingDetail(true);
    try {
      const detail = await api.get(`/pheduyet/item/${id}/`, token);
      setSelectedItem(detail);
      setDrawerVisible(true);
    } catch (err) {
      message.error("Không thể tải chi tiết phê duyệt");
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [groupId]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">📋 Danh sách Phê duyệt</h2>

      {loadingList ? (
        <Spin fullscreen />
      ) : (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.title}
                extra={<a onClick={() => fetchDetail(item.id)}>Chi tiết</a>}
              >
                <p>
                  <strong>Số tiền:</strong> {item.amount?.toLocaleString()} đ
                </p>
                <p>
                  <strong>Ngày tạo:</strong>{" "}
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                <p>
                  <strong>Trạng thái:</strong> {item.status}
                </p>
              </Card>
            </List.Item>
          )}
        />
      )}

      <Drawer
        title={`Chi tiết phê duyệt: ${selectedItem?.title}`}
        placement="right"
        width={500}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {loadingDetail ? (
          <Spin />
        ) : selectedItem ? (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="ID">{selectedItem.id}</Descriptions.Item>
            <Descriptions.Item label="Tiêu đề">
              {selectedItem.title}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {selectedItem.description}
            </Descriptions.Item>
            <Descriptions.Item label="Số tiền">
              {selectedItem.amount?.toLocaleString()} đ
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {selectedItem.status}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {new Date(selectedItem.created_at).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Người tạo">
              {selectedItem.created_by?.full_name || "Không rõ"}
            </Descriptions.Item>
            <Descriptions.Item label="Ảnh / Link">
              {selectedItem.picture_base64 ? (
                <img
                  src={selectedItem.picture_base64}
                  alt="Ảnh minh họa"
                  style={{ maxWidth: "100%" }}
                />
              ) : selectedItem.dt_picture_link ? (
                <a
                  href={selectedItem.dt_picture_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedItem.dt_picture_link}
                </a>
              ) : (
                "Không có"
              )}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </Drawer>
    </div>
  );
};

export default PheDuyet;
