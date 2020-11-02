import React from "react";
import { Link } from "react-router-dom";
import styles from "./button-custom.module.scss";
import { buttonStyleTypes } from "./button-custom.utils";

function ButtonCustom({
  children,
  to,
  styleType,
  outline,
  fullWidth,
  ...otherProps
}) {
  let buttonStyle;

  switch (styleType) {
    case buttonStyleTypes.MAIN:
      buttonStyle = styles.main;
      break;
    case buttonStyleTypes.SECONDARY:
      buttonStyle = styles.secondary;
      break;
    case buttonStyleTypes.DANGER:
      buttonStyle = styles.danger;
      break;
    case buttonStyleTypes.DARK:
      buttonStyle = styles.dark;
      break;
    case buttonStyleTypes.WHITE:
      buttonStyle = styles.white;
      break;
    case buttonStyleTypes.GOOGLE:
      buttonStyle = styles.google;
      break;

    default:
      buttonStyle = styles.dark;
      break;
  }

  if (outline) buttonStyle = `${buttonStyle} ${styles.outline}`;
  if (fullWidth) buttonStyle = `${buttonStyle} ${styles.fullWidth}`;

  if (to) {
    return (
      <Link to={to} className={buttonStyle} {...otherProps}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={buttonStyle} {...otherProps}>
        {children}
      </button>
    );
  }
}

export default ButtonCustom;
