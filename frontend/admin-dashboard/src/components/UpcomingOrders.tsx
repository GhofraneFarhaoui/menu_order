import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Modal } from 'antd';

interface OrderItem {
  id: number;
  quantity: number;
}

interface UpcomingOrder {
  id: number;
  totalPrice: string;
  created_at: string;
  orderItems: OrderItem[];
}

const UpcomingOrders: React.FC = () => {
  const [orders, setOrders] = useState<UpcomingOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<UpcomingOrder | null>(
    null
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<UpcomingOrder[]>(
          'http://localhost:3000/order'
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching upcoming orders:', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  const calculateTimeSinceOrder = (createdAt: string) => {
    const orderTime = new Date(createdAt);
    const now = new Date();
    const timeDiff = Math.floor((now.getTime() - orderTime.getTime()) / 60000);

    if (timeDiff < 60) return `commandée il y a ${timeDiff} minutes`;
    if (timeDiff < 1440)
      return `commandée il y a ${Math.floor(timeDiff / 60)} heures`;
  };

  const isToday = (dateString: string) => {
    const orderDate = new Date(dateString);
    const today = new Date();
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  };

  const todayOrders = orders.filter((order) => isToday(order.created_at));

  const openOrderPopup = (order: UpcomingOrder) => {
    setSelectedOrder(order);
  };

  const closeOrderPopup = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <Card
        title={<div style={{ color: '#8B8894' }}>Commandes à servir</div>}
        bordered={false}
        style={{
          width: '100%',
          maxWidth: '589px',
          height: '303px',
          overflowY: 'auto',
        }}
      >
        {todayOrders.length > 0 ? (
          todayOrders.map((order) => (
            <div key={order.id} style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#8B8894',
                }}
              >
                <div>{`Commande ${order.id}`}</div>
                <div>{calculateTimeSinceOrder(order.created_at)}</div>
                <Button
                  type="link"
                  onClick={() => openOrderPopup(order)}
                  style={{ padding: 0, color: '#8B8894' }}
                >
                  &gt;
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div>No orders for today.</div>
        )}
      </Card>

      {selectedOrder && (
        <Modal
          visible={true}
          title={`Order ${selectedOrder.id} Details`}
          onCancel={closeOrderPopup}
          footer={[
            <Button key="close" onClick={closeOrderPopup}>
              Close
            </Button>,
          ]}
        >
          <ul>
            {selectedOrder.orderItems.map((item) => (
              <li key={item.id}>
                Article {item.id} - Quantité: {item.quantity}
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default UpcomingOrders;
