import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./breadcrumbs.module.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectoriesForBreadcrumbs } from "../../redux/directories/directories.selectors";
import uniqid from "uniqid";

function Breadcrumbs({ directories }) {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  return (
    <div className={styles.linkList}>
      <div className={styles.nonActive}>
        <Link to="/" className={styles.title}>
          Главная
        </Link>
      </div>
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const currentPath = directories[path];
        const to = `/${paths.slice(0, index + 1).join("/")}`;
        if (currentPath) {
          if (isLast) {
            return (
              <div key={uniqid()} className={styles.active}>
                <span className={styles.title}>{currentPath.title}</span>
              </div>
            );
          } else {
            return (
              <div className={styles.nonActive} key={uniqid()}>
                <Link to={to} className={styles.title}>
                  {currentPath.title}
                </Link>
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  directories: selectDirectoriesForBreadcrumbs,
});

export default connect(mapStateToProps)(Breadcrumbs);
