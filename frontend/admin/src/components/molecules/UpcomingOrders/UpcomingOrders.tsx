import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UpcomingOrders.module.css';

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
        const response = await axios.get('http://localhost:3000/order');
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else if (
          response.data.orders &&
          Array.isArray(response.data.orders)
        ) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }
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
      return `commandée il y a${Math.floor(timeDiff / 60)} heures`;
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
    <div className={styles.box}>
      <h3>Commandes à servir</h3>
      <ul className={styles.orderList}>
        {todayOrders.length > 0 ? (
          todayOrders.map((order) => (
            <li key={order.id} className={styles.orderItem}>
              <div className={styles.orderInfo}>
                <div className={styles.orderDetails}>Commande {order.id}</div>
                <div className={styles.orderTime}>
                  {calculateTimeSinceOrder(order.created_at)}
                </div>
                <div
                  className={styles.arrow}
                  onClick={() => openOrderPopup(order)}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M32 0H0V31.1489H32V0Z" fill="white" />
                    <path
                      d="M12.6667 9.08508L19.3334 15.5744L12.6667 22.0638"
                      stroke="#8B8894"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>No orders for today.</li>
        )}
      </ul>

      {selectedOrder && (
        <div className={styles.popupOverlay} onClick={closeOrderPopup}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <h4>Order {selectedOrder.id} Details</h4>
            <ul>
              {selectedOrder.orderItems.map((item) => (
                <li key={item.id}>
                  Article {item.id} - Quantité: {item.quantity}
                </li>
              ))}
            </ul>
            <button onClick={closeOrderPopup} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingOrders;
