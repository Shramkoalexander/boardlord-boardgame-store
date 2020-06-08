import React from "react";
import { sortTypeValues } from "./sorting.utils";

function Sorting({
  sorting: { collectionLength, handleSelectChange, sortType },
}) {
  const {
    POPULAR,
    NAME_ASC,
    NAME_DESC,
    PRICE_ASC,
    PRICE_DESC,
  } = sortTypeValues;
  return (
    <div className={collectionLength ? "" : "d-none"}>
      <label htmlFor="sort">Сортировать по </label>
      <select
        name="sort"
        id="sort"
        value={sortType}
        onChange={handleSelectChange}
      >
        <option value={POPULAR}>Популярности</option>
        <option value={PRICE_DESC}>Ценe &darr;</option>
        <option value={PRICE_ASC}>Ценe &uarr;</option>
        <option value={NAME_DESC}>Названию &darr;</option>
        <option value={NAME_ASC}>Названию &uarr;</option>
      </select>
    </div>
  );
}

export default Sorting;
