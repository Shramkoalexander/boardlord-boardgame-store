import React from "react";
import styles from "./form.module.scss";

function Form({ children, ...otherProps }) {
  return (
    <form className={styles.container} {...otherProps}>
      {children}
    </form>
  );
}

export default Form;
