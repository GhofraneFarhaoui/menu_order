import React, { useState, useEffect } from 'react';

import axios from 'axios';
import styles from './orderPage.module.css';
import Header from '../../../components/header';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image_url: string;
}

const OrderPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total_price, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = JSON.parse(sessionStorage.getItem('cart') || '{}');

      if (Object.keys(savedCart).length > 0) {
        try {
          const response = await axios.get('http://localhost:3000/menu_items');
          const allItems = response.data;

          const cartWithDetails = Object.keys(savedCart).map((id) => {
            const item = allItems.find(
              (item: CartItem) => item.id === parseInt(id)
            );
            return {
              ...item,
              quantity: savedCart[id],
            };
          });

          setCartItems(cartWithDetails);

          const total = cartWithDetails.reduce(
            (acc, item) => acc + item.quantity * parseFloat(item.price),
            0
          );
          setTotalPrice(total);
        } catch (error) {
          console.error('Error fetching menu items:', error);
        }
      }
    };

    loadCart();
  }, []);

  // Handle order confirmation
  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:3000/order', {
        total_price: total_price,
        items: cartItems.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      });
      console.log('Order placed:', response.data);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  // Handle cart cancellation
  const handleCancel = () => {
    sessionStorage.removeItem('cart');
    setCartItems([]);
    setTotalPrice(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
      <div className={styles.orderContainer}>
        <h1 className={styles.header}>Votre commande</h1>

        {cartItems.length > 0 ? (
          <div className={styles.itemList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemPrice}>{item.price} D</span>
                </div>
                <span className={styles.itemQuantity}>{item.quantity}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>Rien</p>
        )}

        <div className={styles.totalPrice}>
          <h2>Prix Total: {total_price.toFixed(2)} D</h2>
        </div>

        <div className={styles.buttonsContainer}>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            Confirmer
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
