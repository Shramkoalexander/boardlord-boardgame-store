import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import styles from "./footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faTelegramPlane,
  faVk,
} from "@fortawesome/free-brands-svg-icons";
import { selectMainMenuDirectory } from "../../redux/directories/directories.selectors";

function Footer({ mainMenuDirectory }) {
  return (
    <footer className={styles.container}>
      <div className={styles.topSection}>
        <div className="container-lg">
          <ul className={styles.navList}>
            {mainMenuDirectory.map(({ path, title }) => (
              <li key={path} className={styles.navItem}>
                <Link to={`/${path}`} className={styles.navItemText}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-lg">
        <div className={styles.contactInfo}>
          <div className={styles.phoneNumber}>
            <a href="tel:+7000000XX">+7 (000) 000-ХХ</a>
          </div>
          <div className={styles.email}>
            <a href="mailto:boardlord@xxx.com">boardlord@xxx.com</a>
          </div>
          <ul className={styles.socialMediaList}>
            <li className={styles.socialMediaItem}>
              <Link to="/">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className={styles.instFontIcon}
                />
              </Link>
            </li>
            <li className={styles.socialMediaItem}>
              <Link to="/">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className={styles.fbFontIcon}
                />
              </Link>
            </li>
            <li className={styles.socialMediaItem}>
              <Link to="/">
                <FontAwesomeIcon
                  icon={faTelegramPlane}
                  className={styles.fontIcon}
                />
              </Link>
            </li>
            <li className={styles.socialMediaItem}>
              <Link to="/">
                <FontAwesomeIcon icon={faVk} className={styles.fontIcon} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className="container-lg">
          <div className={styles.companyInfo}>&copy; BoardLords, 2020-2020</div>
        </div>
      </div>
    </footer>
  );
}

const mapStateToProps = createStructuredSelector({
  mainMenuDirectory: selectMainMenuDirectory,
});

export default connect(mapStateToProps)(Footer);
