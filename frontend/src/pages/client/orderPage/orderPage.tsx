import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './orderPage.module.css';
import Header from '../../../components/header';
import { useCart } from '../../../cartContest';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image_url: string;
}

interface LocationState {
  cartItems: CartItem[];
  totalPrice: string;
}

const OrderPage: React.FC = () => {
  const location = useLocation();
  const { cart, setCart } = useCart(); // Use the cart context

  const [cartItems, setCartItems] = useState<CartItem[]>(
    (location.state as LocationState)?.cartItems || []
  );
  const [totalPrice, setTotalPrice] = useState<string>(
    (location.state as LocationState)?.totalPrice || '0'
  );

  useEffect(() => {
    console.log('Cart Items in OrderPage:', cartItems);
  }, [cartItems]);

  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:3000/orders', {
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

  const handleCancel = () => {
    setCart({});
    setCartItems([]);
    setTotalPrice('0');
    console.log('Order cancelled and cart cleared');
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
                <span className={styles.itemQuantity}>
                  {item.quantity ?? 0}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>Rien</p>
        )}

        <div className={styles.totalPrice}>
          <h2>Prix Total: {totalPrice} D</h2>
        </div>

        <div className={styles.buttonsContainer}>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            Confirmer
          </button>
          <button
            className={styles.cancelButton}
            onClick={handleCancel} // Call the new cancel function
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
