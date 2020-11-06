import React from "react";
import { selectIsCollectionLoaded } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Spinner from "./spinner.component";

const withSpinner = (WrappedComponent) => {
  const WithSpinnerComponent = ({ isLoading, ...otherProps }) => {
    return (
      <>{isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />}</>
    );
  };

  return connect(mapStateToProps)(WithSpinnerComponent);
};

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionLoaded(state),
});

export default withSpinner;
