import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

function Modal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.buttonGroup}>
          <Button onClick={onConfirm} style={{ width: "100%" }}>
            확인
          </Button>
          <Button
            onClick={onClose}
            style={{ width: "100%", backgroundColor: "#f0f0f0", color: "#333" }}
          >
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
