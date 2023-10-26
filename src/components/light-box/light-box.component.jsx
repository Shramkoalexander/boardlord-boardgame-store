import React, {useCallback, useEffect, useState} from "react";
import styles from "./light-box.module.scss";
import {CSSTransition, SwitchTransition} from "react-transition-group";

function LightBox({
  imageURLs,
  open,
  onClose,
  onChangeImage,
  currentImageIndex,
}) {
  const [isMoving, setIsMoving] = useState(false);
  const [initialTouchPosition, setInitialTouchPosition] = useState(null);

  const circleForward = useCallback(() => {
    if (currentImageIndex < imageURLs.length - 1) {
      onChangeImage(currentImageIndex + 1);
    } else  {
      onChangeImage(0)
    }
  }, [
    currentImageIndex,
    imageURLs.length,
    onChangeImage,
  ]);

  const circleBackward = useCallback(() => {
    if (currentImageIndex > 0) {
      onChangeImage(currentImageIndex - 1 );
    } else {
      onChangeImage(imageURLs.length - 1);
    }
  }, [
    currentImageIndex,
    imageURLs.length,
    onChangeImage,
  ]);

  const handleKeyDown = useCallback(
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
          onClose();
          break;

        default:
          break;
      }
    },
    [circleBackward, circleForward, onClose, imageURLs.length]
  );

  const handleThumbnailClick = (e) => {
    const newIndex = parseInt(e.currentTarget.dataset.id);

    if (newIndex !== currentImageIndex) onChangeImage(newIndex);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const nodesToIgnoreEscaping = [];

  const addNodeToIgnoreEscaping = (node) => {
    node && nodesToIgnoreEscaping.push(node);
  };

  const handleClick = useCallback(
    (e) => {
      if (
        !nodesToIgnoreEscaping.some((node) => node.contains(e.target)) &&
        !isMoving
      ) {
        onClose();
      }
      setIsMoving(false);
    },
    [onClose, isMoving, nodesToIgnoreEscaping]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isMoving) {
        setIsMoving(true);
        const touchX = e.changedTouches[0].pageX;
        let diff = initialTouchPosition - touchX;

        if (diff > 0) {
          circleBackward();
        } else {
          circleForward();
        }
      }
    },
    [circleBackward, circleForward, initialTouchPosition, isMoving]
  );

  const handleTouchStart = useCallback((e) => {
    const touchX = e.changedTouches[0].pageX;
    setInitialTouchPosition(touchX);
  }, []);

  return (
    <CSSTransition
      in={open}
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
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleClick}
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
                onClick={onClose}
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
                    key={url}
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
export default LightBox;
