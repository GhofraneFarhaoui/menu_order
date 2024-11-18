import React from 'react';
import { IconAtom } from '../IconAtom/IconAtom';
import styles from './BoxWithIconNumber.module.css';

interface BoxWithIconNumberProps {
  number: string;
  text: string;
  icon: React.ReactNode;
}

export const BoxWithIconNumber: React.FC<BoxWithIconNumberProps> = ({
  number,
  text,
  icon,
}) => {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <p className={styles.number}>{number}</p>
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.icon}>
        <IconAtom icon={icon} />
      </div>
    </div>
  );
};
