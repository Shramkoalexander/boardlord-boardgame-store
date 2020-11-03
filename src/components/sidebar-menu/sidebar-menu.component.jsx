import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectIsSidebarMenuVisible } from "../../redux/sidebar-menu/sidebar-menu.selectors";
import { createStructuredSelector } from "reselect";
import EscapeOutsideWrapper from "../escape-outside/escape-outside-wrapper.component";
import { hideSidebarMenu } from "../../redux/sidebar-menu/sidebar-menu.actions";
import { Link } from "react-router-dom";
import styles from "./sidebar-menu.module.scss";
import {
  selectBreakpoints,
  selectCurrentViewportAlias,
} from "../../redux/breakpoints-provider/breakpoints-provider.selectors";
import { breakpointsDown } from "../breakpoints-provider/breakpoints-provider.utils";
import { CSSTransition } from "react-transition-group";
import uniqid from "uniqid";
import useHistoryChange from "../../custom-hooks/useHistoryChange";
import { selectMainMenuDirectory } from "../../redux/directories/directories.selectors";

function SidebarMenu({
  isSidebarMenuVisible,
  hideSidebarMenu,
  mainMenuDirectory,
  breakpoints,
  currentViewportAlias,
}) {
  useHistoryChange(() => {
    hideSidebarMenu();
  });

  useEffect(() => {
    if (
      !breakpointsDown(breakpoints, breakpoints.md, currentViewportAlias) &&
      isSidebarMenuVisible
    )
      hideSidebarMenu();
  }, [
    breakpoints,
    currentViewportAlias,
    hideSidebarMenu,
    isSidebarMenuVisible,
  ]);

  return (
    <CSSTransition
      in={isSidebarMenuVisible}
      unmountOnExit
      timeout={{
        appear: 0,
        enter: 0,
        exit: 200,
      }}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        enterDone: styles.enterDone,
        exit: styles.exit,
        exitActive: styles.exitActive,
        exitDone: styles.exitDone,
      }}
      onEntered={() => {
        document.body.style.overflow = "hidden";
      }}
      onExiting={() => {
        document.body.style.overflow = "visible";
      }}
    >
      <div>
        <div className={styles.modalOverlay}>
          <EscapeOutsideWrapper
            onEscapeOutside={hideSidebarMenu}
            isNodeToEscapeVisible={isSidebarMenuVisible}
          >
            <div className={styles.modal}>
              <div className={styles.closeBtnWrapper}>
                <button className={styles.closeBtn} onClick={hideSidebarMenu}>
                  <span className={`material-icons ${styles.closeIcon}`}>
                    clear
                  </span>
                </button>
              </div>

              {mainMenuDirectory.map(({ path, title }) => (
                <div key={uniqid()} className={styles.menuItem}>
                  <Link to={`/${path}`}>{title}</Link>
                </div>
              ))}
            </div>
          </EscapeOutsideWrapper>
        </div>
      </div>
    </CSSTransition>
  );
}

const mapStateToProps = createStructuredSelector({
  isSidebarMenuVisible: selectIsSidebarMenuVisible,
  mainMenuDirectory: selectMainMenuDirectory,
  breakpoints: selectBreakpoints,
  currentViewportAlias: selectCurrentViewportAlias,
});

const mapDispatchToProps = (dispatch) => ({
  hideSidebarMenu: () => dispatch(hideSidebarMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
