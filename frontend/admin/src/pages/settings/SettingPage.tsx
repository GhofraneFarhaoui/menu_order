import React from 'react';
import SettingsForm from '../../components/molecules/SettingsForm/SettingsForm';
import styles from './SettingsPage.module.css';
import Layout from '../../components/template/Layout';

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.leftSection}>
          <SettingsForm />
        </div>
        <div className={styles.middleSection}></div>
        <div className={styles.rightSection}>
          <div className={styles.placeholder}></div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
