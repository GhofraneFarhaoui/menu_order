import React, { useState } from 'react';
import { Table, Button, Card, Modal, Form, Input, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Column } = Table;

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
  description: string;
  image: string;
}

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: 'Pizza Margherita',
      category: 'Pizza',
      price: 10,
      available: true,
      description: 'A classic pizza with fresh mozzarella and basil.',
      image: '/pizza-margherita.jpg',
    },
    // Add more initial menu items as needed
  ]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleRowClick = (record: MenuItem) => {
    setSelectedItem(record);
  };

  const handleAddItem = (values: any) => {
    const newItem: MenuItem = {
      id: menuItems.length + 1,
      name: values.name,
      category: values.category,
      price: parseFloat(values.price),
      available: true,
      description: values.description,
      image: values.image[0].response.url || '/placeholder.jpg',
    };
    setMenuItems([...menuItems, newItem]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const uploadProps: UploadProps = {
    action: '/upload',
    listType: 'picture',
    maxCount: 1,
  };

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {/* Left Section */}
      <div style={{ flex: 1 }}>
        {/* Buttons at the top right */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '16px',
            gap: '8px',
          }}
        >
          <Button type="primary">Publier le Menu</Button>
          <Button type="dashed" onClick={() => setIsModalVisible(true)}>
            Ajouter un Élément
          </Button>
        </div>

        {/* Table Section */}
        <Card title="Menu Items">
          <Table
            dataSource={menuItems}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleRowClick(record), // Click to select an item
            })}
          >
            <Column title="Plats" dataIndex="name" key="name" />
            <Column title="Catégorie" dataIndex="category" key="category" />
            <Column
              title="Prix"
              dataIndex="price"
              key="price"
              render={(price) => `€${price}`}
            />
            <Column
              title="Disponibilité"
              dataIndex="available"
              key="available"
              render={(available) => (available ? 'Oui' : 'Non')}
            />
          </Table>
        </Card>
      </div>

      {/* Right Section */}
      <div style={{ flex: 1 }}>
        {selectedItem ? (
          <Card title="Item Details">
            <div style={{ display: 'flex', gap: '16px' }}>
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                style={{ width: '100px', borderRadius: '8px' }}
              />
              <div>
                <h3>{selectedItem.name}</h3>
                <p>€{selectedItem.price}</p>
              </div>
            </div>
            <p>{selectedItem.description}</p>
          </Card>
        ) : null}{' '}
        {/* Hide details when no item is selected */}
      </div>

      {/* Add Item Modal */}
      <Modal
        title="Ajouter un Élément"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddItem} layout="vertical">
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload {...uploadProps}>
              <Button icon={<PlusOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Plat"
            rules={[{ required: true, message: 'Please enter the item name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Catégorie"
            rules={[{ required: true, message: 'Please enter the category!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Prix"
            rules={[{ required: true, message: 'Please enter the price!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description!' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginTop: '16px' }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '8px' }}
            >
              Ajouter
            </Button>
            <Button onClick={() => setIsModalVisible(false)}>Annuler</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuPage;
