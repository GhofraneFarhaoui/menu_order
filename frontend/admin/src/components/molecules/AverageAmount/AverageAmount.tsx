import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as AverageAmountIcon } from '../../../assets/icons/AverageAmount.svg';
import { BoxWithIconNumber } from '../../atoms/BoxWithIconNumber/BoxWithIconNumber';

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
    <BoxWithIconNumber
      number={averageOrderAmount.toString()}
      text="Average Amount"
      icon={<AverageAmountIcon />}
    />
  );
};

export default AverageOrderAmount;
