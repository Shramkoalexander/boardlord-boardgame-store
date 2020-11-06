import React from "react";
import { useEffect } from "react";
import styles from "./alert.module.scss";
import { alertTypes } from "./alert.utils";
import { Element, scroller } from "react-scroll";

function Alert({ alertMessage, type = alertTypes.ERROR }) {
  let alertStyle;
  const scrollToName = "alert";
  const show = !!alertMessage;

  useEffect(() => {
    if (show) {
      scroller.scrollTo(scrollToName, {
        duration: 0,
        offset: -150,
      });
    }
  }, [show]);

  switch (type) {
    case alertTypes.ERROR:
      alertStyle = styles.errorMessage;
      break;

    default:
      break;
  }

  return (
    show && (
      <Element name={scrollToName} className={alertStyle}>
        {alertMessage}
      </Element>
    )
  );
}

export default Alert;
