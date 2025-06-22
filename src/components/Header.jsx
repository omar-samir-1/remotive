import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
function Header() {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
    </div>
  );
}

export default Header;
