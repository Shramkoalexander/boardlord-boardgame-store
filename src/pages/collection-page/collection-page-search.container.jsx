import React from "react";
import { withRouter } from "react-router-dom";
import CollectionPage from "./collection-page.component";
import { findCollectionItems } from "../../components/search/search.utils";

const CollectionPageSearchContainer = ({
  match,
  location,
  collection,
  ...otherProps
}) => {
  const searchQuery = decodeURI(location.search.split("=")[1]);
  let newCollection = findCollectionItems(collection, searchQuery);

  return (
    <CollectionPage
      collection={newCollection}
      ignoreFIlter={true}
      {...otherProps}
    />
  );
};

export default withRouter(CollectionPageSearchContainer);
