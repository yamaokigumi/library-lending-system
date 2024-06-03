'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleSelectedImageClick = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.container}>
      {!selectedImage && (
        <div className={styles.imagesContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src="/back-return-svgrepo-com.svg"
              className={styles.image}
              width={300}
              height={300}
              onClick={() => handleImageClick('/back-return-svgrepo-com.svg')}
              alt="Back Return"
            />
            <p className={styles.imageText}>貸出・返却</p>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src="/add-square-svgrepo-com.svg"
              className={styles.image}
              width={300}
              height={300}
              onClick={() => handleImageClick('/add-square-svgrepo-com.svg')}
              alt="Add Square"
            />
            <p className={styles.imageText}>書籍追加・削除</p>
          </div>
        </div>
      )}
      {selectedImage && (
        <div className={styles.selectedContainer}>
          <Image
            src={selectedImage}
            className={`${styles.image} ${styles.selectedImage} ${styles.moveToBottomRight}`}
            onClick={handleSelectedImageClick}
            alt="Selected"
            width={300}
            height={300}
          />
          <div className={styles.newImage}>
            <Image src='/barcode-2-svgrepo-com.svg' alt="New Image" width={600} height={600} />
          </div>
        </div>
      )}
    </div>
  );
}
