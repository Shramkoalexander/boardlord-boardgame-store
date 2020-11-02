import transform from "lodash.transform";
import sortBy from "lodash.sortby";
import isEmpty from "lodash.isempty";

export const defineViewportAlias = (breakpoints) => {
  if (!isEmpty(breakpoints)) {
    const breakpointsArray = mapBreakpointsObjectToArray(breakpoints);
    let found;
    found = breakpointsArray.findIndex(
      (item) =>
        window.matchMedia(`(max-width: ${getProperMaxWidth(item.value)}px)`)
          .matches
    );
    if (found < 0) return breakpointsArray[breakpointsArray.length - 1].alias;
    if (found > 0) return breakpointsArray[found - 1].alias;
    if (found === 0) return "";
  } else {
    return "";
  }
};

const getProperMaxWidth = (maxWidth) => {
  return maxWidth - 0.02; // work around the limitations of min- and max- prefixes and viewports with fractional widths
};

const mapBreakpointsObjectToArray = (breakpoints) => {
  const breakpointsArray = transform(
    breakpoints,
    (result, value, key) => {
      return result.push({ alias: key, value });
    },
    []
  );
  const sortedArray = sortBy(breakpointsArray, ["value"]);
  return sortedArray;
};

export const breakpointsDown = (
  breakpoints,
  breakpoint,
  currentViewportAlias
) => {
  const breakpointsArray = mapBreakpointsObjectToArray(breakpoints);

  const breakpointIndex = breakpointsArray.findIndex(
    (item) => item.value === breakpoint
  );

  const currentViewportAliasIndex = breakpointsArray.findIndex(
    (item) => item.alias === currentViewportAlias
  );

  return currentViewportAliasIndex <= breakpointIndex;
};

export const breakpointsUp = (
  breakpoints,
  breakpoint,
  currentViewportAlias
) => {
  const breakpointsArray = mapBreakpointsObjectToArray(breakpoints);

  const breakpointIndex = breakpointsArray.findIndex(
    (item) => item.value === breakpoint
  );

  const currentViewportAliasIndex = breakpointsArray.findIndex(
    (item) => item.alias === currentViewportAlias
  );

  return currentViewportAliasIndex >= breakpointIndex;
};

export const breakpointsOnly = (
  breakpoints,
  breakpoint,
  currentViewportAlias
) => {
  const breakpointsArray = mapBreakpointsObjectToArray(breakpoints);

  const breakpointIndex = breakpointsArray.findIndex(
    (item) => item.value === breakpoint
  );

  const currentViewportAliasIndex = breakpointsArray.findIndex(
    (item) => item.alias === currentViewportAlias
  );

  return currentViewportAliasIndex === breakpointIndex;
};

export const breakpointsBetween = (
  breakpoints,
  breakpointFrom,
  breakpointBefore,
  currentViewportAlias
) => {
  const breakpointsArray = mapBreakpointsObjectToArray(breakpoints);

  const breakpointIndexFrom = breakpointsArray.findIndex(
    (item) => item.value === breakpointFrom
  );

  const breakpointIndexBefore = breakpointsArray.findIndex(
    (item) => item.value === breakpointBefore
  );

  const currentViewportAliasIndex = breakpointsArray.findIndex(
    (item) => item.alias === currentViewportAlias
  );

  return (
    currentViewportAliasIndex >= breakpointIndexFrom &&
    currentViewportAliasIndex < breakpointIndexBefore
  );
};
