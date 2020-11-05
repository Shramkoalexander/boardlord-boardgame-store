import React, { useState, useCallback } from "react";
import styles from "./option-selector.module.scss";
import { useEffect } from "react";
import uniqid from "uniqid";
import EscapeOutsideWrapper from "../escape-outside/escape-outside-wrapper.component";
import useHistoryChange from "../../custom-hooks/useHistoryChange";

function OptionSelector({ options, onChange, disabled = false }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentOption, setCurrentOption] = useState(options[0]);
  const INITIAL_LIST_ITEM_INDEX = -1;
  const [currentListItemIndex, setCurrentListItemIndex] = useState(
    INITIAL_LIST_ITEM_INDEX
  );

  const resetCurrentListItemIndex = useCallback(() => {
    setCurrentListItemIndex(INITIAL_LIST_ITEM_INDEX);
  }, [INITIAL_LIST_ITEM_INDEX]);

  const increaseCurrentListItemIndex = () => {
    setCurrentListItemIndex((prevState) => prevState + 1);
  };

  const decreaseCurrentListItemIndex = () => {
    setCurrentListItemIndex((prevState) => prevState - 1);
  };

  const hideDropdown = useCallback(() => {
    setIsDropdownVisible(false);
  }, []);

  const handleOptionSet = useCallback(
    (option) => {
      setCurrentOption(option);
      hideDropdown();
    },
    [hideDropdown]
  );

  const handleOnChange = useCallback(onChange, []);

  useEffect(() => {
    handleOnChange(currentOption.value);
  }, [currentOption.value, handleOnChange]);

  useEffect(() => {
    !isDropdownVisible && resetCurrentListItemIndex();
  }, [isDropdownVisible, resetCurrentListItemIndex]);

  useHistoryChange(() => {
    handleOptionSet(options[0]);
  });

  return (
    <EscapeOutsideWrapper onEscapeOutside={hideDropdown}>
      <div className={styles.container}>
        {!disabled ? (
          <div
            name={currentOption.value}
            className={styles.currentOption}
            tabIndex={0}
            onClick={() => {
              if (isDropdownVisible) {
                setIsDropdownVisible(false);
              } else {
                setIsDropdownVisible(true);
              }
            }}
            onKeyDown={(e) => {
              switch (e.keyCode) {
                case 40: // DOWN arrow
                  e.preventDefault();
                  if (currentListItemIndex < options.length - 1) {
                    increaseCurrentListItemIndex();
                  } else {
                    setCurrentListItemIndex(0);
                  }

                  break;
                case 38: // UP arrow
                  e.preventDefault();
                  if (currentListItemIndex > 0) {
                    decreaseCurrentListItemIndex();
                  } else {
                    setCurrentListItemIndex(options.length - 1);
                  }

                  break;
                case 13: // Enter key
                  currentListItemIndex >= 0
                    ? handleOptionSet(options[currentListItemIndex])
                    : isDropdownVisible
                    ? hideDropdown()
                    : setIsDropdownVisible(true);
                  break;
                default:
                  break;
              }
            }}
          >
            {currentOption.text}
          </div>
        ) : (
          <div className={styles.disabled}>{currentOption.text}</div>
        )}
        {isDropdownVisible && (
          <div className={styles.dropdown}>
            {options.map(({ value, text }, index) => (
              <div
                key={uniqid()}
                name={value}
                onMouseEnter={() => setCurrentListItemIndex(index)}
                onMouseLeave={() => resetCurrentListItemIndex()}
                onClick={() => {
                  handleOptionSet(options[currentListItemIndex]);
                }}
                className={`${styles.option} ${
                  index === currentListItemIndex && styles.optionActive
                }`}
              >
                {text}
              </div>
            ))}
          </div>
        )}
      </div>
    </EscapeOutsideWrapper>
  );
}

export default OptionSelector;
