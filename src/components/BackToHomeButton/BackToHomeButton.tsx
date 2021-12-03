import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { set } from "../../reducers/selectedCountryReducer";
import styles from "./BackToHomeButton.module.scss";

const BackToHomeButton = () => {
  const dispatch = useDispatch();

  const handleBackToHome = () => {
    dispatch(set(null));
  };

  return (
    <Link className={`d-flex ai-center ${styles.backButton}`} to="/" onClick={handleBackToHome}>
      <FontAwesomeIcon className={styles.backIcon} icon={faChevronLeft} width="10px" height="10px" />
      <span>Back to Home</span>
    </Link>
  );
};

export default BackToHomeButton;
