import React, { useEffect } from "react";
import { sortTypeValues } from "./sorting.utils";
import { connect } from "react-redux";
import {
  selectSortType,
  selectShowSorting,
} from "../../redux/sorting/sorting.selectors";
import { setSortType } from "../../redux/sorting/sorting.actions";
import { useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";

function Sorting({ showSorting, setSortType, sortType }) {
  const {
    POPULAR,
    NAME_ASC,
    NAME_DESC,
    PRICE_ASC,
    PRICE_DESC,
  } = sortTypeValues;

  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      setSortType(POPULAR);
    });

    return () => {
      unlisten();
    };
  }, [POPULAR, history, setSortType]);

  return (
    <div className={` ${showSorting ? "visible" : "invisible"}`}>
      <label htmlFor="sort">Сортировать по </label>
      <select
        name="sort"
        id="sort"
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
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

const mapStateToProps = createStructuredSelector({
  sortType: selectSortType,
  showSorting: selectShowSorting,
});

const mapDispatchToProps = (dispatch) => ({
  setSortType: (sortType) => dispatch(setSortType(sortType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
