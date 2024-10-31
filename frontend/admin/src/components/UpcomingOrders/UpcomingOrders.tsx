import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UpcomingOrders.module.css';

interface UpcomingOrder {
  id: number;
  name: string;
}

const UpcomingOrders: React.FC = () => {
  const [orders, setOrders] = useState<UpcomingOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('');
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);

  return (
    <div className={styles.box}>
      <h3>Commandes à Venir</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>Order #{order.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingOrders;
