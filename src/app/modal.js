import React from 'react';
import styles from '@/app/modal.module.css'; // Create a CSS module for styling
import iconAirdrop from "@/app/assets/img/others/home.png";
import Image from 'next/image';
const Modal = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal}>
        <Image src={iconAirdrop} alt="Big Banner" />
      </div>
    </div>
  );
};

export default Modal;