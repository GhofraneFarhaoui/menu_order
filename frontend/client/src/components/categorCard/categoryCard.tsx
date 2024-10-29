import React from 'react';
import { Link } from 'react-router-dom';
import styles from './categoryCard.module.css';

type CategoryCardProps = {
  id: number;
  name: string;
  imageUrl: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, imageUrl }) => {
  return (
    <div className={styles.categoryCard}>
      <img src={imageUrl} alt={name} className={styles.categoryImage} />

      <div className={styles.categoryDetails}>
        <span className={styles.categoryName}>{name}</span>
        <Link to={`/category-items/${id}`} className={styles.linkArrow}>
          <svg
            className="linkArrow"
            width="30"
            height="33"
            viewBox="0 0 30 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.4186 0.957443H0.767426V32.1064H29.4186V0.957443Z"
              fill="#FCFCFC"
            />
            <path
              d="M12.1085 10.0425L18.0775 16.5319L12.1085 23.0213"
              stroke="#8B8894"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
