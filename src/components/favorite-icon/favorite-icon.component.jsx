import React, { useState } from "react";
import styles from "./favorite-icon.module.scss";
import { connect } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favorites.actions";
import { selectIsItemFavorite } from "../../redux/favorites/favorites.selectors";

function FavoriteIcon({ item, toggleFavorite, isItemFavorite }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
      }}
      onClick={toggleFavorite.bind(null, item)}
    >
      <span className={`material-icons ${styles.fontIcon}`}>
        {isActive || isItemFavorite ? "favorite" : "favorite_border"}
      </span>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isItemFavorite: selectIsItemFavorite(ownProps.item)(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (item) => dispatch(toggleFavorite(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteIcon);
