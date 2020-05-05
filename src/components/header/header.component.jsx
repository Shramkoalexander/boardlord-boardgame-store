import React from "react";
import classes from "./header.module.scss";
import Logo from "../logo/logo.component";

function Header() {
  return (
    <div className=" bg-dark">
      <div className="d-sm-none d-flex justify-content-center pt-2">
        <Logo size="small" />
      </div>
      <div className="container-lg">
        <div className="row align-items-center justify-content-between no-gutters py-2">
          <div className="col-auto d-lg-none mr-4 ml-2">
            <div className={classes.menuIcon}>
              <a href="/">
                <span className={`material-icons  ${classes.icon}`}>menu</span>
              </a>
            </div>
          </div>
          <div className="d-none d-sm-block col col-lg-auto">
            <Logo />
          </div>
          <div className="col-auto d-none d-lg-block">
            <ul className={classes.navList}>
              <li>
                <a href="/">Магазин</a>
              </li>
              <li>
                <a href="/">О компании</a>
              </li>
              <li>
                <a href="/">Скидки</a>
              </li>
              <li>
                <a href="/">Доставка</a>
              </li>
              <li>
                <a href="/">Оплата</a>
              </li>
            </ul>
          </div>
          <div className="col-auto d-flex justify-content-end">
            <div className={classes.search}>
              <a href="/">
                <i className={`material-icons  ${classes.icon}`}>search</i>
              </a>
            </div>
            <div className={classes.phone}>
              <a href="/">
                <i className={`material-icons  ${classes.icon}`}>phone</i>
              </a>
            </div>
            <div className={classes.user}>
              <a href="/">
                <i className={`material-icons  ${classes.icon}`}>person</i>
              </a>
            </div>
            <div className={classes.cart}>
              <a href="/">
                <i className={`material-icons  ${classes.icon}`}>
                  shopping_cart
                </i>
                <span className={classes.itemCount}>0</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
