import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SideMenu.module.css';

const SideMenu: React.FC = () => (
  <nav className={styles.sideMenu}>
    <img src="/images/retalkLogo.png" alt="Logo" />{' '}
    <ul>
      <li>
        <Link to="/dashboard">Tableau de bord</Link>
      </li>
      <li>
        <Link to="/Menu">Menu</Link>{' '}
      </li>
      <li>
        <Link to="/orders">Commandes</Link>{' '}
      </li>
    </ul>
  </nav>
);
export default SideMenu;
