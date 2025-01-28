import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';

const AverageOrderAmount: React.FC = () => {
  const [averageOrderAmount, setAverageOrderAmount] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchAverageOrderAmount = async () => {
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const response = await axios.get<{ averageOrderAmount: number }>(
          `http://localhost:3000/order/average-order-amount?date=${formattedDate}`
        );

        setAverageOrderAmount(response.data.averageOrderAmount);
      } catch (error) {
        console.error('Error fetching average order amount:', error);
      }
    };

    fetchAverageOrderAmount();
  }, []);

  if (averageOrderAmount === null) {
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
          {averageOrderAmount.toFixed(2)}
        </div>
        <div style={{ fontSize: '16px', color: '#8B8894' }}>Montant Maoyen</div>
      </div>
    </Card>
  );
};

export default AverageOrderAmount;
