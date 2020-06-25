import React, { useEffect } from "react";
import { sortCollectionsByType } from "./sorting.utils";
import { selectSortType } from "../../redux/sorting/sorting.selectors";
import { connect } from "react-redux";
import { setShowSorting } from "../../redux/sorting/sorting.actions";
import { createStructuredSelector } from "reselect";

const withSorting = (WrappedComponent) => {
  const WithSortingComponent = ({
    collection,
    sortType,
    setShowSorting,
    ...otherProps
  }) => {
    const sortedCollection = sortCollectionsByType(sortType, collection);

    useEffect(() => {
      setShowSorting(!!collection.length);
    }, [collection.length, setShowSorting]);

    return <WrappedComponent collection={sortedCollection} {...otherProps} />;
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithSortingComponent);
};

const mapStateToProps = createStructuredSelector({
  sortType: selectSortType,
});

const mapDispatchToProps = (dispatch) => ({
  setShowSorting: (showSorting) => dispatch(setShowSorting(showSorting)),
});

export default withSorting;
