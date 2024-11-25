import React, { useState } from 'react';
import MenuItemBox from '../../components/molecules/MenuItemBox/MenuItemBox';
import ItemDetails from '../../components/molecules/MenuItemDetails/MenuItemDetails';
import Layout from '../../components/template/Layout';
import styles from './MenuPage.module.css';

const MenuPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.itemBoxWrapper}>
          <MenuItemBox onItemSelect={handleItemClick} />
        </div>
        <div className={styles.itemDetailsWrapper}>
          <ItemDetails item={selectedItem} onClose={handleCloseDetails} />
        </div>
      </div>
    </Layout>
  );
};

export default MenuPage;
