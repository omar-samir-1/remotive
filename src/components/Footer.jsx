import styles from "./Footer.module.css";
import {
  FaLinkedin,
  FaTwitter,
  FaReddit,
  FaTelegram,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <div className={styles.container}>
      <p>© 2014-2025, made Remotely with ❤️</p>
      <div className={styles.footer}>
        <FaLinkedin className={styles.logo} />
        <FaTwitter className={styles.logo} />
        <FaReddit className={styles.logo} />
        <FaTelegram className={styles.logo} />
        <FaFacebook className={styles.logo} />
        <FaInstagram className={styles.logo} />
      </div>
    </div>
  );
}

export default Footer;
