import React, { useEffect } from "react";
import { sortCollectionsByType } from "./sorting.utils";
import { selectSortType } from "../../redux/sorting/sorting.selectors";
import { connect } from "react-redux";
import { setItemsToSortCount } from "../../redux/sorting/sorting.actions";
import { createStructuredSelector } from "reselect";

const withSorting = (WrappedComponent) => {
  const WithSortingComponent = ({
    collection,
    sortType,
    setItemsToSortCount,
    ...otherProps
  }) => {
    const sortedCollection = sortCollectionsByType(sortType, collection);

    useEffect(() => {
      setItemsToSortCount(collection.length);
    }, [collection.length, setItemsToSortCount]);

    return <WrappedComponent collection={sortedCollection} {...otherProps} />;
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithSortingComponent);
};

const mapStateToProps = createStructuredSelector({
  sortType: selectSortType,
});

const mapDispatchToProps = (dispatch) => ({
  setItemsToSortCount: (itemsToSortCount) =>
    dispatch(setItemsToSortCount(itemsToSortCount)),
});

export default withSorting;
