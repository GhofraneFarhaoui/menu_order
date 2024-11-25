import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../../atoms/Popup/Popup';
import styles from './MenuItemBox.module.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: {
    id: number;
    name: string;
  };
  availability: boolean;
}

interface MenuItemBoxProps {
  onItemSelect: (item: MenuItem) => void;
}

const MenuItemBox: React.FC<MenuItemBoxProps> = ({ onItemSelect }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/menu_items');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleAddMenuItem = async (newItem: {
    name: string;
    description: string;
    price: number;
    image_url: string;
    categoryId: number;
  }) => {
    try {
      const response = await axios.post('http://localhost:3000/menu_items', {
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        image_url: newItem.image_url,
        category: { id: newItem.categoryId },
      });
      setMenuItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error('Failed to add menu item:', error);
    }
  };

  const handlePublishMenu = async () => {
    try {
      await axios.patch('http://localhost:3000/menu_items/publish');
      alert('Menu published successfully.');
    } catch (error) {
      console.error('Failed to publish menu:', error);
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <div>Plat</div>
        <div>Name</div>
        <div>Catégories</div>
        <div>Prix</div>
        <div>Disponibilité</div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={styles.listItem}
            onClick={() => onItemSelect(item)}
          >
            <div className={styles.itemImageBox}>
              <img
                src={`http://localhost:3000/static/${item.image_url}`}
                alt={item.name}
                className={styles.itemImage}
              />
            </div>
            <div>{item.name}</div>
            <div>{item.category?.name || 'No Category'}</div>
            <div>{item.price} D</div>
            <div
              className={`${styles.availability} ${
                item.availability ? styles.available : ''
              }`}
            >
              {item.availability ? 'Disponible' : 'Indisponible'}
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.buttonContainer}>
        <button className={styles.publishButton} onClick={handlePublishMenu}>
          Publier le menu
        </button>
        <button className={styles.addButton} onClick={() => setShowPopup(true)}>
          Ajouter un élément
        </button>
      </div>
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onAddMenuItem={handleAddMenuItem}
      />
    </div>
  );
};

export default MenuItemBox;
