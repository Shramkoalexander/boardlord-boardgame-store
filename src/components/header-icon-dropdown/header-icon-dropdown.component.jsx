import React from "react";
import styles from "./header-icon-dropdown.module.scss";
import EscapeOutsideWrapper from "../escape-outside/escape-outside-wrapper.component";
import useHistoryChange from "../../custom-hooks/useHistoryChange";

function HeaderIconDropdown({
  children,
  toggleNode,
  isDropdownVisible,
  hideDropdown,
}) {
  useHistoryChange(() => {
    hideDropdown();
  });

  return (
    isDropdownVisible && (
      <EscapeOutsideWrapper
        onEscapeOutside={hideDropdown}
        isNodeToEscapeVisible={isDropdownVisible}
        nodesToIgnore={[toggleNode]}
      >
        <div className={styles.container}>
          <div className={styles.dropdown}>{children}</div>
          <div className={styles.arrow}></div>
        </div>
      </EscapeOutsideWrapper>
    )
  );
}

export default HeaderIconDropdown;
