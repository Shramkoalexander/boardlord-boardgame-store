import React, { useRef, useEffect, useCallback, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import EscapeOutsideWrapper from "../escape-outside/escape-outside-wrapper.component";
import styles from "./search.module.scss";
import { findCollectionItems } from "./search.utils";
import { connect } from "react-redux";
import {
  selectCurrenListItemIndex,
  selectSearchQuery,
  selectIsSearchDropdownVisible,
} from "../../redux/search/search.selectors";
import {
  setCurrentListItemIndex,
  increaseCurrentListItemIndex,
  decreaseCurrentListItemIndex,
  resetCurrentListItemIndex,
  setSearchQuery,
  hideSearchDropdown,
  showSearchDropdown,
  showSearchModal,
  hideSearchModal,
} from "../../redux/search/search.actions";
import { selectCollection } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";
import {
  selectBreakpoints,
  selectCurrentViewportAlias,
} from "../../redux/breakpoints-provider/breakpoints-provider.selectors";
import useHistoryChange from "../../custom-hooks/useHistoryChange";

function Search({
  collection,
  isSearchDropdownVisible,
  currenListItemIndex,
  setCurrentListItemIndex,
  increaseCurrentListItemIndex,
  decreaseCurrentListItemIndex,
  resetCurrentListItemIndex,
  setSearchQuery,
  searchQuery,
  hideSearchDropdown,
  showSearchDropdown,
  hideSearchModal,
  modal = false,
}) {
  const history = useHistory();

  const [searchFieldInput, setSearchFieldInput] = useState(searchQuery);
  const searchFieldElement = useRef();

  const [foundCollection, setFoundCollection] = useState([]);

  useEffect(() => {
    setFoundCollection(
      searchQuery.length > 1 ? findCollectionItems(collection, searchQuery) : []
    );
  }, [collection, searchQuery]);

  const getTitleForList = (title) => {
    const search = searchQuery.toLowerCase().trim();
    const foundIndex = title.toLowerCase().indexOf(search);
    const titleFirstPart = title.slice(0, foundIndex);
    const titleFoundPart = title.slice(foundIndex, foundIndex + search.length);
    const titleLastPart = title.slice(foundIndex + search.length);

    return (
      <>
        {titleFirstPart}
        <span className={styles.dropdownMatch}>{titleFoundPart}</span>
        {titleLastPart}
      </>
    );
  };

  const handleSearchFieldChangeDebounced = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 200),
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchFieldInput("");
    setSearchQuery("");
  }, [setSearchQuery]);

  const handleSearch = () => {
    if (foundCollection[currenListItemIndex]) {
      history.push(
        `/shop/product-details/${foundCollection[currenListItemIndex].alias}`
      );
    } else {
      searchQuery.trim()
        ? history.push(`/shop/search/?q=${searchQuery.trim().toLowerCase()}`)
        : searchFieldElement.current.focus();
    }
  };

  useEffect(() => {
    foundCollection.length > 0 && showSearchDropdown();
  }, [foundCollection.length, searchQuery, showSearchDropdown]); // searchQuery dependency is important

  useEffect(() => {
    !searchQuery && hideSearchDropdown();
  }, [hideSearchDropdown, searchQuery]);

  useHistoryChange(() => {
    handleClearSearch();
    modal && hideSearchModal();
  });

  useEffect(() => {
    modal && searchFieldElement.current.focus();
  }, [modal]);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "visible";
  }, [modal]);

  useEffect(() => {
    handleSearchFieldChangeDebounced(searchFieldInput);
  }, [handleSearchFieldChangeDebounced, searchFieldInput]);

  return (
    <EscapeOutsideWrapper
      onEscapeOutside={hideSearchDropdown}
      isNodeToEscapeVisible={isSearchDropdownVisible}
    >
      <div
        className={`${styles.container} 
        ${modal ? styles.container_fixed : "d-none d-md-block"}`}
      >
        {modal && (
          <button
            className={styles.closeModalBtn}
            onClick={() => {
              handleClearSearch();
              hideSearchModal();
            }}
          >
            <span className={`material-icons ${styles.closeModalIcon}`}>
              clear
            </span>
          </button>
        )}
        <div style={{ position: "relative" }}>
          <div className={styles.searchFieldContainer}>
            <input
              ref={searchFieldElement}
              autoComplete="off"
              onBlur={() => {
                resetCurrentListItemIndex();
              }}
              onKeyDown={(e) => {
                switch (e.keyCode) {
                  case 40: // DOWN arrow
                    if (foundCollection.length > 0) {
                      e.preventDefault();
                      if (currenListItemIndex < foundCollection.length - 1) {
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
                setSearchFieldInput(e.target.value);
              }}
              type="search"
              name="search-field"
              id="search-field"
              placeholder="Найти ..."
              className={styles.searchField}
              value={searchFieldInput}
              aria-label="поле поиска"
            />

            <div className={styles.buttonsWrapper}>
              <button
                className={`${styles.clearButton} ${
                  !searchFieldInput ? "invisible" : ""
                }`}
                onClick={() => {
                  handleClearSearch();
                  searchFieldElement.current.focus();
                }}
              >
                <span className={`material-icons ${styles.clearIcon}`}>
                  clear
                </span>
              </button>
              <button className={styles.searchButton} onClick={handleSearch}>
                <img
                  src={require("../../assets/images/search-icon.svg")}
                  height="100%"
                  className={styles.searchIcon}
                  alt="search-icon"
                />
              </button>
            </div>
          </div>
          <div
            className={`${styles.dropdown} ${
              isSearchDropdownVisible && foundCollection.length > 0
                ? ""
                : "invisible"
            }`}
          >
            {foundCollection.map((item, index) => (
              <Link
                key={`foundItem-${item.id}`}
                to={`/shop/product-details/${item.alias}`}
              >
                <div
                  id={`foundItemTest-${index}`}
                  onMouseEnter={() => setCurrentListItemIndex(index)}
                  onMouseLeave={() => resetCurrentListItemIndex()}
                  className={
                    index === currenListItemIndex
                      ? styles.dropdownListItem_active
                      : styles.dropdownListItem
                  }
                >
                  {getTitleForList(item.title)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </EscapeOutsideWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  currentViewportAlias: selectCurrentViewportAlias,
  breakpoints: selectBreakpoints,
  collection: selectCollection,
  currenListItemIndex: selectCurrenListItemIndex,
  searchQuery: selectSearchQuery,
  isSearchDropdownVisible: selectIsSearchDropdownVisible,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentListItemIndex: (listItemIndex) =>
    dispatch(setCurrentListItemIndex(listItemIndex)),
  increaseCurrentListItemIndex: () => dispatch(increaseCurrentListItemIndex()),
  decreaseCurrentListItemIndex: () => dispatch(decreaseCurrentListItemIndex()),
  resetCurrentListItemIndex: () => dispatch(resetCurrentListItemIndex()),
  setSearchQuery: (searchQuery) => dispatch(setSearchQuery(searchQuery)),
  hideSearchDropdown: () => dispatch(hideSearchDropdown()),
  showSearchDropdown: () => dispatch(showSearchDropdown()),
  hideSearchModal: () => dispatch(hideSearchModal()),
  showSearchModal: () => dispatch(showSearchModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
