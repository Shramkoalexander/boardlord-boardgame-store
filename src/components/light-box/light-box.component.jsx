import React, { useCallback, useEffect } from "react";
import styles from "./light-box.module.scss";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsLightBoxVisible,
  selectCurrentImageIndex,
} from "../../redux/light-box/light-box.selectors";
import {
  hideLightBox,
  increaseCurrentImageIndex,
  decreaseCurrentImageIndex,
  setCurrentImageIndex,
} from "../../redux/light-box/light-box.actions";
import { SwitchTransition, CSSTransition } from "react-transition-group";

function LightBox({
  imageURLs,
  isLightBoxVisible,
  increaseCurrentImageIndex,
  decreaseCurrentImageIndex,
  setCurrentImageIndex,
  currentImageIndex,
  hideLightBox,
}) {
  const circleForward = useCallback(() => {
    if (currentImageIndex < imageURLs.length - 1) {
      increaseCurrentImageIndex();
    } else {
      setCurrentImageIndex(0);
    }
  }, [
    currentImageIndex,
    imageURLs.length,
    increaseCurrentImageIndex,
    setCurrentImageIndex,
  ]);

  const circleBackward = useCallback(() => {
    if (currentImageIndex > 0) {
      decreaseCurrentImageIndex();
    } else {
      setCurrentImageIndex(imageURLs.length - 1);
    }
  }, [
    currentImageIndex,
    decreaseCurrentImageIndex,
    imageURLs.length,
    setCurrentImageIndex,
  ]);

  const onKeyDownHandler = useCallback(
    (e) => {
      switch (e.keyCode) {
        case 37: // LEFT arrow
        case 40: // DOWN arrow
          if (imageURLs.length > 0) {
            e.preventDefault();

            circleBackward();
          }
          break;
        case 39: // RIGHT arrow
        case 38: // UP arrow
          if (imageURLs.length > 0) {
            e.preventDefault();

            circleForward();
          }

          break;
        case 27: // ESC
          hideLightBox();
          break;

        default:
          break;
      }
    },
    [circleBackward, circleForward, hideLightBox, imageURLs.length]
  );

  const handleThumbnailClick = (e) => {
    const newIndex = parseInt(e.currentTarget.dataset.id);

    if (newIndex !== currentImageIndex) setCurrentImageIndex(newIndex);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownHandler);

    return () => {
      document.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [onKeyDownHandler]);

  const nodesToIgnoreEscaping = [];

  const addNodeToIgnoreEscaping = (node) => {
    node && nodesToIgnoreEscaping.push(node);
  };

  const handleClick = useCallback(
    (e) => {
      if (!nodesToIgnoreEscaping.some((node) => node.contains(e.target))) {
        hideLightBox();
      }
    },
    [hideLightBox, nodesToIgnoreEscaping]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick, true);
    window.addEventListener("touchend", handleClick, true);

    return () => {
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("touchend", handleClick, true);
    };
  }, [handleClick]);

  return (
    <CSSTransition
      in={isLightBoxVisible}
      unmountOnExit
      timeout={{
        appear: 0,
        enter: 0,
        exit: 200,
      }}
      appear
      classNames={{
        enterDone: styles.visible,
      }}
      onEntered={() => {
        document.body.style.overflow = "hidden";
      }}
      onExiting={() => {
        document.body.style.overflow = "visible";
      }}
    >
      <div
        className={styles.container}
        onWheel={(e) => {
          e.deltaY < 0 ? circleForward() : circleBackward();
        }}
      >
        <SwitchTransition>
          <CSSTransition
            key={currentImageIndex}
            timeout={{
              appear: 0,
              enter: 0,
              exit: 200,
            }}
            appear
            classNames={{
              appearDone: styles.appearDone,
              enterDone: styles.enterDone,
              exit: styles.exit,
              exitActive: styles.exitActive,
            }}
          >
            <div className={styles.content}>
              <div className={styles.currentImageContainer}>
                <img
                  ref={addNodeToIgnoreEscaping}
                  src={imageURLs[currentImageIndex]}
                  height="450"
                  alt="board game"
                  data-id={currentImageIndex}
                  className={styles.currentImage}
                />

                <button
                  className={styles.arrowLeft}
                  onClick={circleBackward}
                  ref={addNodeToIgnoreEscaping}
                >
                  <span className="material-icons">arrow_back</span>
                </button>
                <button
                  className={styles.arrowRight}
                  onClick={circleForward}
                  ref={addNodeToIgnoreEscaping}
                >
                  <span className="material-icons">arrow_forward</span>
                </button>
              </div>

              <button
                className={styles.closeBtn}
                onClick={hideLightBox}
                ref={addNodeToIgnoreEscaping}
              >
                <span className={`material-icons ${styles.closeIcon}`}>
                  clear
                </span>
              </button>

              <div className={styles.thumbnailsContainer}>
                {imageURLs.map((url, index) => (
                  <div
                    onClick={handleThumbnailClick}
                    data-id={index}
                    key={uniqid()}
                    ref={addNodeToIgnoreEscaping}
                    className={`${styles.thumbnail} ${
                      currentImageIndex === index ? styles.thumbnailActive : ""
                    }`}
                    style={{
                      backgroundImage: `url(${url})`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </CSSTransition>
  );
}

const mapStateToProps = createStructuredSelector({
  isLightBoxVisible: selectIsLightBoxVisible,
  currentImageIndex: selectCurrentImageIndex,
});

const mapDispatchToProps = (dispatch) => ({
  hideLightBox: () => dispatch(hideLightBox()),
  increaseCurrentImageIndex: () => dispatch(increaseCurrentImageIndex()),
  decreaseCurrentImageIndex: () => dispatch(decreaseCurrentImageIndex()),
  setCurrentImageIndex: (newIndex) => dispatch(setCurrentImageIndex(newIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LightBox);
