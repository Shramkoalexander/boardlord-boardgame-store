import React from "react";
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
  selectItemsFound,
  selectPriceLimits,
} from "../../redux/filter/filter.selectors";
import range from "lodash.range";
import { createStructuredSelector } from "reselect";
import OptionSelector from "../option-selector/option-selector.component";
import styles from "./filter.module.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import ButtonCustom from "../button-custom/button-custom.component";
import { buttonStyleTypes } from "../button-custom/button-custom.utils";
import useHistoryChange from "../../custom-hooks/useHistoryChange";

function Filter({
  isInStock,
  resetFilter,
  setGameTime,
  toggleIsInStock,
  setPlayersCount,
  itemsFound,
}) {
  useHistoryChange(() => {
    resetFilter();
  });

  return (
    <div className="row">
      <div className="col-6 col-xl-12">
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Время партии:</h2>
          <OptionSelector
            options={[
              { value: filterValues.gameTime.UNDEF, text: "Не указано" },
              { value: filterValues.gameTime.SHORT, text: "Короткая" },
              { value: filterValues.gameTime.MEDIUM, text: "Средняя" },
              { value: filterValues.gameTime.LONG, text: "Долгая" },
              {
                value: filterValues.gameTime.VERY_LONG,
                text: "Очень долгая",
              },
              { value: filterValues.gameTime.DIFFERENT, text: "Различная" },
            ]}
            onChange={(value) => {
              setGameTime(value);
            }}
          />
        </div>
      </div>
      <div className="col-6 col-xl-12">
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Кол-во игроков:</h2>
          <OptionSelector
            options={[
              { value: filterValues.playersCount.ALL, text: "Все" },
              ...range(1, filterValues.playersCount.COUNT + 1).map((item) => {
                return { value: item, text: item };
              }),

              {
                value: filterValues.playersCount.MORE,
                text: `\u003E ${filterValues.playersCount.COUNT}`,
              },
            ]}
            onChange={(value) => {
              setPlayersCount(value);
            }}
          />
        </div>
      </div>

      <div className="col-12 ">
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Цена:</h2>
          <MultipleRange />
        </div>
      </div>

      <div className="col-12">
        <div className={styles.inStock}>
          <div className="mr-2">
            <div
              className={styles.checkbox}
              onClick={() => {
                toggleIsInStock();
              }}
              tabIndex={0}
            >
              {isInStock && (
                <span className={`material-icons ${styles.checkboxTickIcon}`}>
                  check
                </span>
              )}
            </div>
          </div>
          <div>
            <div>В наличии</div>
          </div>
        </div>

        <div className={styles.found}>
          <span className={styles.foundTitle}>Найдено:</span>
          <SwitchTransition>
            <CSSTransition
              key={itemsFound}
              timeout={0}
              classNames={{
                enterDone: styles.enterDone,
              }}
            >
              <span className={styles.foundNumber}>{itemsFound}</span>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <ButtonCustom
          onClick={() => {
            resetFilter();
          }}
          styleType={buttonStyleTypes.SECONDARY}
          fullWidth
        >
          Сбросить фильтр
        </ButtonCustom>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  gameTime: selectGameTime,
  isInStock: selectIsInStock,
  playersCount: selectPlayersCount,
  priceLimits: selectPriceLimits,
  debouncedPriceValues: selectDebouncedPriceValues,
  itemsFound: selectItemsFound,
});

const mapDispatchToProps = (dispatch) => ({
  resetFilter: () => dispatch(resetFilter()),
  toggleIsInStock: () => dispatch(toggleIsInStock()),
  setGameTime: (gameTime) => dispatch(setGameTime(gameTime)),
  setPlayersCount: (playersCount) => dispatch(setPlayersCount(playersCount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
