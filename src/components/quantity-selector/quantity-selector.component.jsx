import React from "react";
import styles from "./quantity-selector.module.scss";

function QuantitySelector({ handleAdd, handleRemove, quantity }) {
  return (
    <div className={styles.container}>
      <button onClick={handleRemove} className={styles.btn}>
        <span className="material-icons">remove</span>
      </button>
      <div className={styles.count}>{quantity}</div>
      <button onClick={handleAdd} className={styles.btn}>
        <span className="material-icons">add</span>
      </button>
    </div>
  );
}

export default QuantitySelector;
