import React from "react";
import { withRouter } from "react-router-dom";
import CollectionPage from "./collection-page.component";
import { selectCollection } from "../../redux/shop/shop.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { hasDiscount, isNew, isTop } from "../../components/tag/tag.utils";
import PageNotFound from "../page-not-found/page-not-found.component";

function CollectionPageSelectionContainer({
  match,
  collection,
  ...otherProps
}) {
  const selection = match.params.selectionId;
  let newCollection = [];

  switch (selection) {
    case "top":
      newCollection = collection.filter((item) =>
        isTop(item.num_user_ratings, item.average_user_rating)
      );
      break;
    case "new-games":
      newCollection = collection.filter((item) => isNew(item.published));
      break;
    case "discounts":
      newCollection = collection.filter((item) =>
        hasDiscount(item.discount_pirce)
      );
      break;

    default:
      return <PageNotFound />;
  }

  return <CollectionPage collection={newCollection} {...otherProps} />;
}

const mapStateToProps = createStructuredSelector({
  collection: selectCollection,
});

export default connect(mapStateToProps)(
  withRouter(CollectionPageSelectionContainer)
);
