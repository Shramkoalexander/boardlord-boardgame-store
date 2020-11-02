import React, { useState } from "react";
import { useEffect } from "react";
import transform from "lodash.transform";
import BreakpointsProvider from "./breakpoints-provider.component";

function BreakpointsProviderBootstrapContainer({ ...otherProps }) {
  const [breakpoints, setBreakpoints] = useState({});

  useEffect(() => {
    const documentStyles = window.getComputedStyle(document.documentElement);

    const breakpointString = {
      xs: "--breakpoint-xs",
      sm: "--breakpoint-sm",
      md: "--breakpoint-md",
      lg: "--breakpoint-lg",
      xl: "--breakpoint-xl",
    };

    const getBreakpoint = (breakpointType) => {
      const stringValue = documentStyles.getPropertyValue(breakpointType);
      const value = parseInt(stringValue);
      return value;
    };

    setBreakpoints(
      transform(
        breakpointString,
        (result, value, key) => {
          return result[key] || (result[key] = getBreakpoint(value));
        },
        {}
      )
    );
  }, []);

  return <BreakpointsProvider breakpoints={breakpoints} {...otherProps} />;
}

export default BreakpointsProviderBootstrapContainer;
