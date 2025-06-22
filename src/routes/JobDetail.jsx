import styles from "./JobDetail.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function JobDetail() {
  const { id } = useParams();
  const [jobData, setJobData] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(function () {
    window.setTimeout(() => {
      fetch("../../detailedJobs.json")
        .then((res) => res.json())
        .then((data) => {
          setIsLoaded(true);
          const theJob = data.find((job) => Number(job.id) === Number(id));
          setJobData(theJob);
        })
        .catch((err) => {
          console.error(err);
          setIsLoaded(true);
          setJobData("");
        });
    }, 500);
  }, []);

  let date;
  if (jobData) date = new Date(jobData.date).toDateString();
  document.title = `Remotive${
    jobData?.title ? " - " + jobData.title : " - Job Details"
  }`;
  if (!isLoaded)
    return (
      <div className={styles.loadingSpinnerContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  if (!jobData)
    return (
      <div className={styles.errorContainer}>
        <h1>Job Not Found</h1>
        <p>The job you are looking for does not exist or has been removed.</p>
        <Link to="/" className={styles.navigationBackBtn}>
          Back to Remote Jobs
        </Link>
      </div>
    );
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.leftSideContainer}>
          <div className={styles.backContainer}>
            <Link to="/" className={styles.backBtn}>
              {" "}
              &#8592; Back to REMOTE JOBS
            </Link>
          </div>
          <div className={styles.jobDetailContainer}>
            <div className={styles.jobDetailHeaderContainer}>
              <h1>[Hiring] {jobData.title}</h1>
              <p>{jobData.summary}</p>
            </div>

            <div>
              <h3>Description:</h3>
              <p>{jobData.description}</p>
            </div>

            <div className={styles.jobRequirements}>
              <h3>Job Requirements:</h3>
              <ul>
                {jobData.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.jobResponsibilities}>
              <h3>Main responsibilities of the position:</h3>
              <ul>
                {jobData.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3>About The Company</h3>
              <div className={styles.aboutCompanyContainer}>
                <div>
                  {" "}
                  <img
                    alt="ig"
                    src={`../../public/logos/${jobData.logo_number_id}.jpg`}
                  />
                  <h3>{jobData.company.name}</h3>
                </div>

                <p>{jobData.company.about}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSideContainer}>
          <div className={styles.rightSideSubContainer}>
            <div className={styles.rightSideHeader}>
              <img
                src={`../../public/logos/${jobData.logo_number_id}.jpg`}
                alt="company logo"
                className={styles.rightSideHeaderLogo}
              />
              <p className={styles.position}>{jobData.title}</p>
              <p className={styles.company}>@{jobData.company.name}</p>
            </div>
            <div className={styles.rightSideBody}>
              <div className={styles.rightSideEntriesContainer}>
                <div className={styles.industryContainer}>
                  <p className={styles.industry}>{jobData.industry}</p>
                </div>
                <div className={styles.entry}>
                  <label className={styles.label}>Salary</label>
                  <p className={styles.field}>{jobData.salary}</p>
                </div>
                <div className={styles.entry}>
                  <label className={styles.label}>Location</label>
                  <p className={styles.field}>{jobData.location.join(" - ")}</p>
                </div>

                <div className={styles.entry}>
                  <label className={styles.label}>Job Type</label>
                  <p className={styles.field}>Full Time</p>
                </div>
                <div className={styles.entry}>
                  <label className={styles.label}>Posted</label>
                  <p className={styles.field}>{date}</p>
                </div>
              </div>
            </div>
            <div className={styles.applyButtonContainer}>
              <Link to={`/applyForJob/${jobData.id}`}>
                <button className={styles.applyButton}>
                  Apply For This Position
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
