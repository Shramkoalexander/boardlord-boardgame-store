import React, { useCallback, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { useEffect } from "react";
import styles from "./scroll-to-top.module.scss";

function ScrollToTop() {
  const [needReveal, setNeedReveal] = useState(false);
  const revealOffset = 400;
  const handleScroll = useCallback(() => {
    if (window.pageYOffset >= revealOffset) {
      setNeedReveal(true);
    } else {
      setNeedReveal(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    needReveal && (
      <button
        className={styles.btn}
        onClick={() =>
          scroll.scrollToTop({ duration: 300, smooth: "easeInOutQuad" })
        }
      >
        <i className="material-icons">expand_less</i>
      </button>
    )
  );
}

export default ScrollToTop;
