import React, { useCallback } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  setBreakpoints,
  setCurrentViewportAlias,
} from "../../redux/breakpoints-provider/breakpoints-provider.actions";
import { defineViewportAlias } from "./breakpoints-provider.utils";
import { createStructuredSelector } from "reselect";
import { selectCurrentViewportAlias } from "../../redux/breakpoints-provider/breakpoints-provider.selectors";

function BreakpointsProvider({
  breakpoints,
  children,
  setBreakpoints,
  setCurrentViewportAlias,
  currentViewportAlias,
}) {
  useEffect(() => {
    setCurrentViewportAlias(defineViewportAlias(breakpoints));
    setBreakpoints(breakpoints);
  }, [breakpoints, setBreakpoints, setCurrentViewportAlias]);

  const handleResize = useCallback(() => {
    const breakpoint = defineViewportAlias(breakpoints);
    if (currentViewportAlias !== breakpoint)
      setCurrentViewportAlias(breakpoint);
  }, [breakpoints, currentViewportAlias, setCurrentViewportAlias]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return <>{children}</>;
}
const mapStateToProps = createStructuredSelector({
  currentViewportAlias: selectCurrentViewportAlias,
});

const mapDispatchToProps = (dispatch) => ({
  setBreakpoints: (breakpoints) => dispatch(setBreakpoints(breakpoints)),
  setCurrentViewportAlias: (breakpoint) =>
    dispatch(setCurrentViewportAlias(breakpoint)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreakpointsProvider);
