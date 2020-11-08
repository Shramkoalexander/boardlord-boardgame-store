import React from "react";
import ButtonCustom from "../../components/button-custom/button-custom.component";
import { buttonStyleTypes } from "../../components/button-custom/button-custom.utils";
import styles from "./page-not-found.module.scss";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <div className={styles.text}>
          Увы! Страница, которую вы ищите, не существует!
        </div>
        <ButtonCustom styleType={buttonStyleTypes.WHITE} to="/">
          Вернуться на главную
        </ButtonCustom>
      </div>
    </div>
  );
}

export default PageNotFound;
