import { Link, useParams } from "react-router-dom";
import styles from "./ApplyForJob.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchJobs } from "../store/store";
import lowQualityImg from "../assets/headOfPeopleLowQuality.jpg";
import highQualityImg from "../assets/headOfPeopleHighQuality.jpeg";

function ApplyForJob() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
  });
  const [fileName, setFileName] = useState("Upload File");
  const [img, setImg] = useState(lowQualityImg);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const jobStatus = useSelector(function (state) {
    return state.jobs.status;
  });

  const jobs = useSelector(function (state) {
    return state.jobs.data;
  });

  const job = jobs.find(function (v) {
    return v.id === Number(id);
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, resume: file }));
    setFileName(file ? file.name : "Upload File");
  }

  const handleSubmitting = function (e) {
    e.preventDefault();
    setIsSubmitted(true);
  };

  useEffect(function () {
    window.setTimeout(function () {
      if (!jobs.length) dispatch(fetchJobs());
    }, 500);
  }, []);

  useEffect(function () {
    const highImg = new Image();
    highImg.src = highQualityImg;
    highImg.onload = function () {
      setImg(highQualityImg);
    };
  }, []);
  document.title = `Remotive${
    job?.jobTitle ? " - " + job.jobTitle : " - Apply Now"
  }`;
  if (jobStatus === "idle" || jobStatus === "loading") {
    return (
      <div className={styles.loadingSpinnerContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }
  if (jobStatus === "succeeded" || jobStatus === "failed")
    if (!job) {
      return (
        <div className={styles.errorContainer}>
          <h2>Job not found</h2>
          <p>An unexpected issue occurred. Please try again later.</p>

          <p>
            for exploring more remote jobs please
            <Link to="/" className={styles.backToHomePageBtn}>
              click here
            </Link>
          </p>
        </div>
      );
    }
  if (jobStatus === "succeeded")
    if (job)
      return (
        <div className={styles.container}>
          {isSubmitted && (
            <div className={styles.successMessageContainer}>
              <div className={styles.successMessage}>
                <h2>Form submitted successfully!</h2>
                <p>want to explore more remote jobs ?</p>
                <Link to="/" className={styles.navigateToHomepageBtn}>
                  Click Here
                </Link>
              </div>
            </div>
          )}
          {!isSubmitted && (
            <div className={styles.subContainer}>
              <form
                className={styles.applicationFormContainer}
                onSubmit={handleSubmitting}
              >
                <div className={styles.applicationFormHeader}>
                  <h3>Application form </h3>
                  <p>
                    Apply for the job by filling the job application form with
                    your details
                  </p>
                  {job ? (
                    <p className={styles.titlePlusCompany}>
                      (Applying for {job.jobTitle}) @ {job.company}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.entriesContainer}>
                  <div className={styles.entry}>
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.entry}>
                    <label>Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.entry}>
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.entry}>
                    <label>Position Applied For</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.entry}>
                    <span>Resume</span>
                    <label htmlFor="cv">{fileName}</label>
                    <input
                      type="file"
                      id="cv"
                      onChange={handleFileChange}
                      required
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                </div>
                <button type="submit" className={styles.applyBtn}>
                  Apply
                </button>
              </form>
              <div className={styles.headOfPeopleContainer}>
                <img
                  src={img}
                  alt="headOfPeople"
                  className={`${styles.headOfPeople} ${
                    img === lowQualityImg ? styles.blur : ""
                  }`}
                />
              </div>
            </div>
          )}
        </div>
      );
}

export default ApplyForJob;
