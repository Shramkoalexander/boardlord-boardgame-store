import React, { useState, useRef } from "react";
import {
  filterInStock,
  filterGameTime,
  filterPlayersCount,
  filterPrice,
  filterValues,
} from "./filter.utils";

const withFilter = (WrappedComponent) => ({ collection, ...otherProps }) => {
  const [initialFIlterState] = useState({
    debouncedPriceValues: [-1, -1],
    priceValues: [-1, -1],
    gameTime: filterValues.gameTime.undef,
    playersCount: filterValues.playersCount.all,
    isInStock: true,
  });

  const needReset = useRef(true);
  const [debouncedPriceValues, setDebouncedPriceValues] = useState(
    initialFIlterState.debouncedPriceValues
  );
  const [priceValues, setPriceValues] = useState(
    initialFIlterState.priceValues
  );
  const [gameTime, setGameTime] = useState(initialFIlterState.gameTime);
  const [playersCount, setPlayersCount] = useState(
    initialFIlterState.playersCount
  );
  const [isInStock, setIsInStock] = useState(initialFIlterState.isInStock);

  const minPrice = useRef(-1);
  const maxPrice = useRef(-1);

  const handleDebouncedPriceChange = (priceValues) => {
    setDebouncedPriceValues(priceValues);
  };
  const handlePriceChange = (priceValues) => {
    setPriceValues(priceValues);
  };
  const handlegameTimeChange = (gameTime) => {
    setGameTime(gameTime);
  };
  const handlePlayersCountChange = (playersCount) => {
    setPlayersCount(playersCount);
  };
  const handleInStockChange = (isInStock) => {
    setIsInStock(isInStock);
  };

  const applyFilter = (
    collection,
    debouncedPriceValues,
    gameTime,
    playersCount,
    isInStock
  ) => {
    let filteredCollection;

    filteredCollection = filterInStock(collection, isInStock);
    filteredCollection = filterGameTime(filteredCollection, gameTime);
    filteredCollection = filterPlayersCount(filteredCollection, playersCount);

    // console.log("apply filter");

    if (filteredCollection.length > 0) {
      const newMin = Math.min(
        ...filteredCollection.map((item) =>
          item.discount_pirce ? item.discount_pirce : item.price
        )
      );

      const newMax = Math.max(
        ...filteredCollection.map((item) =>
          item.discount_pirce ? item.discount_pirce : item.price
        )
      );

      if (
        needReset.current ||
        minPrice.current !== newMin ||
        maxPrice.current !== newMax
      ) {
        setDebouncedPriceValues([newMin, newMax]);
        setPriceValues([newMin, newMax]);

        minPrice.current = newMin;
        maxPrice.current = newMax;
        needReset.current = false;
      }
    } else {
      minPrice.current = -1;
      maxPrice.current = -1;
    }

    filteredCollection = filterPrice(filteredCollection, debouncedPriceValues);

    return filteredCollection;
  };

  const filteredCollection = applyFilter(
    collection,
    debouncedPriceValues,
    gameTime,
    playersCount,
    isInStock
  );

  const handleFilterReset = (initialFIlterState) => {
    setDebouncedPriceValues(initialFIlterState.debouncedPriceValues);
    setPriceValues(initialFIlterState.priceValues);
    setGameTime(initialFIlterState.gameTime);
    setPlayersCount(initialFIlterState.playersCount);
    setIsInStock(initialFIlterState.isInStock);

    needReset.current = true;
  };

  //   console.log("filteredCollection ", filteredCollection);

  return (
    <>
      <WrappedComponent
        collection={filteredCollection}
        filter={{
          gameTime,
          isInStock,
          playersCount,
          handlegameTimeChange,
          handlePlayersCountChange,
          handleInStockChange,
          minPrice: minPrice.current,
          maxPrice: maxPrice.current,
          priceValues,
          handlePriceChange,
          handleDebouncedPriceChange,
          initialFIlterState,
          handleFilterReset,
          itemsFound: filteredCollection.length,
        }}
        {...otherProps}
      />
    </>
  );
};

export default withFilter;
