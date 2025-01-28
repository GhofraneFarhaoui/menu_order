import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';

const OrdersCountCard: React.FC = () => {
  const [orderCount, setOrderCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const response = await axios.get<number>(
          `http://localhost:3000/order/total-orders?date=${formattedDate}`
        );
        setOrderCount(response.data);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };
    fetchOrderCount();
  }, []);

  if (orderCount === null) {
    return <p>Loading...</p>;
  }

  return (
    <Card
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0',
      }}
    >
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '35px', color: '#2B99DA', fontWeight: 'bold' }}>
          {orderCount}
        </div>
        <div style={{ fontSize: '16px', color: '#8B8894' }}>Commandes</div>
      </div>
    </Card>
  );
};

export default OrdersCountCard;
