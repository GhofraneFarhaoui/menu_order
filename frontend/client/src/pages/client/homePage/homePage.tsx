import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryCard from '../../../components/categorCard/categoryCard';
import Header from '../../../components/header';
import styles from './homePage.module.css';

type Category = {
  id: number;
  name: string;
  image_url: string;
};

const STATIC_BASE_URL = 'http://localhost:3000/static/';

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        const updatedCategories = response.data.map((category: Category) => ({
          ...category,
          image_url: `${STATIC_BASE_URL}${category.image_url}`,
        }));
        setCategories(updatedCategories);
      } catch (err) {
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
      <main style={{ paddingTop: '60px' }}>
        <section className={styles.menuSection}>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                imageUrl={category.image_url}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
