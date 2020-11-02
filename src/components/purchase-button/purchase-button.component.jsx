import React from "react";
import { connect } from "react-redux";
import { selectIsItemInCart } from "../../redux/cart/cart.selectors";
import { addItemToCart } from "../../redux/cart/cart.actions";
import styles from "./purchase-button.module.scss";
import ButtonCustom from "../button-custom/button-custom.component";
import { buttonStyleTypes } from "../button-custom/button-custom.utils";

function PurchaseButton({ item, isItemInCart, addItemToCart }) {
  return (
    <>
      {item.inStockCount > 0 ? (
        !isItemInCart ? (
          <ButtonCustom
            styleType={buttonStyleTypes.DARK}
            onClick={() => {
              addItemToCart(item);
            }}
          >
            Купить
          </ButtonCustom>
        ) : (
          <ButtonCustom
            to="/cart"
            styleType={buttonStyleTypes.MAIN}
            title="перейти в корзину"
          >
            Товар в корзине{" "}
            <span className={`material-icons ${styles.goToCartArrow}`}>
              arrow_right_alt
            </span>
          </ButtonCustom>
        )
      ) : (
        <ButtonCustom styleType={buttonStyleTypes.MAIN} outline>
          Нет в наличии
        </ButtonCustom>
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isItemInCart: selectIsItemInCart(ownProps.item)(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseButton);
