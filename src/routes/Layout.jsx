import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styles from "./Layout.module.css";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
