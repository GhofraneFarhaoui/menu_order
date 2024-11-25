import React, { useState, useRef } from 'react';
import styles from './Popup.module.css';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMenuItem: (item: {
    name: string;
    description: string;
    price: number;
    image_url: string;
    categoryId: number;
  }) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onAddMenuItem }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    image_url: '',
    categoryId: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewItem((prevItem) => ({
        ...prevItem,
        image_url: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.price && newItem.categoryId) {
      onAddMenuItem(newItem);
      onClose();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: name === 'price' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`${styles.popup} ${isOpen ? styles.show : ''}`}>
      <div className={styles.popupContent}>
        <div className={styles.imageUpload}>
          <div onClick={handleImageUploadClick}>
            {newItem.image_url ? (
              <img
                src={newItem.image_url}
                alt="Preview"
                className={styles.imagePreview}
              />
            ) : (
              <svg
                width="454"
                height="195"
                viewBox="0 0 454 195"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="453"
                  height="194"
                  rx="9.5"
                  fill="white"
                  stroke="#D9D9D9"
                  stroke-dasharray="2 2"
                />
              </svg>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={handleFileChange}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Plat</label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Catégorie ID</label>
            <input
              type="number"
              name="categoryId"
              value={newItem.categoryId}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Prix</label>
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Ajouter</button>
          <button type="button" onClick={onClose}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
