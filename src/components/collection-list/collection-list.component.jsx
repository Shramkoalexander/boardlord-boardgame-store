import React from "react";
import CollectionItem from "../collection-item/collection-item.component";
import { connect } from "react-redux";
import { selectCurrency } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";
import withSpinner from "../spinner/withSpinner.component";
import EmptyBlock from "../empty-block/empty-block.component";

function CollectionList({ collection, currency }) {
  return (
    <>
      {collection.length > 0 ? (
        <div className="row no-gutters row-cols-1 row-cols-md-2 row-cols-lg-3 mx-sm-n3">
          {collection.map((item) => (
            <div className="col px-sm-3 py-3" key={item.id}>
              <CollectionItem item={item} currency={currency} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyBlock>Ничего не найдено</EmptyBlock>
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currency: selectCurrency,
});

export default connect(mapStateToProps)(withSpinner(CollectionList));
