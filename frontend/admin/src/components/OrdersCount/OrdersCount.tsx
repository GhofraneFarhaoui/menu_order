import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './OrdersCount.module.css';

const OrdersCount: React.FC = () => {
  const [orderCount, setOrderCount] = useState<number>(0);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const response = await axios.get(
          `http://localhost:3000/order/total-orders?date=${formattedDate}`
        );
        setOrderCount(response.data);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    fetchOrderCount();
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <p className={styles.number}>{orderCount}</p>
        <p className={styles.commandes}>Commandes </p>
      </div>
      <div className={styles.icon}>
        <svg
          width="132"
          height="126"
          viewBox="0 0 132 126"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M131.95 20.5254C131.984 20.1447 132 19.763 132 19.3822C132 8.89996 123.013 0.37207 111.967 0.37207C111.74 0.37207 111.519 0.380464 111.005 0.401867L20.8179 0.395852C20.5573 0.383961 20.2927 0.37207 20.0183 0.37207C8.98928 0.37207 0.017396 8.88318 0.017396 19.3573L0.0451109 20.8894H0L0.0576418 104.122L0.0337599 106.973C0.0337599 117.33 8.91159 125.754 19.8239 125.754C20.0698 125.754 20.8569 125.72 20.8706 125.72L110.642 125.732C111.082 125.782 111.558 125.798 112.05 125.798C117.329 125.798 122.297 123.846 126.037 120.3C129.777 116.755 131.837 112.048 131.837 107.039L131.816 105.358H131.951L131.95 20.5252V20.5254ZM20.2539 117.586L19.8728 117.558C13.6038 117.558 8.64711 112.681 8.58947 106.463V37.9439H123.366L123.434 105.818L123.303 106.219C123.224 106.476 123.185 106.72 123.185 106.942C123.185 112.591 118.533 117.262 112.592 117.574L110.998 117.661V117.588L20.2539 117.586ZM123.364 29.7955H8.59817L8.54288 20.5718L8.66819 20.1628C8.74485 19.9082 8.78348 19.655 8.78348 19.4287C8.78348 13.5202 13.903 8.70383 20.3089 8.68369L20.3752 8.67418L111.509 8.67669L111.901 8.70509C118.142 8.70509 123.219 13.5229 123.219 19.4444C123.219 19.6299 123.247 19.8203 123.315 20.0784L123.364 20.2021V29.7955H123.364Z"
            fill="#8B8894"
            fill-opacity="0.18"
          />
          <path
            d="M93.4211 57.356C92.2591 57.356 91.1635 57.7866 90.3373 58.5706L57.3985 89.8282L41.6651 74.8994C40.8477 74.1155 39.7559 73.6837 38.5925 73.6837C37.429 73.6837 36.3335 74.1143 35.5087 74.8959C34.6863 75.6678 34.2299 76.7005 34.2261 77.8042C34.2236 78.9105 34.6787 79.9526 35.5072 80.7412L54.311 98.5857C55.1322 99.3635 56.229 99.7918 57.3985 99.7918C58.5668 99.7918 59.6635 99.3638 60.4847 98.5845L96.4924 64.416C97.3147 63.6451 97.7711 62.6138 97.7749 61.5086C97.7775 60.3976 97.321 59.3532 96.495 58.5728C95.6765 57.7878 94.5847 57.356 93.4212 57.356H93.4211Z"
            fill="#8B8894"
            fill-opacity="0.18"
          />
        </svg>
      </div>
    </div>
  );
};

export default OrdersCount;
