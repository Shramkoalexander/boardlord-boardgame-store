import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  selectItemsPerPage,
  selectVisiblePageCount,
  selectCurrentPage,
} from "../../redux/pagination/pagination.selectiors";
import { setItemsCount } from "../../redux/pagination/pagination.actions";
import { createStructuredSelector } from "reselect";

const withPagination = (WrappedComponent) => {
  const WithPaginationComponent = ({
    collection,
    currentPage,
    itemsPerPage,
    setItemsCount,
    ...otherProps
  }) => {
    const firstPageItem = (currentPage - 1) * itemsPerPage;
    const lastPageItem = currentPage * itemsPerPage;
    const paginatedCollection = collection.slice(firstPageItem, lastPageItem);

    useEffect(() => {
      setItemsCount(collection.length);
    }, [collection.length, setItemsCount]);

    return (
      <>
        <WrappedComponent collection={paginatedCollection} {...otherProps} />
      </>
    );
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithPaginationComponent);
};

const mapStateToProps = createStructuredSelector({
  itemsPerPage: selectItemsPerPage,
  visiblePagesCount: selectVisiblePageCount,
  currentPage: selectCurrentPage,
});

const mapDispatchToProps = (dispatch) => ({
  setItemsCount: (itemsCount) => dispatch(setItemsCount(itemsCount)),
});

export default withPagination;
