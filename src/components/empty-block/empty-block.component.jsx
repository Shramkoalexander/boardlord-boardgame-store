import React from "react";
import styles from "./empty-block.module.scss";

function EmptyBlock({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default EmptyBlock;
