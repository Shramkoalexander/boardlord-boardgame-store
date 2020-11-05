import React from "react";
import Range from "rc-slider/lib/Range";
import "./rc-slider.theme.scss";
import { connect } from "react-redux";
import {
  setDebouncedPriceValues,
  setPriceValues,
} from "../../redux/filter/filter.actions";
import styles from "./multiple-range.module.scss";
import {
  selectPriceValues,
  selectPriceLimits,
} from "../../redux/filter/filter.selectors";
import { createStructuredSelector } from "reselect";

function MultipleRange({
  priceValues,
  priceLimits,
  step,
  setPriceValues,
  setDebouncedPriceValues,
}) {
  const [minPrice, maxPrice] = priceLimits;

  const needDisable = minPrice === maxPrice;
  const UNDEFINED_CHAR = "--";

  return (
    <>
      <div className={styles.priceContainer}>
        <div className={styles.minPrice}>
          {needDisable
            ? UNDEFINED_CHAR
            : new Intl.NumberFormat("ru-RU").format(priceValues[0])}
        </div>
        <span className={styles.priceDivider}>-</span>
        <div className={styles.maxPrice}>
          {needDisable
            ? UNDEFINED_CHAR
            : new Intl.NumberFormat("ru-RU").format(priceValues[1])}
        </div>
      </div>
      {needDisable ? (
        <Range value={[0, 1]} min={0} max={1} disabled />
      ) : (
        <Range
          allowCross={false}
          value={priceValues}
          min={minPrice}
          max={maxPrice}
          step={step ? step : "1"}
          onChange={(newPrices) => {
            setPriceValues(newPrices);
          }}
          onAfterChange={(newPrices) => {
            setDebouncedPriceValues(newPrices);
          }}
        />
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  priceValues: selectPriceValues,
  priceLimits: selectPriceLimits,
});

const mapDispatchToProps = (dispatch) => ({
  setPriceValues: (newPrices) => dispatch(setPriceValues(newPrices)),
  setDebouncedPriceValues: (newPrices) =>
    dispatch(setDebouncedPriceValues(newPrices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MultipleRange);
