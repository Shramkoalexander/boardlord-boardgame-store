import React, { useRef, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import EscapeOutside from "../escape-outside/escape-outside.component";
import classes from "./seatch.module.scss";
import { findCollectionItems } from "./search.utils";
import { connect } from "react-redux";
import {
  selectIsSearchFieldVisible,
  selectCurrenListItemIndex,
  selectSearchInput,
} from "../../redux/search/search.selectors";
import {
  hideSearchField,
  setCurrentListItemIndex,
  increaseCurrentListItemIndex,
  decreaseCurrentListItemIndex,
  setSearchInput,
} from "../../redux/search/search.actions";
import { selectCollection } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";

function Search({
  collection,
  isSearchFieldVisible,
  hideSearchField,
  currenListItemIndex,
  setCurrentListItemIndex,
  increaseCurrentListItemIndex,
  decreaseCurrentListItemIndex,
  setSearchInput,
  searchInput,
}) {
  const history = useHistory();

  const searchFieldElement = useRef();

  const foundCollection =
    searchInput.length > 1 ? findCollectionItems(collection, searchInput) : [];

  const getTitleForList = (title) => {
    const search = searchInput.toLowerCase().trim();
    const foundIndex = title.toLowerCase().indexOf(search);
    const titleFirstPart = title.slice(0, foundIndex);
    const titleFoundPart = title.slice(foundIndex, foundIndex + search.length);
    const titleLastPart = title.slice(foundIndex + search.length);

    return (
      <>
        {titleFirstPart}
        <span style={{ fontWeight: "bold" }}>{titleFoundPart}</span>
        {titleLastPart}
      </>
    );
  };

  const handleSearchFieldChangeDebounced = debounce((value) => {
    setSearchInput(value);
  }, 200);

  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    if (searchFieldElement.current) searchFieldElement.current.value = "";
  }, [setSearchInput]);

  const handleSearch = () => {
    if (foundCollection[currenListItemIndex]) {
      history.push(
        `/shop/product-details/${foundCollection[currenListItemIndex].alias}`
      );
    } else {
      searchInput.trim() &&
        history.push(`/shop/search/?q=${searchInput.trim().toLowerCase()}`);
    }
  };

  useEffect(() => {
    !isSearchFieldVisible
      ? handleClearSearch()
      : searchFieldElement.current.focus();
  }, [handleClearSearch, isSearchFieldVisible]);

  useEffect(() => {
    if (foundCollection[currenListItemIndex] && isSearchFieldVisible)
      searchFieldElement.current.value = foundCollection[
        currenListItemIndex
      ].title.toLowerCase();
  }, [currenListItemIndex, foundCollection, isSearchFieldVisible]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      hideSearchField();
    });
    return () => {
      unlisten((prevState) => {
        return !prevState;
      });
    };
  }, [hideSearchField, history]);

  return (
    isSearchFieldVisible && (
      <EscapeOutside onEscapeOutside={hideSearchField}>
        <div
          className={`container-lg position-absolute ${
            isSearchFieldVisible ? "visible" : "invisible"
          }`}
          style={{
            left: "0",
            right: "0",
            zIndex: "10",
          }}
        >
          <div className="row">
            <div
              className="d-flex"
              style={{
                backgroundColor: "#eee",
                width: "100%",
                padding: "0.3rem",
              }}
            >
              <div style={{ position: "relative", flex: "1 0 auto" }}>
                <input
                  ref={searchFieldElement}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    switch (e.keyCode) {
                      case 40: // DOWN arrow
                        if (foundCollection.length > 0) {
                          e.preventDefault();
                          if (
                            currenListItemIndex <
                            foundCollection.length - 1
                          ) {
                            increaseCurrentListItemIndex();
                          } else {
                            setCurrentListItemIndex(0);
                          }
                        }
                        break;
                      case 38: // UP arrow
                        if (foundCollection.length > 0) {
                          e.preventDefault();
                          if (currenListItemIndex > 0) {
                            decreaseCurrentListItemIndex();
                          } else {
                            setCurrentListItemIndex(foundCollection.length - 1);
                          }
                        }
                        break;
                      case 13: // Enter key
                        handleSearch();
                        break;
                      default:
                        break;
                    }
                  }}
                  onChange={(e) => {
                    e.persist();
                    handleSearchFieldChangeDebounced(e.target.value);
                  }}
                  type="search"
                  name="search-field"
                  id="search-field"
                  placeholder="Найти игру..."
                  className={classes.searchField}
                />
                <button
                  className={classes.clearButton}
                  onClick={(e) => {
                    handleClearSearch(e);
                    searchFieldElement.current.focus();
                  }}
                ></button>
                <div
                  className={
                    foundCollection.length > 0 && isSearchFieldVisible
                      ? "visible"
                      : "invisible"
                  }
                  style={{
                    maxHeight: "20rem",
                    border: "1px solid black",
                    backgroundColor: "white",
                    overflow: "auto",
                    position: "absolute",
                    marginTop: "5px",
                    left: "0",
                    right: "20px",
                  }}
                >
                  {foundCollection.map((item, index) => (
                    <Link
                      style={{ backgroundColor: "yellow" }}
                      key={`foundItem-${item.id}`}
                      to={`/shop/product-details/${item.alias}`}
                    >
                      <div
                        id={`foundItemTest-${index}`}
                        onMouseEnter={() => setCurrentListItemIndex(index)}
                        className={
                          index === currenListItemIndex ? "bg-dark" : ""
                        }
                      >
                        {getTitleForList(item.title)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <button onClick={handleSearch}>Find</button>
            </div>
          </div>
        </div>
      </EscapeOutside>
    )
  );
}

const mapStateToProps = createStructuredSelector({
  isSearchFieldVisible: selectIsSearchFieldVisible,
  collection: selectCollection,
  currenListItemIndex: selectCurrenListItemIndex,
  searchInput: selectSearchInput,
});

const mapDispatchToProps = (dispatch) => ({
  hideSearchField: () => dispatch(hideSearchField()),
  setCurrentListItemIndex: (listItemIndex) =>
    dispatch(setCurrentListItemIndex(listItemIndex)),
  increaseCurrentListItemIndex: () => dispatch(increaseCurrentListItemIndex()),
  decreaseCurrentListItemIndex: () => dispatch(decreaseCurrentListItemIndex()),
  setSearchInput: (searchInput) => dispatch(setSearchInput(searchInput)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
