import React from "react";
import { tagTypes } from "./tag.utils";
import styles from "./tag.module.scss";

function Tag({ type, show }) {
  let tagElement;

  switch (type) {
    case tagTypes.DISCOUNT:
      tagElement = (
        <div
          className={styles.tag}
          style={{
            backgroundImage: `url(${require("../../assets/images/tags/discount-tag.svg")})`,
            transform: `rotate(-45deg)`,
            display: show ? "block" : "none",
          }}
        ></div>
      );
      break;
    case tagTypes.TOP:
      tagElement = (
        <div
          className={styles.tag}
          style={{
            backgroundImage: `url(${require("../../assets/images/tags/top-tag.svg")})`,
            display: show ? "block" : "none",
          }}
        ></div>
      );
      break;

    case tagTypes.NEW:
      tagElement = (
        <div
          className={styles.tag}
          style={{
            backgroundImage: `url(${require("../../assets/images/tags/new-tag.svg")})`,
            transform: `rotate(30deg)`,
            display: show ? "block" : "none",
          }}
        ></div>
      );
      break;

    default:
      tagElement = "";
      break;
  }

  return tagElement;
}

export default Tag;
