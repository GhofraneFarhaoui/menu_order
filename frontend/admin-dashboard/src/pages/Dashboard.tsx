import React from 'react';
import { Row, Col } from 'antd';
import OrdersCountCard from '../components/OrdresCountCard';
import DailyRevenue from '../components/DailyRevenuCard';
import AverageOrderAmount from '../components/AverageAmount';
import UpcomingOrders from '../components/UpcomingOrders';
import PopularItems from '../components/PopularItems';

const Dashboard: React.FC = () => (
  <div style={{ padding: '12px' }}>
    <Row gutter={8}>
      <Col span={7}>
        <OrdersCountCard />
      </Col>
      <Col span={7}>
        <DailyRevenue />
      </Col>
      <Col span={7}>
        <AverageOrderAmount />
      </Col>
    </Row>
    <Row gutter={16} style={{ marginTop: '16px' }} justify="center" align="top">
      <Col span={12} xs={24} sm={12} md={12}>
        <UpcomingOrders />
      </Col>

      <Col span={12} xs={24} sm={12} md={12}>
        <PopularItems></PopularItems>
      </Col>
    </Row>
  </div>
);

export default Dashboard;
