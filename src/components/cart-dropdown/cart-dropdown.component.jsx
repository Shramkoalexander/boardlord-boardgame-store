import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import styles from "./cart-dropdown.module.scss";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartItemsTotalWithDiscount,
  selectIsCartDropdownVisible,
} from "../../redux/cart/cart.selectors";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  hideCartDropdown,
} from "../../redux/cart/cart.actions";
import { Link } from "react-router-dom";
import {
  getDiscountedPriceIfExist,
  getFormatedPrice,
} from "../../redux/shop/shop.utils";
import { selectCurrency } from "../../redux/shop/shop.selectors";
import HeaderIconDropdown from "../header-icon-dropdown/header-icon-dropdown.component";
import ButtonCustom from "../button-custom/button-custom.component";
import { buttonStyleTypes } from "../button-custom/button-custom.utils";
import QuantitySelector from "../quantity-selector/quantity-selector.component";

function CartDropdown({
  cartItems,
  currency,
  cartItemsCount,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  cartItemsTotalWithDiscount,
  hideCartDropdown,
  isCartDropdownVisible,
  toggleNode,
}) {
  return (
    <HeaderIconDropdown
      isDropdownVisible={isCartDropdownVisible}
      toggleNode={toggleNode}
      hideDropdown={hideCartDropdown}
    >
      {cartItemsCount ? (
        <>
          <div className="pb-2">
            <h1 className={styles.title}>Корзина</h1>
          </div>

          <div className={styles.itemList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImageContainer}>
                  <Link to={`/shop/product-details/${item.alias}`}>
                    <img
                      className={styles.itemImage}
                      src={require(`../../assets/images/boardgames/${item.alias}/${item.alias}.jpg`)}
                      alt="board game"
                    />
                  </Link>
                </div>
                <div className="d-flex flex-column">
                  <div className={styles.itemTitle}>
                    <Link to={`/shop/product-details/${item.alias}`}>
                      {item.title}
                    </Link>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className={styles.itemSum}>
                      {getFormatedPrice(
                        currency,
                        getDiscountedPriceIfExist(item) * item.quantity
                      )}
                    </div>

                    <QuantitySelector
                      handleRemove={() => removeItemFromCart(item)}
                      handleAdd={() => addItemToCart(item)}
                      quantity={item.quantity}
                    />

                    <div className="px-4">
                      <button
                        onClick={() => {
                          clearItemFromCart(item);
                        }}
                        className={styles.clearBtn}
                      >
                        <span className={`material-icons ${styles.clearIcon}`}>
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex pt-3 justify-content-between align-items-center">
            <div className={styles.total}>
              {`Итого: ${getFormatedPrice(
                currency,
                cartItemsTotalWithDiscount
              )}`}
            </div>
            <ButtonCustom to="/cart" styleType={buttonStyleTypes.MAIN}>
              Оформить
            </ButtonCustom>
          </div>
        </>
      ) : (
        <div className={styles.emptyCart}>Ваша корзина пуста</div>
      )}
    </HeaderIconDropdown>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  currency: selectCurrency,
  cartItemsCount: selectCartItemsCount,
  cartItemsTotalWithDiscount: selectCartItemsTotalWithDiscount,
  isCartDropdownVisible: selectIsCartDropdownVisible,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
  hideCartDropdown: () => dispatch(hideCartDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
