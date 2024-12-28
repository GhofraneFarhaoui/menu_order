import React, { useState } from 'react';
import styles from './ReusableForm.module.css';

interface ReusableFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  onClose?: () => void;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  children,
  onSubmit,
  onClose,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <div className={styles.uploadBoxContainer}>
          <label htmlFor="fileUpload" className={styles.uploadBox}>
            {uploadedImage ? (
              <div className={styles.imageContainer}>
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className={styles.uploadedImage}
                />
              </div>
            ) : (
              <>
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
              </>
            )}
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.fileInput}
            />
          </label>
        </div>

        {children}
        <div className={styles.actions}>
          {onClose && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Annuler
            </button>
          )}
          <button type="submit" className={styles.submitButton}>
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReusableForm;
