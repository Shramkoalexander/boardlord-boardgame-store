import React from "react";
import Range from "rc-slider/lib/Range";
import "../..//rc-slider.theme.scss";
import { connect } from "react-redux";
import {
  setDebouncedPriceValues,
  setPriceValues,
} from "../../redux/filter/filter.actions";
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
  console.log("in multirage");
  const [minPrice, maxPrice] = priceLimits;

  const needDisable = minPrice === maxPrice;
  const UNDEFINED_CHAR = "--";

  return (
    <>
      <div className="d-flex  justify-content-center py-1">
        <div className="w-25">
          {needDisable ? UNDEFINED_CHAR : priceValues[0]}
        </div>
        <div className="w-25">
          {needDisable ? UNDEFINED_CHAR : priceValues[1]}
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
      <div className="d-flex  justify-content-between py-1">
        <div>{needDisable ? UNDEFINED_CHAR : minPrice}</div>
        <div>{needDisable ? UNDEFINED_CHAR : maxPrice}</div>
      </div>
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
