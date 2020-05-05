import React from "react";
import classes from "./logo.module.scss";
import logo from "./logo.svg";

function Logo({ size }) {
  return (
    <div className={`${classes.logo} ${size ? classes[`logo--${size}`] : ""}`}>
      <img src={logo} alt="logo" className={`${classes.img}`} />
    </div>
  );
}

export default Logo;
