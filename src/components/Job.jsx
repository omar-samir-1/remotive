import PropTypes from "prop-types";
import styles from "./Job.module.css";

import { useNavigate } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";

function Job({ data }) {
  const navigate = useNavigate();
  const date = new Date(data.time);
  const relative = formatDistanceToNowStrict(date, { addSuffix: false });

  const handleCardClick = (e) => {
    // Prevent navigating if a button inside the card is clicked
    if (e.target.closest("button")) return;
    navigate(`jobDetail/${data.id}`);
  };

  return (
    <div className={styles.container} onClick={handleCardClick}>
      <div className={styles.cardLeftSide}>
        <img
          src={`../../public/logos/${data.logo_number_id}.jpg`}
          alt="Company Logo"
          className={styles.logo}
        />
        <div className={styles.cardLeftSideContent}>
          <div className={styles.header}>
            <h3>
              {data.jobTitle}
              <span className={styles.separator}>*</span>
              {data.company}
            </h3>
          </div>
          <div className={styles.fields}>
            {data.location.map((country, i) => (
              <span className={styles.field} key={i}>
                {country}
              </span>
            ))}
            <span className={styles.field}>{data.industry}</span>
            <span className={styles.field}>{data.salary}</span>
          </div>
        </div>
      </div>
      <div className={styles.cardrightSide}>
        <span className={styles.time}>{relative} ago</span>
        <div className={styles.buttons}>
          <button
            className={styles.applyBtn}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`applyForJob/${data.id}`);
            }}
          >
            Apply Now
          </button>
          <button
            className={styles.moreDetailsBtn}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`jobDetail/${data.id}`);
            }}
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
}

Job.propTypes = {
  data: PropTypes.shape({
    jobTitle: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.arrayOf(PropTypes.string).isRequired,
    industry: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    logo_number_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Job;
