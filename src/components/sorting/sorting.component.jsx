import React from "react";
import { sortTypeValues } from "./sorting.utils";
import { connect } from "react-redux";
import { selectItemsToSortCount } from "../../redux/sorting/sorting.selectors";
import { setSortType } from "../../redux/sorting/sorting.actions";
import { createStructuredSelector } from "reselect";
import styles from "./sorting.module.scss";
import OptionSelector from "../option-selector/option-selector.component";

function Sorting({ setSortType, itemsToSortCount }) {
  const {
    POPULAR,
    NAME_ASC,
    NAME_DESC,
    PRICE_ASC,
    PRICE_DESC,
  } = sortTypeValues;

  return (
    itemsToSortCount > 0 && (
      <div className={styles.container}>
        <span className={styles.title}>Сортировать по:</span>
        <OptionSelector
          options={[
            { value: POPULAR, text: "Популярности" },
            { value: PRICE_DESC, text: "Цене \u2193" },
            { value: PRICE_ASC, text: "Цене \u2191" },
            { value: NAME_DESC, text: "Названию \u2193" },
            { value: NAME_ASC, text: "Названию \u2191" },
          ]}
          onChange={(value) => setSortType(value)}
          disabled={itemsToSortCount <= 1}
        />
      </div>
    )
  );
}

const mapStateToProps = createStructuredSelector({
  itemsToSortCount: selectItemsToSortCount,
});

const mapDispatchToProps = (dispatch) => ({
  setSortType: (sortType) => dispatch(setSortType(sortType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
