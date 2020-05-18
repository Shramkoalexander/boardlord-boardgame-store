import React from "react";
import classes from "./collection-item.module.scss";
import { Link, withRouter } from "react-router-dom";

function CollectionItem({ item, currency }) {
  const [month, year] = item.published.split("/");
  const today = new Date();
  const dateToCompareFreshness = new Date();
  dateToCompareFreshness.setMonth(today.getMonth() - 6);
  const published = new Date(year, month);
  const isNew = published >= dateToCompareFreshness;
  const isTop = item.num_user_ratings >= 100 && item.average_user_rating >= 4.5;
  const hasDiscount = item.discount_pirce;

  return (
    <div className="d-flex flex-column justify-content-center text-center bg-white p-3 border position-relative">
      <div className={`d-flex flex-column  ${classes.tags} `}>
        <div
          className={` ${classes.tag} ${classes.top} ${isTop ? `` : `d-none`}`}
        >
          TOP
        </div>
        <div
          className={` ${classes.tag} ${classes.new} ${isNew ? `` : `d-none`}`}
        >
          NEW
        </div>
        <div
          className={` ${classes.tag} ${classes.discount} ${
            hasDiscount ? `` : `d-none`
          }`}
        >
          %
        </div>
      </div>
      <Link to={`/product-details/${item.alias}`}>
        <img
          src={require(`../../assets/images/boardgames/${item.alias}/${item.alias}.jpg`)}
          height="150"
          alt=""
        />
      </Link>
      <div>
        <a href="/">{item.title}</a>
      </div>
      <div className={hasDiscount ? `${classes.oldPrice}` : ``}>
        {`${item.price} ${currency}`}
      </div>
      <div className={hasDiscount ? `${classes.discountPrice}` : `invisible`}>
        {`${item.discount_pirce} ${currency}`}
      </div>
      {item.quantity > 0 ? (
        <button className="mt-4 btn btn-primary">Купить</button>
      ) : (
        <button className="mt-4 btn btn-white border-primary ">
          Нет в наличии
        </button>
      )}

      <a href="/">
        <span>подробнее</span>
      </a>
    </div>
  );
}

export default withRouter(CollectionItem);
