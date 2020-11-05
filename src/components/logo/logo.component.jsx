import React from "react";
import styles from "./logo.module.scss";
import logo from "../../assets/images/logo.svg";

function Logo({ size }) {
  return (
    <div className={`${styles.container} ${size ? styles[size] : ""}`}>
      <img src={logo} alt="logo" className={`${styles.img}`} />
    </div>
  );
}

export default Logo;
