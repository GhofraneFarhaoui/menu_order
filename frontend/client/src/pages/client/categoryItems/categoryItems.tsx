import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './categoryItems.module.css';
import Header from '../../../components/header';
import { FaAngleDown, FaAngleUp, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
}

const CategoryItemsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [items, setItems] = useState<Item[]>([]);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [cart, setCart] = useState<{ [key: number]: number }>(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const STATIC_BASE_URL = 'http://localhost:3000/static/';

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/categories/${categoryId}`
        );
        if (response.data && response.data.menuItems) {
          const updatedItems = response.data.menuItems.map((item: Item) => ({
            ...item,

            image_url: `${STATIC_BASE_URL}${item.image_url}`,
          }));
          setItems(updatedItems);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    if (categoryId) {
      fetchItems();
    }
  }, [categoryId]);

  useEffect(() => {
    // Save the cart to sessionStorage whenever it changes
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleToggle = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const incrementItem = (id: number) => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart') || '{}');
    const updatedCart = {
      ...storedCart,
      [id]: (storedCart[id] || 0) + 1,
    };
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const decrementItem = (id: number) => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart') || '{}');
    const updatedCart = {
      ...storedCart,
      [id]: Math.max((storedCart[id] || 0) - 1, 0),
    };
    if (updatedCart[id] === 0) delete updatedCart[id]; // Remove item if quantity is 0
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const getTotalPrice = () =>
    Object.keys(cart).reduce((acc, id) => {
      const item = items.find((item) => item.id === parseInt(id));
      const quantity = cart[parseInt(id)] || 0;
      return acc + (item ? quantity * parseFloat(item.price) : 0);
    }, 0);

  const navigate = useNavigate();

  const handleCheckout = () => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart') || '{}');

    const cartItems = items
      .filter((item) => storedCart[item.id] > 0)
      .map((item) => ({
        ...item,
        quantity: storedCart[item.id],
      }));

    const totalPrice = Object.keys(storedCart).reduce((acc, id) => {
      const item = items.find((item) => item.id === parseInt(id));
      const quantity = storedCart[parseInt(id)] || 0;
      return acc + (item ? quantity * parseFloat(item.price) : 0);
    }, 0);

    navigate('/order', { state: { cartItems, totalPrice } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>

      <section className={styles.menuSection}>
        <div className={styles.itemsGrid}>
          {items.map((item) => (
            <div key={item.id} className={styles.itemBox}>
              <img
                src={item.image_url}
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemPrice}>{item.price} D</span>
              </div>
              <button
                className={styles.expandButton}
                onClick={() => handleToggle(item.id)}
              >
                {expandedItem === item.id ? <FaAngleUp /> : <FaAngleDown />}
              </button>

              {expandedItem === item.id && (
                <div className={styles.itemExtraDetails}>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <div className={styles.actions}>
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => decrementItem(item.id)}
                      >
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 24L1 12.5L12 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <span className={styles.quantityNumber}>
                        {cart[item.id] || 0}
                      </span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => incrementItem(item.id)}
                      >
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L12 12.5L1 24"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => {
                          const newCart = { ...cart };
                          delete newCart[item.id];
                          setCart(newCart);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.cartSummary}>
        <span className={styles.summaryText}>
          Total: {getTotalPrice().toFixed(2)} D
        </span>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          Commander
        </button>
      </div>
    </div>
  );
};

export default CategoryItemsPage;
