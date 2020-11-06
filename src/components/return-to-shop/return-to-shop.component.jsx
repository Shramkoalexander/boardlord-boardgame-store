import React from "react";
import ButtonCustom from "../button-custom/button-custom.component";
import { buttonStyleTypes } from "../button-custom/button-custom.utils";
import styles from "./return-to-shop.module.scss";

function ReturnToShop() {
  return (
    <div className={styles.container}>
      <ButtonCustom to="/shop" styleType={buttonStyleTypes.SECONDARY}>
        <span className={`material-icons ${styles.returnArrow}`}>
          keyboard_return
        </span>
        В каталог
      </ButtonCustom>
    </div>
  );
}

export default ReturnToShop;
