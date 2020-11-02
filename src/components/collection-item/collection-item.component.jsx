import React from "react";
import styles from "./collection-item.module.scss";
import { Link } from "react-router-dom";
import PurchaseButton from "../purchase-button/purchase-button.component";
import FavoriteIcon from "../favorite-icon/favorite-icon.component";
import { connect } from "react-redux";
import { selectIsItemFavorite } from "../../redux/favorites/favorites.selectors";
import { getFormatedPrice } from "../../redux/shop/shop.utils";
import { hasDiscount, isNew, isTop, tagTypes } from "../tag/tag.utils";
import Tag from "../tag/tag.component";

function CollectionItem({ item, currency, isItemFavorite }) {
  return (
    <div className={styles.container}>
      <div className={styles.tagList}>
        <Tag type={tagTypes.DISCOUNT} show={hasDiscount(item.discount_pirce)} />
        <Tag
          type={tagTypes.TOP}
          show={isTop(item.num_user_ratings, item.average_user_rating)}
        />
        <Tag type={tagTypes.NEW} show={isNew(item.published)} />
      </div>
      <div
        className={
          isItemFavorite
            ? styles.favoriteWrapper
            : styles.favoriteWrapperInvisible
        }
      >
        <FavoriteIcon item={item} />
      </div>

      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Link to={`/shop/product-details/${item.alias}`}>
            <img
              src={require(`../../assets/images/boardgames/${item.alias}/${item.alias}.jpg`)}
              height="150"
              alt="board game"
            />
          </Link>
        </div>

        <div className={styles.titleContainer} title={item.title}>
          <Link
            className={styles.titleText}
            to={`/shop/product-details/${item.alias}`}
          >
            {item.title}
          </Link>
        </div>
        <div className={styles.priceContainer}>
          <div
            className={`${styles.price} ${
              hasDiscount(item.discount_pirce) ? styles.oldPrice : ""
            }`}
          >
            {getFormatedPrice(currency, item.price)}
          </div>
          <div
            className={`${styles.price} ${
              hasDiscount(item.discount_pirce) ? styles.discountPrice : "d-none"
            }`}
          >
            {getFormatedPrice(currency, item.discount_pirce)}
          </div>
        </div>
      </div>
      <PurchaseButton item={item} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isItemFavorite: selectIsItemFavorite(ownProps.item)(state),
});

export default connect(mapStateToProps)(CollectionItem);
