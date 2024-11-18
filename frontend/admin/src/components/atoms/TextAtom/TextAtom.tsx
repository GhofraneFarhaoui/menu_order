import React from 'react';
import styles from './TextAtom.module.css';

export interface TextAtomProps {
  text: string;
}

export const TextAtom: React.FC<TextAtomProps> = ({ text }) => {
  return <p className={styles.text}>{text}</p>;
};
