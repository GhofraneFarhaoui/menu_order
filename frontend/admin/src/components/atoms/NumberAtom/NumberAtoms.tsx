import React from 'react';
import styles from './NumberAtom.module.css';

export interface NumberAtomProps {
  number: string;
}

export const NumberAtom: React.FC<NumberAtomProps> = ({ number }) => {
  return <p className={styles.number}>{number}</p>;
};
