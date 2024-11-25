import React from 'react';
import styles from './MenuItemDetails.module.css';

interface ItemDetailsProps {
  item: {
    name: string;
    description: string;
    price: number;
    image_url: string;
  } | null;
  onClose: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className={styles.detailsBox}>
      <button className={styles.closeButton} onClick={onClose}>
        X
      </button>
      <div className={styles.imageContainer}>
        <img
          src={`http://localhost:3000/static/${item.image_url}`}
          alt={item.name}
          className={styles.detailsImage}
        />
      </div>
      <div className={styles.detailsContent}>
        <div className={styles.detailsTitlePrice}>
          <h2>{item.name}</h2>
          <div className={styles.price}>{item.price} D</div>
        </div>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
