import React from 'react';
import SideMenu from '../../components/SideMenu/SideMenu';
import OrdersCount from '../../components/OrdersCount/OrdersCount';
import DailyRevenue from '../../components/DailyRevenue/DailyRevenu';
import UpcomingOrders from '../../components/UpcomingOrders/UpcomingOrders';
import PopularItems from '../../components/PopularItems/PopularItems';
import styles from './MenuPage.module.css';

const Menu: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <SideMenu />

      <div className={styles.mainContent}>
        <div className={styles.topRow}>
          <OrdersCount />
          <DailyRevenue />
        </div>
        <div className={styles.middleRow}>
          <UpcomingOrders />
          <PopularItems />
        </div>
      </div>
    </div>
  );
};

export default Menu;
