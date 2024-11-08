import React from 'react';
import SideMenu from '../../components/SideMenu/SideMenu';
import OrdersCount from '../../components/OrdersCount/OrdersCount';
import DailyRevenue from '../../components/DailyRevenue/DailyRevenu';
import UpcomingOrders from '../../components/UpcomingOrders/UpcomingOrders';
import PopularItems from '../../components/PopularItems/PopularItems';
import styles from './dashboard.module.css';
import OrdersPerDay from '../../components/OrdersPerDay/OrdersPerDay';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <SideMenu />

      <div className={styles.mainContent}>
        <div className={styles.topRow}>
          <OrdersCount />
          <DailyRevenue />
          <OrdersPerDay />
          {/* <Card icon= , title ='I?DI' price ='INSIGHT.dailyrevenu'    */}
          {/* <Card icon= , title ='' price =''    */}
          {/* <Card icon= , title ='' price =''    */}
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
