import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as OrdersPerDayIcon } from '../../../assets/icons/OrdersPerDay.svg';
import { BoxWithIconNumber } from '../../atoms/BoxWithIconNumber/BoxWithIconNumber';

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
    <BoxWithIconNumber
      number={revenue.toFixed(2)}
      text="recettes journaliers"
      icon={<OrdersPerDayIcon />}
    ></BoxWithIconNumber>
  );
};

export default DailyRevenue;
