import React, { useEffect, useCallback, useState, useRef } from "react";
import styles from "./fixed-header-wrapper.module.scss";
import { connect } from "react-redux";
import { selectIsHeaderVisible } from "../../redux/fixed-header-wrapper/fixed-header-wrapper.selectors";
import { createStructuredSelector } from "reselect";
import {
  showHeader,
  hideHeader,
} from "../../redux/fixed-header-wrapper/fixed-header-wrapper.actions";

function FixedHeaderWrapper({
  children,
  isHeaderVisible,
  showHeader,
  hideHeader,
}) {
  const headerElement = useRef();
  const [pageOffset, setPageOffset] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const DOWN_DIRECTION = 1;
  const UP_DIRECTION = 2;
  const [currentDirection, setCurrentDirection] = useState(DOWN_DIRECTION);

  const handleScroll = useCallback(() => {
    const currentPageOffset = window.pageYOffset;
    let newDirection = currentDirection;
    const isGoingDown = currentPageOffset > pageOffset;

    if (isGoingDown) {
      pageOffset > headerHeight && hideHeader();
      if (currentDirection === UP_DIRECTION) newDirection = DOWN_DIRECTION;
    } else {
      showHeader();
      if (currentDirection === DOWN_DIRECTION) newDirection = UP_DIRECTION;
    }

    setCurrentDirection(newDirection);
    setPageOffset(currentPageOffset);
  }, [currentDirection, headerHeight, hideHeader, pageOffset, showHeader]);

  const handleResize = useCallback(() => {
    if (headerHeight !== headerElement.current.clientHeight)
      setHeaderHeight(headerElement.current.clientHeight);
  }, [headerHeight]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    setPageOffset(window.pageYOffset);
    setHeaderHeight(headerElement.current.clientHeight);
  }, []);

  useEffect(() => {
    document.body.style.paddingTop = `${headerHeight}px`;
  }, [headerHeight]);

  return (
    <div
      ref={headerElement}
      className={`${styles.header} ${
        isHeaderVisible ? styles.visible : styles.invisible
      }`}
    >
      {children}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isHeaderVisible: selectIsHeaderVisible,
});

const mapDispatchToProps = (dispatch) => ({
  showHeader: () => dispatch(showHeader()),
  hideHeader: () => dispatch(hideHeader()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FixedHeaderWrapper);
