import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './OrdersPerDay.module.css';

const AverageOrderAmount: React.FC = () => {
  const [averageOrderAmount, setAverageOrderAmount] = useState<number>(0);

  useEffect(() => {
    const fetchAverageOrderAmount = async () => {
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const response = await axios.get(
          `http://localhost:3000/order/average-order-amount?date=${formattedDate}`
        );

        const formattedAmount = response.data.averageOrderAmount.toFixed(2);
        setAverageOrderAmount(formattedAmount);
      } catch (error) {
        console.error('Error fetching average order amount:', error);
      }
    };

    fetchAverageOrderAmount();
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <div className={styles.content}>
          <p className={styles.number}>{averageOrderAmount}</p>
          <p className={styles.commandes}></p>
        </div>
      </div>
      <div className={styles.icon}>
        <svg
          width="132"
          height="132"
          viewBox="0 0 132 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.90943 131.897C6.08443 131.897 5.25943 131.587 4.64068 130.866C4.02193 130.247 3.71256 129.422 3.81568 128.494L10.3126 28.6687C10.4157 27.0187 11.7563 25.7812 13.4063 25.7812H40.6313V25.3687C40.6313 18.5625 43.3126 12.2719 48.0563 7.42499C52.9032 2.78437 59.1938 0.103119 66.0001 0.103119C79.9219 0.103119 91.3688 11.4469 91.3688 25.4719C91.3688 25.575 91.2657 25.6781 91.2657 25.7812V25.8844H118.594C120.244 25.8844 121.584 27.1219 121.688 28.7719L128.081 127.875C128.184 128.184 128.184 128.391 128.184 128.7C128.081 130.453 126.741 131.897 124.988 131.897H6.90943ZM10.2094 125.709H121.688L115.706 32.0719H91.2657V39.4969H91.3688C93.0188 40.6312 93.9469 42.2812 93.9469 44.1375C93.9469 47.3344 91.3688 49.9125 88.1719 49.9125C84.9751 49.9125 82.3969 47.3344 82.3969 44.1375C82.3969 42.2812 83.3251 40.6312 84.9751 39.4969H85.0782V32.0719H46.8188V39.4969H46.9219C48.5719 40.6312 49.5001 42.2812 49.5001 44.1375C49.5001 47.3344 46.9219 49.9125 43.7251 49.9125C40.5282 49.9125 37.9501 47.3344 37.9501 44.1375C37.9501 42.2812 38.8782 40.6312 40.5282 39.4969H40.6313V32.0719H16.1907L10.2094 125.709ZM66.0001 6.39374C55.4813 6.39374 46.8188 14.9531 46.8188 25.575V25.9875H85.2844L85.1813 25.7812V25.575C85.1813 14.9531 76.5188 6.39374 66.0001 6.39374Z"
            fill="#8B8894"
            fill-opacity="0.18"
          />
        </svg>
      </div>
    </div>
  );
};

export default AverageOrderAmount;
