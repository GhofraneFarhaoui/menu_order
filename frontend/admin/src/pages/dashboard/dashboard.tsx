import React from 'react';
import SideMenu from '../../components/molecules/SideMenu/SideMenu';
import OrdersCount from '../../components/molecules/OrdersCount/OrdersCount';
import DailyRevenue from '../../components/molecules/DailyRevenue/DailyRevenu';
import UpcomingOrders from '../../components/molecules/UpcomingOrders/UpcomingOrders';
import PopularItems from '../../components/molecules/PopularItems/PopularItems';
import styles from './dashboard.module.css';
import AverageOrderAmount from '../../components/molecules/AverageAmount/AverageAmount';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <SideMenu />

      <div className={styles.mainContent}>
        <div className={styles.topRow}>
          <OrdersCount />
          <DailyRevenue />
          <AverageOrderAmount />
        </div>
        <div className={styles.middleRow}>
          <UpcomingOrders />
          <PopularItems />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
