import React from "react";
import styles from "./form-submit-spinner.module.scss";

function FormSubmitSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.bars}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default FormSubmitSpinner;
