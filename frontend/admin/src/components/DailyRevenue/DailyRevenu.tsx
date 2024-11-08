import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DailyRevenue.module.css';

const DailyRevenue: React.FC = () => {
  const [revenue, setDailyRevenue] = useState<number>(0);

  useEffect(() => {
    const fetchDailyRevenue = async () => {
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const response = await axios.get(
          `http://localhost:3000/order/daily-revenue?date=${formattedDate}`
        );
        setDailyRevenue(response.data);
      } catch (error) {
        console.error('Error fetching daily revenue:', error);
      }
    };

    fetchDailyRevenue();
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <div className={styles.content}>
          <p className={styles.number}>{revenue}</p>
          <p className={styles.commandes}>recettes journaliers</p>
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
            d="M33 82.5V107.25H115.5V49.5H99V41.25H118.462C120.301 41.25 120.97 41.4397 121.638 41.8027C122.305 42.1529 122.852 42.6964 123.205 43.362C123.56 44.0303 123.75 44.6985 123.75 46.5382V110.212C123.75 112.051 123.56 112.72 123.197 113.388C122.847 114.055 122.304 114.602 121.638 114.955C120.97 115.31 120.301 115.5 118.462 115.5H30.0383C28.1985 115.5 27.5303 115.31 26.862 114.947C26.1945 114.597 25.6482 114.054 25.2945 113.388C24.948 112.72 24.75 112.051 24.75 110.22V82.5H33Z"
            fill="#8B8894"
            fill-opacity="0.18"
          />
          <path
            d="M99 24.75H16.5V82.5H99V24.75ZM107.25 21.7883V85.4618C107.25 87.3015 107.06 87.9698 106.697 88.638C106.347 89.3055 105.804 89.8518 105.138 90.2055C104.47 90.5602 103.801 90.75 101.962 90.75H13.5383C11.6985 90.75 11.0303 90.5602 10.362 90.1973C9.69451 89.8471 9.1482 89.3036 8.7945 88.638C8.448 87.9698 8.25 87.3015 8.25 85.47V21.7883C8.25 19.9485 8.43975 19.2803 8.80275 18.612C9.15293 17.9445 9.69636 17.3982 10.362 17.0445C11.0303 16.698 11.6985 16.5 13.53 16.5H101.953C103.793 16.5 104.462 16.6897 105.13 17.0527C105.797 17.4029 106.344 17.9464 106.697 18.612C107.052 19.2803 107.242 19.9485 107.242 21.7883H107.25Z"
            fill="#8B8894"
            fill-opacity="0.18"
          />
          <path
            d="M57.75 74.25C52.2799 74.25 47.0339 72.077 43.1659 68.2091C39.298 64.3411 37.125 59.0951 37.125 53.625C37.125 48.1549 39.298 42.9089 43.1659 39.0409C47.0339 35.173 52.2799 33 57.75 33C63.2201 33 68.4661 35.173 72.3341 39.0409C76.202 42.9089 78.375 48.1549 78.375 53.625C78.375 59.0951 76.202 64.3411 72.3341 68.2091C68.4661 72.077 63.2201 74.25 57.75 74.25ZM57.75 66C61.0321 66 64.1797 64.6962 66.5004 62.3754C68.8212 60.0547 70.125 56.9071 70.125 53.625C70.125 50.3429 68.8212 47.1953 66.5004 44.8746C64.1797 42.5538 61.0321 41.25 57.75 41.25C54.4679 41.25 51.3203 42.5538 48.9996 44.8746C46.6788 47.1953 45.375 50.3429 45.375 53.625C45.375 56.9071 46.6788 60.0547 48.9996 62.3754C51.3203 64.6962 54.4679 66 57.75 66Z"
            fill="#8B8894"
            fill-opacity="0.18"
          />
        </svg>
      </div>
    </div>
  );
};

export default DailyRevenue;
