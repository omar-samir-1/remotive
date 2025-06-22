import styles from "./CountryFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectedCountrySlice } from "../store/store";
const countries = [
  "Canada",
  "United States",
  "Germany",
  "Australia",
  "United Kingdom",
  "India",
  "Japan",
  "Any Country",
];

function CountryFilter() {
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state) => state.selectedCountry);

  return (
    <div className={styles.container}>
      <h3>I want to work remotely from..</h3>
      <ul className={styles.countriesList}>
        {countries.map((v, i) => (
          <div className={styles.countryOptionContainer} key={i}>
            <input
              type="checkbox"
              checked={selectedCountry.some((country) => country === v)}
              onChange={() => {
                dispatch(selectedCountrySlice.actions.addSelectedCountry(v));
              }}
            />
            <li>{v}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default CountryFilter;
