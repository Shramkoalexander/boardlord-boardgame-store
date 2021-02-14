import React from "react";
import { connect } from "react-redux";
import {
  selectCartItems,
  selectCartItemsTotalWithDiscount,
  selectCartItemsCount,
  selectCartItemsTotal,
  selectCartItemsOverallDiscount,
} from "../../redux/cart/cart.selectors";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  clearCart,
} from "../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import {
  hasDiscount,
  getDiscountedPriceIfExist,
  getFormatedPrice,
} from "../../redux/shop/shop.utils";
import styles from "./cart-page.module.scss";
import { selectCurrency } from "../../redux/shop/shop.selectors";
import { animateScroll as scroll } from "react-scroll";
import { useEffect } from "react";
import ReturnToShop from "../../components/return-to-shop/return-to-shop.component";
import ButtonCustom from "../../components/button-custom/button-custom.component";
import { buttonStyleTypes } from "../../components/button-custom/button-custom.utils";
import QuantitySelector from "../../components/quantity-selector/quantity-selector.component";
import SectionTitle from "../../components/section-title/section-title.component";
import uniqid from "uniqid";
import EmptyBlock from "../../components/empty-block/empty-block.component";

function CartPage({
  cartItems,
  cartItemsCount,
  cartItemsTotalWithDiscount,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  clearCart,
  cartItemsTotal,
  cartItemsOverallDiscount,
  currency,
}) {
  useEffect(() => {
    if (cartItemsCount === 0)
      scroll.scrollToTop({
        duration: 0,
      });
  }, [cartItemsCount]);

  return (
    <div className="mt-4 mt-lg-4 mb-5">
      <div className="container">
        <div className={styles.content}>
          <div className="mb-3 mb-md-4">
            <ReturnToShop />
          </div>

          <SectionTitle />

          {cartItemsCount ? (
            <>
              <div className={styles.itemList}>
                {cartItems.map((item) => (
                  <div key={uniqid()} className={styles.item}>
                    <div className={styles.itemImage}>
                      <Link to={`/shop/product-details/${item.alias}`}>
                        <img
                          src={require(`../../assets/images/boardgames/${item.alias}/${item.alias}.jpg`)}
                          height="100"
                          alt="board game"
                        />
                      </Link>
                    </div>
                    <div className={styles.itemTitle}>
                      <Link to={`/shop/product-details/${item.alias}`}>
                        {item.title}
                      </Link>
                    </div>
                    <div className={styles.itemPriceContainer}>
                      <div className={styles.itemPrice}>
                        {hasDiscount(item.discount_pirce)
                          ? getFormatedPrice(currency, item.discount_pirce)
                          : getFormatedPrice(currency, item.price)}
                      </div>

                      {hasDiscount(item.discount_pirce) ? (
                        <div className={styles.itemOldPrice}>
                          {getFormatedPrice(currency, item.price)}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <QuantitySelector
                      handleRemove={() => removeItemFromCart(item)}
                      handleAdd={() => addItemToCart(item)}
                      quantity={item.quantity}
                    />

                    <div className={styles.itemPrice}>
                      {getFormatedPrice(
                        currency,
                        getDiscountedPriceIfExist(item) * item.quantity
                      )}
                    </div>
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
                ))}
              </div>
              <div className={styles.summaryContainer}>
                <div>
                  <span className={styles.summaryTitle}> Всего:</span>
                  <span className={styles.summaryPrice}>
                    {getFormatedPrice(currency, cartItemsTotal)}
                  </span>
                </div>
                <div>
                  <span className={styles.summaryTitle}>Скидка:</span>
                  <span className={styles.summaryPrice}>
                    {getFormatedPrice(currency, cartItemsOverallDiscount)}
                  </span>
                </div>
                <div>
                  <span className={styles.summaryTitle}>Итого:</span>
                  <span className={styles.summaryPrice}>
                    {getFormatedPrice(currency, cartItemsTotalWithDiscount)}
                  </span>
                </div>
              </div>
              <div className={styles.bottomBtnContainer}>
                <ButtonCustom
                  styleType={buttonStyleTypes.DANGER}
                  onClick={clearCart}
                >
                  Очистить корзину
                </ButtonCustom>
                <ButtonCustom styleType={buttonStyleTypes.MAIN}>
                  Оформить заказ
                </ButtonCustom>
              </div>
            </>
          ) : (
            <EmptyBlock>Ваша корзина пуста</EmptyBlock>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartItemsCount: selectCartItemsCount,
  cartItemsTotalWithDiscount: selectCartItemsTotalWithDiscount,
  cartItemsTotal: selectCartItemsTotal,
  cartItemsOverallDiscount: selectCartItemsOverallDiscount,
  currency: selectCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
