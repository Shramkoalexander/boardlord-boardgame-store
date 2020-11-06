import React from "react";
import styles from "./spinner.module.scss";
import Logo from "../logo/logo.component";

function Spinner() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}>
        <Logo />
      </div>
    </div>
  );
}

export default Spinner;
