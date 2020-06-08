import React, { useState, useEffect } from "react";
import { sortCollectionsByType, sortTypeValues } from "./sorting.utils";
import { useHistory } from "react-router";
import Sorting from "./sorting.component";

const withSorting = (WrappedComponent) => ({ collection, ...otherProps }) => {
  const { POPULAR } = sortTypeValues;
  const [sortType, setSortType] = useState(POPULAR);
  const history = useHistory();
  const sortedCollection = sortCollectionsByType(sortType, collection);

  const handleSelectChange = (event) => {
    setSortType(event.target.value);
  };

  useEffect(() => {
    const unlisten = history.listen(() => {
      setSortType(POPULAR);
    });

    return () => {
      unlisten();
    };
  }, [POPULAR, history]);
  return (
    <>
      <div className="w-100">
        <Sorting
          sorting={{
            sortType,
            handleSelectChange,
            collectionLength: sortedCollection.length,
          }}
        />
      </div>
      <WrappedComponent collection={sortedCollection} {...otherProps} />
    </>
  );
};

export default withSorting;
