import React, { useState, useCallback } from "react";
import styles from "./collapsable-section.module.scss";
import useHistoryChange from "../../custom-hooks/useHistoryChange";

function CollapsableSection({ title, children, preventCollapsing = false }) {
  const [isSectionColapsed, setIsSectionColapsed] = useState(true);
  const toggleIsSectionCollapsed = useCallback(() => {
    setIsSectionColapsed((prevState) => !prevState);
  }, []);

  useHistoryChange(() => {
    setIsSectionColapsed(true);
  });

  return (
    <>
      {preventCollapsing ? (
        <div className={styles.titleToggleOff}>
          <h1 className={styles.titleText}>{title}</h1>
        </div>
      ) : (
        <button
          onClick={toggleIsSectionCollapsed}
          className={styles.titleToggle}
        >
          <h1 className={styles.titleText}>{title}</h1>
          <span
            className={`material-icons ${styles.arrowIcon} ${
              !isSectionColapsed && styles.arrowIconExpanded
            }`}
          >
            expand_more
          </span>
        </button>
      )}

      <div
        className={`mt-3 ${
          isSectionColapsed && !preventCollapsing && "d-none"
        }`}
      >
        {children}
      </div>
    </>
  );
}

export default CollapsableSection;
