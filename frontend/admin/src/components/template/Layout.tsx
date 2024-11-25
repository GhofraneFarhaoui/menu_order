import React, { ReactNode } from 'react';
import SideMenu from '../molecules/SideMenu/SideMenu';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.dashboard}>
      <SideMenu />
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
};

export default Layout;
