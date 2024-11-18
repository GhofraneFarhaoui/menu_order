import React from 'react';
import styles from './IconAtom.module.css';

export interface IconAtomProps {
  icon: React.ReactNode;
}

export const IconAtom: React.FC<IconAtomProps> = ({ icon }) => {
  return <div className={styles.icon}>{icon}</div>;
};
