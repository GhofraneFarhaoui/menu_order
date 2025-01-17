import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
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
  const initialState = {
    name: '',
    description: '',
    price: '',
    image_url: '',
    categoryId: 0,
  };

  const [newItem, setNewItem] = useState(initialState);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchCategories();
  }, [isOpen]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(
          'http://localhost:3000/menu_items/upload-image',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        setNewItem((prevItem) => ({
          ...prevItem,
          image_url: response.data.imageUrl,
        }));
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: name === 'price' || name === 'categoryId' ? value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, price, description, categoryId, image_url } = newItem;

    if (name && price && categoryId && image_url) {
      const formattedItem = {
        name,
        description,
        price: parseFloat(price),
        image_url,
        categoryId: Number(categoryId),
      };
      onAddMenuItem(formattedItem);
      resetForm();
      onClose();
    } else {
      alert('Please fill in all required fields, including the image.');
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewItem(initialState);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`${styles.popup} ${isOpen ? styles.show : ''}`}>
      <div className={styles.popupContent}>
        <h2 className={styles.title}>Ajouter un plat</h2>
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
                  strokeDasharray="2 2"
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
            <label>Catégorie</label>
            <div className={styles.dropdownWrapper}>
              <select
                name="categoryId"
                value={newItem.categoryId || ''}
                onChange={handleChange}
                required
                className={styles.selectInput}
              >
                <option value="" disabled>
                  Sélectionnez une catégorie
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <span className={styles.arrowDown}></span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Prix</label>
            <input
              type="text"
              name="price"
              value={newItem.price}
              onChange={handleChange}
              placeholder="Entrez le prix"
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

          <button className={styles.poupbutton} type="submit">
            Ajouter
          </button>
          <button
            className={styles.poupbutton}
            type="button"
            onClick={handleCancel}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
