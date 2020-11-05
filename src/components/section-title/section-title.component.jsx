import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectoriesForSectionTitle } from "../../redux/directories/directories.selectors";
import styles from "./section-title.module.scss";

function SectionTitle({ directories }) {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);
  const last = paths[paths.length - 1];
  const currentPath = directories[last];

  return (
    <>
      {currentPath ? (
        <h1 className={styles.title}>{currentPath.title}</h1>
      ) : null}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  directories: selectDirectoriesForSectionTitle,
});

export default connect(mapStateToProps)(SectionTitle);
