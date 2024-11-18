import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as OrdersCountIcon } from '../../../assets/icons/OrdersCount.svg';
import { BoxWithIconNumber } from '../../atoms/BoxWithIconNumber/BoxWithIconNumber';

const OrdersCount: React.FC = () => {
  const [orderCount, setOrderCount] = useState<number | null>(null);

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

  if (orderCount === null) {
    return <p>Loading...</p>;
  }

  return (
    <BoxWithIconNumber
      number={orderCount.toString()}
      text="Commandes"
      icon={<OrdersCountIcon />}
    />
  );
};

export default OrdersCount;
