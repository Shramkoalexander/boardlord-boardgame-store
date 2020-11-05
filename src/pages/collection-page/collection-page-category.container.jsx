import React from "react";
import { withRouter } from "react-router-dom";
import { selectCollection } from "../../redux/shop/shop.selectors";
import { connect } from "react-redux";
import CollectionPage from "./collection-page.component";
import { createStructuredSelector } from "reselect";
import PageNotFound from "../page-not-found/page-not-found.component";
import { selectCategoriesDirectory } from "../../redux/directories/directories.selectors";

function CollectionPageCategoryContainer({
  match,
  collection,
  categoriesDirectory,
  ...otherProps
}) {
  const category = match.params.categoryId;
  let newCollection = [];

  if (
    categoriesDirectory
      .map((directoryItem) => directoryItem.path)
      .includes(category)
  ) {
    newCollection = collection.filter((item) =>
      item.categories.includes(category)
    );
  } else {
    return <PageNotFound />;
  }

  return <CollectionPage collection={newCollection} {...otherProps} />;
}

const mapStateToProps = createStructuredSelector({
  collection: selectCollection,
  categoriesDirectory: selectCategoriesDirectory,
});

export default connect(mapStateToProps)(
  withRouter(CollectionPageCategoryContainer)
);
