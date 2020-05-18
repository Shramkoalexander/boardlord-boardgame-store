import React, { useState } from "react";
import "./shop-page.styles.scss";

function ShopPage({ collection, currency }) {
  return (
    <div className="container bg-light">
      <div className="row">
        <div className="col-xl-auto h-100">
          <div className="row flex-column">
            <div className="col py-3">
              <div className="bg-white border p-3">
                <h1 style={{ fontSize: "1.5rem" }}>Категории</h1>
                <h2 style={{ fontSize: "1.2rem" }}>
                  <Link to={`${match.url}`}>Настольные игры</Link>
                </h2>
                <ul>
                  <li>
                    <Link to={`${match.url}/cooperative`}>Кооперативные</Link>
                  </li>
                  <li>
                    <Link to={`${match.url}/party`}>Игры для вечеринок</Link>
                  </li>
                  <li>
                    <Link to={`${match.url}/two-players`}>Игра на двоих</Link>
                  </li>
                  <li>
                    <Link to={`${match.url}/family`}>Семейные</Link>
                  </li>
                  <li>
                    <Link to={`${match.url}/economic`}>Экономические</Link>
                  </li>
                  <li>
                    <Link to={`${match.url}/strategic`}>Стратегические</Link>
                  </li>
                  <li>
                    <Link to={`${match.url}/abstract-and-logic`}>
                      Абстрактные и логические
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col py-3">
              <div className="bg-white border p-3">
                <ul>
                  <li>
                    <Link to={`${match.url}/top`}>Топ игр</Link>
                  </li>
                  <li>
                    <Link to={`${match.url}/new-games`}>
                      Новинки в мире игр
                    </Link>
                  </li>
                  <li>
                    <Link to={`${match.url}/discounts`}>Скидки</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ShopPage;
