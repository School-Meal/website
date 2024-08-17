import React from "react";
import styles from "./Button.module.css";

function Button({ type = "button", onClick, children, style }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.button}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;
