import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PopularItems.module.css';

interface PopularItem {
  id: number;
  name: string;
}

const PopularItems: React.FC = () => {
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);

  useEffect(() => {
    const fetchPopularItems = async () => {
      const response = await axios.get('');
      setPopularItems(response.data.items);
    };
    fetchPopularItems();
  }, []);

  return (
    <div className={styles.box}>
      <h3>Les Plus Populaires</h3>
      <ul>
        {popularItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularItems;
