import React from "react";
import Range from "rc-slider/lib/Range";
import "../..//rc-slider.theme.scss";

function MultipleRange({
  min,
  max,
  priceValues,
  step,
  handlePriceChange,
  handleDebouncedPriceChange,
}) {
  // console.log("===========================================");
  // console.log("in multirage");

  const needDisable = min === -1 || max === -1 || min === max;
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
          min={min}
          max={max}
          step={step ? step : "1"}
          onChange={(values) => {
            handlePriceChange(values);
          }}
          onAfterChange={(values) => {
            handleDebouncedPriceChange(values);
          }}
        />
      )}
      <div className="d-flex  justify-content-between py-1">
        <div>{needDisable ? UNDEFINED_CHAR : min}</div>
        <div>{needDisable ? UNDEFINED_CHAR : max}</div>
      </div>
    </>
  );
}

export default MultipleRange;
