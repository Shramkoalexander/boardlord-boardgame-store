import React from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../redux/pagination/pagination.actions";
import {
  selectItemsPerPage,
  selectVisiblePageCount,
  selectCurrentPage,
  selectItemsCount,
} from "../../redux/pagination/pagination.selectiors";
import range from "lodash.range";
import { createStructuredSelector } from "reselect";

function Pagination({
  itemsPerPage,
  visiblePagesCount,
  currentPage,
  setCurrentPage,
  itemsCount,
}) {
  const onPageChanged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  const haveInvisiblePages = pagesCount > visiblePagesCount;

  let firstVisiblePage = 1;
  let lastVisiblePage = pagesCount;

  if (haveInvisiblePages) {
    if (
      currentPage >= Math.ceil(visiblePagesCount / 2) &&
      currentPage <= pagesCount - Math.floor(visiblePagesCount / 2)
    ) {
      firstVisiblePage = currentPage - Math.floor(visiblePagesCount / 2);
    } else if (currentPage < Math.ceil(visiblePagesCount / 2)) {
      firstVisiblePage = 1;
    } else if (currentPage > pagesCount - Math.floor(visiblePagesCount / 2)) {
      firstVisiblePage = pagesCount - (visiblePagesCount - 1);
    }
    lastVisiblePage = firstVisiblePage + visiblePagesCount - 1;
  }

  return (
    pagesCount > 1 && (
      <div className="d-flex justify-content-center">
        <button
          className={haveInvisiblePages ? "" : "d-none"}
          onClick={() => {
            onPageChanged(1);
          }}
        >
          start
        </button>

        <button
          onClick={() => {
            if (currentPage - 1 > 0) {
              onPageChanged(currentPage - 1);
            }
          }}
        >
          prev
        </button>
        {range(firstVisiblePage, lastVisiblePage + 1).map((index) => (
          <button
            className={`px-3 ${
              currentPage === index ? "bg-dark text-light" : ""
            }`}
            key={index}
            onClick={() => {
              onPageChanged(index);
            }}
          >
            {index}
          </button>
        ))}
        <button
          onClick={() => {
            if (currentPage + 1 <= pagesCount) {
              onPageChanged(currentPage + 1);
            }
          }}
        >
          next
        </button>

        <button
          className={haveInvisiblePages ? "" : "d-none"}
          onClick={() => {
            onPageChanged(pagesCount);
          }}
        >
          end
        </button>
      </div>
    )
  );
}

const mapStateToProps = createStructuredSelector({
  itemsPerPage: selectItemsPerPage,
  visiblePagesCount: selectVisiblePageCount,
  currentPage: selectCurrentPage,
  itemsCount: selectItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentPage: (pageNumber) => dispatch(setCurrentPage(pageNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
