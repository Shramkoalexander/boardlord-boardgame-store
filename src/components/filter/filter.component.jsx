import React, { useEffect } from "react";
import MultipleRange from "../../components/multiple-range/multiple-range.component";
import { filterValues } from "./filter.utils";
import { connect } from "react-redux";
import {
  resetFilter,
  setGameTime,
  setPlayersCount,
  toggleIsInStock,
} from "../../redux/filter/filter.actions";
import {
  selectGameTime,
  selectIsInStock,
  selectPlayersCount,
  selectDebouncedPriceValues,
  selectShowFilter,
  selectItemsFound,
  selectPriceLimits,
} from "../../redux/filter/filter.selectors";
import { useHistory } from "react-router-dom";
import range from "lodash.range";
import { createStructuredSelector } from "reselect";

function Filter({
  isInStock,
  gameTime,
  playersCount,
  resetFilter,
  showFilter,
  setGameTime,
  toggleIsInStock,
  setPlayersCount,
  itemsFound,
}) {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      resetFilter();
    });

    return () => {
      unlisten();
    };
  }, [history, resetFilter]);

  return showFilter ? (
    <div className="bg-white border p-3">
      <h2 style={{ fontSize: "1.2rem" }}>Время партии</h2>
      <select
        name="gameTime"
        id="gameTime"
        value={gameTime}
        onChange={(e) => {
          setGameTime(e.target.value);
        }}
      >
        <option value={filterValues.gameTime.UNDEF}>не указано</option>
        <option value={filterValues.gameTime.SHORT}>короткая</option>
        <option value={filterValues.gameTime.MEDIUM}>средняя</option>
        <option value={filterValues.gameTime.LONG}>долгая</option>
        <option value={filterValues.gameTime.VERY_LONG}>очень долгая</option>
        <option value={filterValues.gameTime.DIFFERENT}>различная</option>
      </select>
      <h2 style={{ fontSize: "1.2rem" }}>Кол-во игроков</h2>

      <select
        name="playersCount"
        id="playersCount"
        value={playersCount}
        onChange={(e) => {
          setPlayersCount(e.target.value);
        }}
      >
        <option value={filterValues.playersCount.ALL}>Все</option>
        {range(1, filterValues.playersCount.COUNT).map((item) => (
          <option key={`playerCount-${item}`} value={`${item}`}>
            {item}
          </option>
        ))}
        <option value={filterValues.playersCount.MORE}>
          &gt; {filterValues.playersCount.COUNT}
        </option>
      </select>
      <div className="py-3">
        <input
          type="checkbox"
          checked={isInStock}
          onChange={() => {
            toggleIsInStock();
          }}
        />
        <span>Только товары в наличии</span>
      </div>
      <h1 style={{ fontSize: "1.5rem" }}>Фильтр</h1>
      <h2 style={{ fontSize: "1.2rem" }}>Цена</h2>
      <MultipleRange />
      <div>Найдено: {itemsFound}</div>
      <button
        onClick={() => {
          resetFilter();
        }}
      >
        Сбросить фильтр
      </button>
    </div>
  ) : (
    ""
  );
}

const mapStateToProps = createStructuredSelector({
  gameTime: selectGameTime,
  isInStock: selectIsInStock,
  playersCount: selectPlayersCount,
  priceLimits: selectPriceLimits,
  debouncedPriceValues: selectDebouncedPriceValues,
  showFilter: selectShowFilter,
  itemsFound: selectItemsFound,
});

const mapDispatchToProps = (dispatch) => ({
  resetFilter: () => dispatch(resetFilter()),
  toggleIsInStock: () => dispatch(toggleIsInStock()),
  setGameTime: (gameTime) => dispatch(setGameTime(gameTime)),
  setPlayersCount: (playersCount) => dispatch(setPlayersCount(playersCount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
