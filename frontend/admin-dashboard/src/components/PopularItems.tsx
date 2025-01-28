import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';

interface PopularItem {
  id: number;
  name: string;
  imageUrl: string;
  totalOrdered: number;
}

const PopularItems: React.FC = () => {
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const response = await axios.get<PopularItem[]>(
          'http://localhost:3000/order/most-popular-orders'
        );

        setPopularItems(response.data);
      } catch (error) {
        console.error('Failed to fetch popular items:', error);
      }
    };

    fetchPopularItems();
  }, []);

  return (
    <Card
      title={<div style={{ color: '#8B8894' }}>Les Plus Populaires</div>}
      bordered={false}
      style={{
        width: '100%',
        maxWidth: '589px',
        height: '303px',
        overflowY: 'auto',
      }}
    >
      {popularItems.length > 0 ? (
        popularItems.map((item) => (
          <div key={item.id} style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`http://localhost:3000/static/${item.imageUrl}`}
                  alt={item.name}
                  style={{ width: '40px', height: '40px', marginRight: '10px' }}
                />
                <div>{item.name}</div>
              </div>
              <div>{item.totalOrdered} commandes</div>
            </div>
          </div>
        ))
      ) : (
        <div>No popular items found.</div>
      )}
    </Card>
  );
};

export default PopularItems;
