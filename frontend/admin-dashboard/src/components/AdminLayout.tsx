import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
  DashboardOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

const AdminLayout: React.FC = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider theme="light" collapsible>
      <div
        style={{
          color: 'white',
          fontSize: '24px',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <img src="../assets/retalkLogo.png" alt="Logo" />
      </div>
      <Menu theme="light" mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Tableau de Bord</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/menu">Menu</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<SettingOutlined />}>
          <Link to="/settings">Parametres</Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Content style={{ padding: '16px' }}>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

export default AdminLayout;
