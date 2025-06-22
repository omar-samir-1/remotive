import { useEffect, useState } from "react";
import Job from "./Job";
import styles from "./Jobs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../store/store";

function Jobs() {
  const [numberOfDisplayJobs, setNumberOfDisplayJobs] = useState(5);
  const [sorting, setSorting] = useState({
    isSorting: false,
    sortingBy: "None",
  });
  const dispatch = useDispatch();

  //subscription to the jobs state
  const jobs = useSelector(function (state) {
    return state.jobs.data;
  });
  const jobsStatus = useSelector(function (state) {
    return state.jobs.status;
  });

  //subscription to the selectedIndustry state
  const selectedIndustry = useSelector(function (state) {
    return state.selectedIndustry;
  });
  //subscription to the selectedCountry state
  const selectedCountries = useSelector(function (state) {
    return state.selectedCountry;
  });

  ///////////////////////////////// FIRST STAGE : FILTERING ///////////////////////////////////////
  let filteredJobs = [];

  const locationFilter = function () {
    filteredJobs = jobs.filter(function (job) {
      return job.location.some(function (jobCountry) {
        return selectedCountries.some(function (selectedCountry) {
          return selectedCountry === jobCountry;
        });
      });
    });
  };

  const industryFilter = function () {
    filteredJobs = jobs.filter(function (value) {
      return selectedIndustry.some((v) => v === value.industry);
    });
  };

  const industryPlusLocationFilter = function () {
    // 1st : Filter by location
    filteredJobs = jobs.filter(function (job) {
      return job.location.some(function (jobCountry) {
        return selectedCountries.some(function (selectedCountry) {
          return selectedCountry === jobCountry;
        });
      });
    });
    // 2nd : Filter by industry
    filteredJobs = filteredJobs.filter(function (value) {
      return selectedIndustry.some((v) => v === value.industry);
    });
  };

  if (jobs.length) {
    if (selectedIndustry.length > 0 && selectedCountries.length > 0) {
      industryPlusLocationFilter();
    } else if (selectedIndustry.length > 0) {
      industryFilter();
    } else if (selectedCountries.length > 0) {
      locationFilter();
    } else {
      filteredJobs = jobs;
    }
  }

  ///////////////////////////////// SECOND STAGE : SORTING ///////////////////////////////////////
  let sortedJobs = [];
  if (sorting.isSorting) {
    sortedJobs = [...filteredJobs];
    if (sorting.sortingBy === "Newest") {
      if (filteredJobs.length > 0) {
        sortedJobs.sort(function (a, b) {
          return new Date(b.time) - new Date(a.time);
        });
      }
    }
  } else {
    sortedJobs = filteredJobs;
  }
  let finalJobs = [];
  finalJobs = sortedJobs;

  useEffect(function () {
    dispatch(fetchJobs());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Recent Jobs</h2>
        {finalJobs.length ? (
          <div className={styles.sortingContainer}>
            <label>Sort by</label>
            <select 
              className={styles.select}
              value={sorting.sortingBy}
              onChange={(e) => {
                if (e.target.value === "None") {
                  setSorting({
                    isSorting: false,
                    sortingBy: e.target.value,
                  });
                } else {
                  setSorting({
                    isSorting: true,
                    sortingBy: e.target.value,
                  });
                }
              }}
            >
              <option value="None">None</option>
              <option value="Newest">Newest</option>
            </select>
          </div>
        ) : (
          ""
        )}
      </div>

      {finalJobs.length ? (
        finalJobs
          .slice(0, numberOfDisplayJobs)
          .map((job) => <Job key={job.id} data={job} />)
      ) : jobsStatus === "loading" ? (
        <div className={styles.loading}>
          <p>Loading...</p>
        </div>
      ) : (
        <div className={styles.noJobsFound}>
          <p>No jobs found</p>
        </div>
      )}

      {numberOfDisplayJobs < finalJobs.length ? (
        <button
          className={styles.loadMoreButton}
          onClick={() => {
            setNumberOfDisplayJobs((prev) => prev + 5);
          }}
        >
          Load More
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Jobs;
