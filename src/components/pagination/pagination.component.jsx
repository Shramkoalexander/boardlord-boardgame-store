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
import styles from "./pagination.module.scss";
import { animateScroll as scroll } from "react-scroll";

function Pagination({
  itemsPerPage,
  visiblePagesCount,
  currentPage,
  setCurrentPage,
  itemsCount,
}) {
  const onPageChanged = (pageNumber) => {
    setCurrentPage(pageNumber);
    scroll.scrollToTop({
      duration: 0,
    });
  };

  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  const hasInvisiblePages = pagesCount > visiblePagesCount;

  let firstVisiblePage = 1;
  let lastVisiblePage = pagesCount;

  if (hasInvisiblePages) {
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
      <div className={styles.btnContainer}>
        <button
          className={`${styles.nonCountBtn} ${
            hasInvisiblePages ? "" : "d-none"
          }`}
          onClick={() => {
            onPageChanged(1);
          }}
        >
          <span className="material-icons">first_page</span>
        </button>

        <button
          onClick={() => {
            if (currentPage - 1 > 0) {
              onPageChanged(currentPage - 1);
            }
          }}
          className={styles.nonCountBtn}
        >
          <span className="material-icons">chevron_left</span>
        </button>
        {range(firstVisiblePage, lastVisiblePage + 1).map((pageNumber) => (
          <button
            className={`${styles.pageBtn} ${
              currentPage === pageNumber ? styles.pageBtnActive : ""
            }`}
            key={pageNumber}
            onClick={() => {
              onPageChanged(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => {
            if (currentPage + 1 <= pagesCount) {
              onPageChanged(currentPage + 1);
            }
          }}
          className={styles.nonCountBtn}
        >
          <span className="material-icons">chevron_right</span>
        </button>

        <button
          className={`${styles.nonCountBtn} ${
            hasInvisiblePages ? "" : "d-none"
          }`}
          onClick={() => {
            onPageChanged(pagesCount);
          }}
        >
          <span className="material-icons">last_page</span>
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
