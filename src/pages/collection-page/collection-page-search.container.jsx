import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import CollectionPage from "./collection-page.component";
import { findCollectionItems } from "../../components/search/search.utils";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import { setShowFilter } from "../../redux/filter/filter.actions";
import { createStructuredSelector } from "reselect";

function CollectionPageSearchContainer({
  location,
  collection,
  setShowFilter,
  ...otherProps
}) {
  const searchQuery = decodeURI(location.search.split("=")[1]);
  let newCollection = findCollectionItems(collection, searchQuery);

  useEffect(() => {
    setShowFilter(false);
  });

  return <CollectionPage collection={newCollection} {...otherProps} />;
}

const mapStateToProps = createStructuredSelector({
  collection: selectCollection,
});

const mapDispatchToProps = (dispatch) => ({
  setShowFilter: (showFilter) => dispatch(setShowFilter(showFilter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CollectionPageSearchContainer));
