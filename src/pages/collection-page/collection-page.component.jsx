import React from "react";
import CollectionList from "../../components/collection-list/collection-list.component";
import { NavLink } from "react-router-dom";
import Filter from "../../components/filter/filter.component";
import Pagination from "../../components/pagination/pagination.component";
import Sorting from "../../components/sorting/sorting.component";
import flowRight from "lodash.flowright";
import withFilter from "../../components/filter/withFilter";
import withPagination from "../../components/pagination/withPagination";
import withSorting from "../../components/sorting/withSorting";
import SectionTitle from "../../components/section-title/section-title.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectories } from "../../redux/directories/directories.selectors";
import styles from "./collection-page.module.scss";
import CollapsableSection from "../../components/collapsable-section/collapsable-section.component";
import { breakpointsUp } from "../../components/breakpoints-provider/breakpoints-provider.utils";
import {
  selectCurrentViewportAlias,
  selectBreakpoints,
} from "../../redux/breakpoints-provider/breakpoints-provider.selectors";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";

function CollectionPage({
  collection,
  currentViewportAlias,
  breakpoints,
  showFilter,
  directories: { categories, selections, other },
}) {
  const isBreakpointXLargeOrLarger = breakpointsUp(
    breakpoints,
    breakpoints.xl,
    currentViewportAlias
  );

  return (
    <>
      <div className="container d-none d-md-flex mt-3">
        <Breadcrumbs />
      </div>
      <div className="mt-4 mt-xl-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-3 mb-3">
              <div className="row flex-column mb-n3">
                <div className="col mb-3">
                  <CollapsableSection
                    title={"каталог"}
                    preventCollapsing={isBreakpointXLargeOrLarger}
                  >
                    <>
                      <div className={styles.sideSectionBox}>
                        <ul className={styles.navLinkList}>
                          {other.map(
                            ({ path, title }) =>
                              path === "all-games" && (
                                <li key={path}>
                                  <NavLink
                                    to={`/shop/${path}`}
                                    exact
                                    className={styles.navLink}
                                    activeClassName={styles.navLinkActive}
                                  >
                                    {title}
                                  </NavLink>
                                </li>
                              )
                          )}
                          {categories.map(({ path, title }) => (
                            <li key={path}>
                              <NavLink
                                to={`/shop/category/${path}`}
                                exact
                                className={styles.navLink}
                                activeClassName={styles.navLinkActive}
                              >
                                {title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.sideSectionBox}>
                        <ul className={styles.navLinkList}>
                          {selections.map(({ path, title }) => (
                            <li key={path}>
                              <NavLink
                                to={`/shop/selection/${path}`}
                                exact
                                className={styles.navLink}
                                activeClassName={styles.navLinkActive}
                              >
                                {title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  </CollapsableSection>
                </div>

                {showFilter && (
                  <div className="col mb-3">
                    <CollapsableSection
                      title={"фильтр"}
                      preventCollapsing={isBreakpointXLargeOrLarger}
                    >
                      <div className={styles.sideSectionBox}>
                        <Filter />
                      </div>
                    </CollapsableSection>
                  </div>
                )}
              </div>
            </div>

            <div className="col">
              <SectionTitle />
              <Sorting />

              <CollectionList collection={collection} />

              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  directories: selectDirectories,
  currentViewportAlias: selectCurrentViewportAlias,
  breakpoints: selectBreakpoints,
});

export default flowRight([
  connect(mapStateToProps),
  withFilter,
  withPagination,
  withSorting,
])(CollectionPage);
