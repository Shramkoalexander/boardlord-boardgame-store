import React, { useEffect } from "react";
import styles from "./app.module.scss";
import CollectionPageContainer from "../../pages/collection-page/collection-page.container";
import CollectionPageCategoryContainer from "../../pages/collection-page/collection-page-category.container";
import CollectionPageSelectionContainer from "../../pages/collection-page/collection-page-selection.container";
import CollectionPageSearchContainer from "../../pages/collection-page/collection-page-search.container";
import Header from "../header/header.component";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductDetails from "../../pages/product-details/product-details.component";
import CartPage from "../../pages/cart-page/cart-page.component";
import ScrollToTop from "../scroll-to-top/scroll-to-top.component";
import Footer from "../footer/footer.component";
import { animateScroll as scroll } from "react-scroll";
import FavoritesPage from "../../pages/favorites-page/favorites-page.component";
import SignInPage from "../../pages/sign-in-page/sign-in-page.component";
import SignUpPage from "../../pages/sign-up-page/sign-up-page.component";
import { connect } from "react-redux";
import { selectIsCurrenUserAuthentificated } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { fetchAuthStateStart } from "../../redux/user/user.actions";
import { fetchCollectionStart } from "../../redux/shop/shop.actions";
import PageNotFound from "../../pages/page-not-found/page-not-found.component";
import useHistoryChange from "../../custom-hooks/useHistoryChange";

function App({
  isCurrenUserAuthentificated,
  fetchCollectionStart,
  fetchAuthStateStart,
}) {
  useEffect(() => {
    fetchCollectionStart();
  }, [fetchCollectionStart]);

  useEffect(() => {
    fetchAuthStateStart();
  }, [fetchAuthStateStart]);

  useHistoryChange(({ hash }) => {
    if (!hash) {
      scroll.scrollToTop({
        duration: 0,
      });
    }
  });

  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route
          exact
          path={["/", "/about", "/discounts", "/delivery", "/payment"]} // all main menu paths redirects to shop page intentionaly because this is not a real project
          render={() => <Redirect to="/shop" />}
        />
        <Route path="/shop">
          {({ match }) => (
            <Switch>
              <Route
                exact
                path={`${match.path}`}
                render={() => <Redirect to={`${match.path}/all-games`} />}
              />

              <Route
                exact
                path={`${match.path}/all-games`}
                component={CollectionPageContainer}
              />
              <Route
                exact
                path={`${match.path}/category/:categoryId`}
                component={CollectionPageCategoryContainer}
              />
              <Route
                exact
                path={`${match.path}/selection/:selectionId`}
                component={CollectionPageSelectionContainer}
              />
              <Route
                strict
                path={`${match.path}/search`}
                component={CollectionPageSearchContainer}
              />
              <Route
                path={`${match.path}/product-details/:productId`}
                component={ProductDetails}
              />
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          )}
        </Route>
        <Route path="/cart" component={CartPage} />
        <Route path="/favorites" component={FavoritesPage} />
        <Route
          path="/sign-in"
          render={() => {
            return isCurrenUserAuthentificated ? (
              <Redirect to="/" />
            ) : (
              <SignInPage />
            );
          }}
        />
        <Route
          path="/sign-up"
          render={() => {
            return isCurrenUserAuthentificated ? (
              <Redirect to="/" />
            ) : (
              <SignUpPage />
            );
          }}
        />
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

      <div className={styles.stickToBottom}>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isCurrenUserAuthentificated: selectIsCurrenUserAuthentificated,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
  fetchAuthStateStart: () => dispatch(fetchAuthStateStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
