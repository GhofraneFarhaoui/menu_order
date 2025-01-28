import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';

const DailyRevenue: React.FC = () => {
  const [revenue, setDailyRevenue] = useState<number | null>(null);

  useEffect(() => {
    const fetchDailyRevenue = async () => {
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const response = await axios.get<number>(
          `http://localhost:3000/order/daily-revenue?date=${formattedDate}`
        );
        setDailyRevenue(response.data);
      } catch (error) {
        console.error('Error fetching daily revenue:', error);
      }
    };

    fetchDailyRevenue();
  }, []);

  if (revenue === null) {
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            fontSize: '35px',
            color: '#2B99DA',
            fontWeight: 'bold',
          }}
        >
          {revenue}
        </div>
        <div
          style={{
            fontSize: '14px',
            color: '#2B99DA',
            marginLeft: '5px',
            fontWeight: 'bold',
          }}
        >
          TND
        </div>
      </div>
      <div style={{ fontSize: '16px', color: '#8B8894' }}>
        Recette Journaliere
      </div>
    </Card>
  );
};

export default DailyRevenue;
