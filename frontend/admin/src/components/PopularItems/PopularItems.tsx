import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PopularItems.module.css';

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
        const response = await axios.get(
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
    <div className={styles.box}>
      <h3>Les Plus Populaires</h3>
      <ul>
        {popularItems.map((item) => (
          <li key={item.id}>
            <img
              src={`http://localhost:3000/static/${item.imageUrl}`}
              alt={item.name}
              className={styles.itemImage}
            />
            <div className={styles.nameBox}>{item.id}</div>
            <div className={styles.itemName}>{item.name}</div>
            <div className={styles.orderCount}>
              <span className={styles.bold}>{item.totalOrdered}</span>
              <span>commande</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularItems;
