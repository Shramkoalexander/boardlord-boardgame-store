import React from "react";
import CollectionPage from "./collection-page.component";
import { selectCollection } from "../../redux/shop/shop.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

function CollectionPageContainer({ collection, ...otherProps }) {
  return <CollectionPage collection={collection} {...otherProps} />;
}

const mapStateToProps = createStructuredSelector({
  collection: selectCollection,
});

export default connect(mapStateToProps)(CollectionPageContainer);
