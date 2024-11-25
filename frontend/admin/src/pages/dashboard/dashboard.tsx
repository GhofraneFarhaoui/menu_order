import React from 'react';
import OrdersCount from '../../components/molecules/OrdersCount/OrdersCount';
import DailyRevenue from '../../components/molecules/DailyRevenue/DailyRevenu';
import UpcomingOrders from '../../components/molecules/UpcomingOrders/UpcomingOrders';
import PopularItems from '../../components/molecules/PopularItems/PopularItems';
import styles from './dashboard.module.css';
import AverageOrderAmount from '../../components/molecules/AverageAmount/AverageAmount';
import Layout from '../../components/template/Layout';

const Dashboard: React.FC = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Dashboard;
