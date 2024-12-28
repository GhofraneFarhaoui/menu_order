import React, { useState } from 'react';
import ReusableForm from '../ReusableForm/ReusableForm';
import styles from './SettingsForm.module.css';

const SettingsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    activeMenu: '#FFFFFF',
    inactiveMenu: '#FF5C5C',
    background: '#FFFFFF',
    category: '#FF5C5C',
    typography: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <ReusableForm
      onSubmit={handleSubmit}
      onClose={() => console.log('Closed')}
      title={<label className="title">Image d'arrière plan</label>}
    >
      <div className={styles.colorGrid}>
        <div>
          <label className={styles.colorLabel}>Menu Actif</label>
          <div className={styles.colorInputWrapper}>
            <span className={styles.colorCode}>{formData.activeMenu}</span>
            <input
              type="color"
              name="activeMenu"
              value={formData.activeMenu}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label className={styles.colorLabel}>Menu Inactif</label>
          <div className={styles.colorInputWrapper}>
            <span className={styles.colorCode}>{formData.inactiveMenu}</span>
            <input
              type="color"
              name="inactiveMenu"
              value={formData.inactiveMenu}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label className={styles.colorLabel}>Arrière Plan</label>
          <div className={styles.colorInputWrapper}>
            <span className={styles.colorCode}>{formData.background}</span>
            <input
              type="color"
              name="background"
              value={formData.background}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label className={styles.colorLabel}>Catégorie</label>
          <div className={styles.colorInputWrapper}>
            <span className={styles.colorCode}>{formData.category}</span>
            <input
              type="color"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div>
        <label className={styles.colorLabel}>Typographie</label>
        <input
          type="text"
          name="typography"
          value={formData.typography}
          onChange={handleInputChange}
          placeholder="Enter typography"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </ReusableForm>
  );
};

export default SettingsForm;
