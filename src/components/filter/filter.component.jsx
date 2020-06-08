import React, { useEffect } from "react";
import MultipleRange from "../../components/multiple-range/multiple-range.component";
import { useHistory } from "react-router-dom";
import { filterValues, getPlayersCountArray } from "./filter.utils";

function Filter({
  filter: {
    handleFilterReset,
    initialFIlterState,
    handlegameTimeChange,
    handlePlayersCountChange,
    handleInStockChange,
    minPrice,
    maxPrice,
    priceValues,
    handleDebouncedPriceChange,
    handlePriceChange,
    gameTime,
    isInStock,
    playersCount,
    itemsFound,
  },
}) {
  const history = useHistory();

  // console.log("in filter");

  useEffect(() => {
    const unlisten = history.listen(() => {
      handleFilterReset(initialFIlterState);
    });

    return () => {
      unlisten();
    };
  }, [handleFilterReset, history, initialFIlterState]);

  return (
    <div className="bg-white border p-3">
      <h2 style={{ fontSize: "1.2rem" }}>Время партии</h2>
      <select
        name="gameTime"
        id="gameTime"
        value={gameTime}
        onChange={(e) => {
          handlegameTimeChange(e.target.value);
        }}
      >
        <option value={filterValues.gameTime.undef}>не указано</option>
        <option value={filterValues.gameTime.short}>короткая</option>
        <option value={filterValues.gameTime.medium}>средняя</option>
        <option value={filterValues.gameTime.long}>долгая</option>
        <option value={filterValues.gameTime.veryLong}>очень долгая</option>
        <option value={filterValues.gameTime.different}>различная</option>
      </select>
      <h2 style={{ fontSize: "1.2rem" }}>Кол-во игроков</h2>

      <select
        name="playersCount"
        id="playersCount"
        value={playersCount}
        onChange={(e) => {
          handlePlayersCountChange(e.target.value);
        }}
      >
        <option value={filterValues.playersCount.all}>Все</option>
        {getPlayersCountArray(filterValues.playersCount.count).map((item) => (
          <option key={`playerCount-${item}`} value={`${item}`}>
            {item}
          </option>
        ))}
        <option value={filterValues.playersCount.more}>
          > {filterValues.playersCount.count}
        </option>
      </select>
      <div className="py-3">
        <input
          type="checkbox"
          checked={isInStock}
          onChange={() => {
            handleInStockChange(!isInStock);
          }}
        />
        <span>Только товары в наличии</span>
      </div>
      <h1 style={{ fontSize: "1.5rem" }}>Фильтр</h1>
      <h2 style={{ fontSize: "1.2rem" }}>Цена</h2>
      <MultipleRange
        min={minPrice}
        max={maxPrice}
        handleDebouncedPriceChange={handleDebouncedPriceChange}
        handlePriceChange={handlePriceChange}
        priceValues={priceValues}
      />
      <div>Найдено: {itemsFound}</div>
      <button
        onClick={() => {
          handleFilterReset(initialFIlterState);
        }}
      >
        Сбросить фильтр
      </button>
    </div>
  );
}

export default Filter;
