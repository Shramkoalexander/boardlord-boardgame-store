import React, { useEffect } from "react";
import styles from "./header.module.scss";
import Logo from "../logo/logo.component";
import { Link, NavLink, useHistory, useRouteMatch } from "react-router-dom";
import Search from "../search/search.component";
import { connect } from "react-redux";
import {
  showSearchDropdown,
  showSearchModal,
  hideSearchModal,
} from "../../redux/search/search.actions";
import { createStructuredSelector } from "reselect";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {
  toggleCartDropdownVisibility,
  hideCartDropdown,
} from "../../redux/cart/cart.actions";

import FixedHeaderWrapper from "../fixed-header-wrapper/fixed-header-wrapper.component";
import { toggleShowSidebarMenu } from "../../redux/sidebar-menu/sidebar-menu.actions";
import SidebarMenu from "../sidebar-menu/sidebar-menu.component";
import uniqid from "uniqid";
import {
  selectIsSearchModalVisible,
  selectSearchQuery,
} from "../../redux/search/search.selectors";
import { breakpointsDown } from "../breakpoints-provider/breakpoints-provider.utils";
import {
  selectCurrentViewportAlias,
  selectBreakpoints,
} from "../../redux/breakpoints-provider/breakpoints-provider.selectors";
import { selectIsAnyFavorite } from "../../redux/favorites/favorites.selectors";
import { useRef } from "react";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import UserDropdown from "../user-dropdown/user-dropdown.component";
import {
  toggleUserDropdownVisibility,
  hideUserDropdown,
} from "../../redux/user/user.actions";
import { logoTypes } from "../logo/logo.utils";
import { selectMainMenuDirectory } from "../../redux/directories/directories.selectors";

function Header({
  toggleCartDropdownVisibility,
  toggleUserDropdownVisibility,
  toggleShowSidebarMenu,
  cartItemsCount,
  mainMenuDirectory,
  showSearchModal,
  hideSearchModal,
  isSearchModalVisible,
  currentViewportAlias,
  breakpoints,
  searchQuery,
  hideCartDropdown,
  hideUserDropdown,
  isAnyFavorite,
  currentUser,
}) {
  const cartIconNode = useRef();
  const userIconNode = useRef();

  const history = useHistory();

  const matchCartRoute = useRouteMatch("/cart");

  const isBreakpointSmallOrSmaller = breakpointsDown(
    breakpoints,
    breakpoints.sm,
    currentViewportAlias
  );

  useEffect(() => {
    !currentUser && hideUserDropdown();
  }, [currentUser, hideUserDropdown]);

  useEffect(() => {
    if (isBreakpointSmallOrSmaller) {
      searchQuery && showSearchModal();
    } else {
      hideSearchModal();
    }
  }, [
    hideSearchModal,
    isBreakpointSmallOrSmaller,
    searchQuery,
    showSearchModal,
  ]);

  useEffect(() => {
    if (isBreakpointSmallOrSmaller) {
      hideCartDropdown();
    }
  }, [
    breakpoints,
    currentViewportAlias,
    hideCartDropdown,
    isBreakpointSmallOrSmaller,
  ]);

  return (
    <>
      <FixedHeaderWrapper>
        <div className={`container-lg d-sm-none ${styles.extraSection}`}>
          <div className="d-flex justify-content-center py-2">
            <Link to="/">
              <Logo size={logoTypes.SMALL} />
            </Link>
          </div>
        </div>
        <div className={styles.topSection}>
          <div className="container-lg">
            <div className="row align-items-center ">
              <div className="col-auto d-lg-none ">
                <button onClick={toggleShowSidebarMenu} className={styles.icon}>
                  <span className={`material-icons  ${styles.fontIcon}`}>
                    menu
                  </span>
                </button>
              </div>
              <div className="col-auto d-none d-sm-block">
                <Link to="/">
                  <Logo />
                </Link>
              </div>
              <div className="col-auto flex-md-grow-1 align-items-center d-none d-md-block">
                {!isSearchModalVisible && <Search />}
              </div>

              <div className="col-auto d-flex mx-n2 flex-md-grow-0 flex-grow-1 justify-content-end">
                <div className={`${styles.iconContainer} d-md-none`}>
                  <button onClick={showSearchModal} className={styles.icon}>
                    <img
                      src={require("../../assets/images/search-icon--light.svg")}
                      height="100%"
                      className={`${styles.searchIcon}`}
                      alt="search-icon"
                    />
                  </button>
                </div>
                <div className={styles.iconContainer}>
                  <div className={styles.icon}>
                    <Link to="/favorites">
                      <span
                        className={`material-icons ${styles.fontIcon} ${styles.favoriteIcon}`}
                      >
                        {isAnyFavorite ? "favorite" : "favorite_border"}
                      </span>
                    </Link>
                  </div>
                </div>
                <div className={styles.iconContainer}>
                  <div className={styles.icon} ref={userIconNode}>
                    {currentUser ? (
                      <>
                        <button onClick={toggleUserDropdownVisibility}>
                          <span className={`material-icons ${styles.fontIcon}`}>
                            person
                          </span>
                        </button>
                      </>
                    ) : (
                      <Link to="/sign-in">
                        <span
                          className={`material-icons ${styles.fontIcon} ${styles.loginIcon}`}
                        >
                          login
                        </span>
                      </Link>
                    )}
                  </div>

                  <UserDropdown toggleNode={userIconNode.current} />
                </div>
                <div className={styles.iconContainer}>
                  <div
                    className={`${styles.cart} ${styles.icon}`}
                    ref={cartIconNode}
                  >
                    <button
                      onClick={
                        isBreakpointSmallOrSmaller || matchCartRoute
                          ? () => {
                              history.push("/cart");
                            }
                          : toggleCartDropdownVisibility
                      }
                    >
                      <span className={`material-icons ${styles.fontIcon}`}>
                        shopping_cart
                      </span>
                      {!!cartItemsCount && (
                        <span className={styles.itemCount}>
                          {cartItemsCount}
                        </span>
                      )}
                    </button>
                  </div>

                  <CartDropdown toggleNode={cartIconNode.current} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`d-none d-lg-block ${styles.bottomSection}`}>
          <div className="container-lg">
            <div className="d-flex align-items-center justify-content-center position-relative">
              <ul className={`${styles.navList} d-flex`}>
                {mainMenuDirectory.map(({ path, title }) => (
                  <li key={uniqid()}>
                    <NavLink
                      to={`/${path}`}
                      className={styles.navLink}
                      activeClassName={styles.navLinkActive}
                    >
                      {title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FixedHeaderWrapper>

      <SidebarMenu />
      {isSearchModalVisible && <Search modal={true} />}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItemsCount: selectCartItemsCount,
  mainMenuDirectory: selectMainMenuDirectory,
  isSearchModalVisible: selectIsSearchModalVisible,
  currentViewportAlias: selectCurrentViewportAlias,
  breakpoints: selectBreakpoints,
  searchQuery: selectSearchQuery,
  isAnyFavorite: selectIsAnyFavorite,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartDropdownVisibility: () => dispatch(toggleCartDropdownVisibility()),
  toggleUserDropdownVisibility: () => dispatch(toggleUserDropdownVisibility()),
  toggleShowSidebarMenu: () => dispatch(toggleShowSidebarMenu()),
  showSearchDropdown: () => dispatch(showSearchDropdown()),
  showSearchModal: () => dispatch(showSearchModal()),
  hideSearchModal: () => dispatch(hideSearchModal()),
  hideCartDropdown: () => dispatch(hideCartDropdown()),
  hideUserDropdown: () => dispatch(hideUserDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
