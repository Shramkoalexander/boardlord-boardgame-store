import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PhotoGallery from "../../components/photo-gallery/photo-gallery.component";
import { connect } from "react-redux";
import {
  selectCollection,
  selectCurrency,
} from "../../redux/shop/shop.selectors";
import styles from "./product-details.module.scss";
import { createStructuredSelector } from "reselect";
import PurchaseButton from "../../components/purchase-button/purchase-button.component";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import FavoriteIcon from "../../components/favorite-icon/favorite-icon.component";
import ReturnToShop from "../../components/return-to-shop/return-to-shop.component";
import withSpinner from "../../components/spinner/withSpinner.component";
import flowRight from "lodash.flowright";
import { getFormatedPrice } from "../../redux/shop/shop.utils";
import {
  hasDiscount,
  isNew,
  isTop,
  tagTypes,
} from "../../components/tag/tag.utils";
import Tag from "../../components/tag/tag.component";
import PageNotFound from "../page-not-found/page-not-found.component";
import uniqid from "uniqid";

function ProductDetails({ match, collection, currency }) {
  const product = collection.find(
    (product) => product.alias === match.params.productId
  );

  const DESCRIPTION_TAB = 0;
  const CONTENT_TAB = 1;
  const [activeTab, setActiveTab] = useState(DESCRIPTION_TAB);

  if (!product) {
    return <PageNotFound />;
  }

  const tagHasDiscount = hasDiscount(product.discount_pirce);
  const tagIsTop = isTop(product.num_user_ratings, product.average_user_rating);
  const tagIsNew = isNew(product.published);

  const isTagListVisible = tagHasDiscount || tagIsTop || tagIsNew;

  return (
    <>
      <div className="container d-none d-md-flex my-3">
        <Breadcrumbs />
      </div>

      <div className="container mt-4 mb-5">
        <div className="mb-3 mb-md-4 d-md-none">
          <ReturnToShop />
        </div>
        <div className="row mb-4">
          <div className="col-12 col-lg-6 mb-4 mb-lg-0">
            <PhotoGallery imageName={product.alias} />
          </div>

          <div className="col-12 col-lg-6">
            <div className="mb-4">
              <h1 className={styles.productTitle}>{product.title}</h1>
            </div>
            <div className="mb-4">
              <div className={styles.purchaseSection}>
                <div className={styles.priceContainer}>
                  <div
                    className={`${styles.price} ${
                      hasDiscount(product.discount_pirce) ? styles.oldPrice : ""
                    }`}
                  >
                    {getFormatedPrice(currency, product.price)}
                  </div>
                  <div
                    className={`${styles.price} ${
                      hasDiscount(product.discount_pirce)
                        ? styles.discountPrice
                        : "d-none"
                    }`}
                  >
                    {getFormatedPrice(currency, product.discount_pirce)}
                  </div>
                </div>
                <div className={styles.buttonsContainer}>
                  <div className={styles.purchaseButtonWrapper}>
                    <PurchaseButton item={product} />
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <FavoriteIcon item={product} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.propertiesContainer}>
              <div className={styles.property}>
                <div className={styles.propertyTitle}>Возраст:</div>
                <div>{product.min_age}+</div>
              </div>
              <div className={styles.property}>
                <div className={styles.propertyTitle}>Кол-во игроков:</div>
                <div>
                  {product.min_players === product.max_players
                    ? product.min_players
                    : `от ${product.min_players} до ${product.max_players}`}
                </div>
              </div>
              <div className={styles.property}>
                <div className={styles.propertyTitle}>Время:</div>
                <div>
                  {product.min_playtime === product.max_playtime
                    ? product.min_playtime
                    : `от ${product.min_playtime} до ${product.max_playtime}`}
                </div>
              </div>

              {isTagListVisible ? (
                <div className={styles.tagList}>
                  <Tag type={tagTypes.DISCOUNT} show={tagHasDiscount} />
                  <Tag type={tagTypes.TOP} show={tagIsTop} />
                  <Tag type={tagTypes.NEW} show={tagIsNew} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className={styles.tabContainer}>
              <button
                className={
                  activeTab === DESCRIPTION_TAB
                    ? styles.tabActive
                    : styles.tabInactive
                }
                onClick={() => {
                  setActiveTab(DESCRIPTION_TAB);
                }}
              >
                Описание игры
              </button>
              <button
                className={
                  activeTab === CONTENT_TAB
                    ? styles.tabActive
                    : styles.tabInactive
                }
                onClick={() => {
                  setActiveTab(CONTENT_TAB);
                }}
              >
                Комплектация
              </button>
            </div>
            <div className={styles.descrContent}>
              <div>
                {activeTab === DESCRIPTION_TAB ? (
                  product.description.map((paragraph, index) => (
                    <p key={uniqid()}>{paragraph}</p>
                  ))
                ) : (
                  <ul className={styles.productContentList}>
                    {product.content.map((listItem, index) => (
                      <li key={uniqid()}>{listItem}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  collection: selectCollection,
  currency: selectCurrency,
});

export default flowRight([connect(mapStateToProps), withRouter, withSpinner])(
  ProductDetails
);
