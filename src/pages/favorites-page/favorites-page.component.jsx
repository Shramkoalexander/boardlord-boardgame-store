import React, { useEffect } from "react";
import styles from "./favorites-page.module.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectFavoriteItems,
  selectIsAnyFavorite,
} from "../../redux/favorites/favorites.selectors";
import CollectionList from "../../components/collection-list/collection-list.component";
import flowRight from "lodash.flowright";
import withPagination from "../../components/pagination/withPagination";
import Pagination from "../../components/pagination/pagination.component";
import withSorting from "../../components/sorting/withSorting";
import Sorting from "../../components/sorting/sorting.component";
import ReturnToShop from "../../components/return-to-shop/return-to-shop.component";
import { clearFavorites } from "../../redux/favorites/favorites.actions";
import { animateScroll as scroll } from "react-scroll";
import ButtonCustom from "../../components/button-custom/button-custom.component";
import { buttonStyleTypes } from "../../components/button-custom/button-custom.utils";
import SectionTitle from "../../components/section-title/section-title.component";
import EmptyBlock from "../../components/empty-block/empty-block.component";

function FavoritesPage({ collection, clearFavorites, isAnyFavorite }) {
  useEffect(() => {
    if (!isAnyFavorite)
      scroll.scrollToTop({
        duration: 0,
      });
  }, [isAnyFavorite]);

  return (
    <div className="mt-4 mt-lg-4 mb-5">
      <div className="container">
        <div className="mb-3 mb-md-4">
          <ReturnToShop />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <SectionTitle />
        </div>

        {isAnyFavorite ? (
          <>
            <Sorting />
            <div className="mb-2">
              <CollectionList collection={collection} />
              <Pagination />
            </div>

            {isAnyFavorite ? (
              <div className={styles.bottomSection}>
                <ButtonCustom
                  styleType={buttonStyleTypes.DANGER}
                  onClick={clearFavorites}
                >
                  Очистить избранное
                </ButtonCustom>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <EmptyBlock>Ваш список пуст</EmptyBlock>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  collection: selectFavoriteItems,
  isAnyFavorite: selectIsAnyFavorite,
});

const mapDispatchToProps = (dispatch) => ({
  clearFavorites: () => dispatch(clearFavorites()),
});

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  withPagination,
  withSorting,
])(FavoritesPage);
