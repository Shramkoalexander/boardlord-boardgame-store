import React, { useEffect, useCallback } from "react";
import {
  filterInStock,
  filterGameTime,
  filterPlayersCount,
  filterPrice,
} from "./filter.utils";
import { connect } from "react-redux";
import intersectionBy from "lodash.intersectionby";
import {
  selectGameTime,
  selectIsInStock,
  selectPlayersCount,
  selectDebouncedPriceValues,
  selectNeedResetPriceLimits,
  selectShowFilter,
} from "../../redux/filter/filter.selectors";
import {
  resetPriceLimits,
  setShowFilter,
  setItemsFound,
} from "../../redux/filter/filter.actions";
import { getDiscountedPriceIfExist } from "../../redux/shop/shop.utils";
import { createStructuredSelector } from "reselect";

const withFilter = (WrappedComponent) => {
  const WithFilterComponent = ({
    collection,
    isInStock,
    gameTime,
    playersCount,
    needResetPriceLimits,
    debouncedPriceValues,
    resetPriceLimits,
    resetFilter,
    showFilter,
    setShowFilter,
    setItemsFound,
    ...otherProps
  }) => {
    const applyFilter = useCallback(() => {
      let filteredCollection;
      filteredCollection = intersectionBy(
        filterInStock(collection, isInStock),
        filterGameTime(collection, gameTime),
        filterPlayersCount(collection, playersCount),
        "id"
      );

      if (!needResetPriceLimits) {
        filteredCollection = intersectionBy(
          filterPrice(collection, debouncedPriceValues),
          filteredCollection,
          "id"
        );
      }
      return filteredCollection;
    }, [
      collection,
      debouncedPriceValues,
      gameTime,
      isInStock,
      needResetPriceLimits,
      playersCount,
    ]);

    const filteredCollection = showFilter ? applyFilter() : collection;
    useEffect(() => {
      if (needResetPriceLimits) {
        let newMin;
        let newMax;

        if (filteredCollection.length > 0) {
          newMin = Math.min(
            ...filteredCollection.map((item) => getDiscountedPriceIfExist(item))
          );

          newMax = Math.max(
            ...filteredCollection.map((item) => getDiscountedPriceIfExist(item))
          );
        } else {
          newMin = 0;
          newMax = 0;
        }

        resetPriceLimits([newMin, newMax]);
      }
    }, [filteredCollection, needResetPriceLimits, resetPriceLimits]);

    useEffect(() => {
      setShowFilter(!!collection.length);
    }, [collection.length, setShowFilter]);

    useEffect(() => {
      setItemsFound(filteredCollection.length);
    });

    return (
      <WrappedComponent
        collection={filteredCollection}
        showFilter={showFilter}
        {...otherProps}
      />
    );
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithFilterComponent);
};

const mapStateToProps = createStructuredSelector({
  gameTime: selectGameTime,
  isInStock: selectIsInStock,
  playersCount: selectPlayersCount,
  debouncedPriceValues: selectDebouncedPriceValues,
  needResetPriceLimits: selectNeedResetPriceLimits,
  showFilter: selectShowFilter,
});

const mapDispatchToProps = (dispatch) => ({
  resetPriceLimits: (newPriceLimits) =>
    dispatch(resetPriceLimits(newPriceLimits)),
  setShowFilter: (showFilter) => dispatch(setShowFilter(showFilter)),
  setItemsFound: (itemsFound) => dispatch(setItemsFound(itemsFound)),
});

export default withFilter;
