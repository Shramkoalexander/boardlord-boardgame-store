import React, { useState, useEffect } from "react";
import CollectionItem from "../collection-item/collection-item.component";
import { useHistory, withRouter } from "react-router-dom";
import withPagination from "../pagination/withPagination";
import { sortCollectionsByType } from "./collection.utils";

function Collection({ collection, currency, ...other }) {
  const [sortType, setSortType] = useState("popular");
  const history = useHistory();
  const sortedCollection = sortCollectionsByType(sortType, collection);

  const handleSelectChange = (event) => {
    setSortType(event.target.value);
  };

  useEffect(() => {
    const unlisten = history.listen(() => {
      setSortType("popular");
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <>
      <div className="w-100">
        <div className={collection.length ? "" : "d-none"}>
          <label htmlFor="sort">Сортировать по </label>
          <select
            name="sort"
            id="sort"
            value={sortType}
            onChange={handleSelectChange}
          >
            <option value="popular">Популярности</option>
            <option value="price-desc">Ценe &darr;</option>
            <option value="price-asc">Ценe &uarr;</option>
            <option value="name-desc">Названию &darr;</option>
            <option value="name-asc">Названию &uarr;</option>
          </select>
        </div>
      </div>
      <div className="row no-gutters row-cols-1 row-cols-md-2 row-cols-lg-3 mx-n3">
        {sortedCollection.map((item) => (
          <div className="col p-3" key={item.id}>
            <CollectionItem item={item} currency={currency} />
          </div>
        ))}
      </div>
    </>
  );
}

export default withRouter(withPagination(Collection));
