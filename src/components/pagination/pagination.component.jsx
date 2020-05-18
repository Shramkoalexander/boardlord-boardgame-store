import React from "react";

function Pagination({
  itemsCount,
  itemsPerPage,
  visiblePagesCount,
  currentPage,
  onPageChanged,
}) {
  // console.log("itemsCount", itemsCount);

  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  const haveInvisiblePages = pagesCount > visiblePagesCount;

  let firstVisiblePage = 1;
  let lastVisiblePage = pagesCount;
  let items = [];

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

  for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
    items.push([
      <button
        className={`px-3 ${currentPage === i ? "bg-dark text-light" : ""}`}
        key={i}
        onClick={() => {
          onPageChanged(i);
        }}
      >
        {i}
      </button>,
    ]);
  }

  return (
    <div
      className={pagesCount > 1 ? `d-flex justify-content-center` : `d-none`}
    >
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
      {items}
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
  );
}

export default Pagination;
