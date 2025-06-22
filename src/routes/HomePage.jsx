import Jobs from "../components/Jobs";
import styles from "./HomePage.module.css";
import SearchSuggestions from "../components/SearchSuggestions";
import CountryFilter from "../components/CountryFilter";
function HomePage() {
  document.title = "Remotive - Homepage";
  return (
    <div className={styles.container}>
      <div className={styles.sectionOne}>
        <div>
          <h1 className={styles.title}>
            Find your dream remote job without the hassle
          </h1>
          <p className={styles.description}>
            Remotive is where top talents go to easily access active and fully
            remote job opportunities from vetted tech companies.
          </p>
        </div>
        <div className={styles.seperator}></div>
        <SearchSuggestions />
      </div>

      <div className={styles.sectionTwo}>
        <CountryFilter />
        <Jobs />
      </div>
    </div>
  );
}

export default HomePage;
