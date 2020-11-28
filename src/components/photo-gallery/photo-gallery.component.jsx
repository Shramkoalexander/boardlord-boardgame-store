import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import styles from "./photo-gallery.module.scss";
import LightBox from "../light-box/light-box.component";
import { connect } from "react-redux";
import {
  showLightBox,
  setCurrentImageIndex,
} from "../../redux/light-box/light-box.actions";
import range from "lodash.range";

function PhotoGallery({ imageName, showLightBox, setCurrentImageIndex }) {
  const imagesCount = 4;

  const [imageURLs, setImageURLs] = useState([]);

  const handleOnClick = (e) => {
    showLightBox();
    setCurrentImageIndex(parseInt(e.currentTarget.dataset.id));
  };

  useEffect(() => {
    try {
      const URLsToAdd = [];
      const mainImageUrl = require(`../../assets/images/boardgames/${imageName}/${imageName}.jpg`);
      URLsToAdd.push(mainImageUrl);
      range(1, imagesCount).forEach((imgNumber) => {
        try {
          const url = require(`../../assets/images/boardgames/${imageName}/${imageName}_${imgNumber}.jpg`);
          URLsToAdd.push(url);
        } catch (error) {
          console.error(error.message);
        }
      });

      setImageURLs(URLsToAdd);
    } catch (error) {
      console.error(error.message);
    }
  }, [imageName]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainImageWrapper}>
          <img
            src={imageURLs[0]}
            alt="board game"
            onClick={handleOnClick}
            data-id={0}
            className={styles.mainImage}
          />
        </div>

        <div className={styles.extraImagesContainer}>
          {imageURLs.slice(1).map((url, index) => (
            <div
              key={uniqid()}
              onClick={handleOnClick}
              data-id={index + 1}
              className={styles.extraImage}
              style={{
                backgroundImage: `url(${url})`,
              }}
            ></div>
          ))}
        </div>
      </div>
      {<LightBox imageURLs={imageURLs} />}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  showLightBox: () => dispatch(showLightBox()),
  setCurrentImageIndex: (newIndex) => dispatch(setCurrentImageIndex(newIndex)),
});

export default connect(null, mapDispatchToProps)(PhotoGallery);
