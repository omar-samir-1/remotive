import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchSuggestions.module.css";
import { selectedIndustrySlice } from "../store/store";
function SearchSuggestions() {
  const dispatch = useDispatch();
  const jobIndustries = [
    "Sales",
    "Design",
    "Writing",

    "Customer Service",
    "Marketing",

    "Software Development",
    "Finance / Legal",
    "Project Management",
    "Data Analysis",
    "Human Resources",
  ];

  const handleSelection = function (e) {
    dispatch(
      selectedIndustrySlice.actions.addSelectedIndustry(e.target.dataset.value)
    );
  };

  const selectedIndustry = useSelector(function (state) {
    return state.selectedIndustry;
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.suggestionsTitle}>Select Your Job Industry</h2>
      <div className={styles.searchSuggestionsContainer}>
        {jobIndustries.map(function (v, i) {
          const isSelected = selectedIndustry.some((value) => value === v);

          return (
            <div
              onClick={handleSelection}
              data-value={v}
              key={i}
              className={`${styles.suggestion} ${
                isSelected ? styles.selectedSuggestion : ""
              }`}
            >
              {v}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchSuggestions;
