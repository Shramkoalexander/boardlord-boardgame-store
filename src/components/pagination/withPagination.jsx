import React, { useState, useEffect } from "react";
import Pagination from "./pagination.component";

const withPaginator = (WrappedComponent) => ({ collection, ...otherProps }) => {
  const [itemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePagesCount] = useState(5);

  const firstPageItem = (currentPage - 1) * itemsPerPage;
  const lastPageItem = currentPage * itemsPerPage;
  const slicedCollection = collection.slice(firstPageItem, lastPageItem);

  const onPageChanged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [collection]);

  return (
    <>
      <WrappedComponent collection={slicedCollection} {...otherProps} />
      <Pagination
        itemsCount={collection.length}
        itemsPerPage={itemsPerPage}
        visiblePagesCount={visiblePagesCount}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
    </>
  );
};

export default withPaginator;
