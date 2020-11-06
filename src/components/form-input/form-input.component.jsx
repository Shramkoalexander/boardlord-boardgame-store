import React from "react";
import styles from "./form-input.module.scss";

function FormInput({ onChange, label, errorMessage = "", ...otherProps }) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={errorMessage ? styles.inputError : styles.input}
        onChange={onChange}
        {...otherProps}
      />
      <div className={styles.errorMessage}>{errorMessage}</div>
    </div>
  );
}

export default FormInput;
