import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CountryDataView from "../../components/CountryDescription";
import LoadingScreen from "../../components/LoadingScreen";
import useCountry from "../../hooks/useCountry";
import { set } from "../../reducers/selectedCountryReducer";
import { RootState } from "../../store";
import styles from "./styles.module.scss";

export default function CountryView() {
  const { code = "" } = useParams();
  const { countryData } = useCountry(code);
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state: RootState) => state.selectedCountry.country);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (countryData) {
      dispatch(set(countryData.code));
    }
  }, [dispatch, countryData]);

  useEffect(() => {
    if (!pageLoaded && selectedCountry === code) {
      setPageLoaded(true);
    }
  }, [selectedCountry, code, pageLoaded]);

  useEffect(() => {
    if (pageLoaded && selectedCountry !== code) {
      dispatch(set(selectedCountry));
      const route = selectedCountry ? `/country/${selectedCountry}` : "/";
      navigate(route);
    }
  }, [navigate, dispatch, selectedCountry, code, pageLoaded]);

  const handleBackToHome = () => {
    dispatch(set(null));
  };

  return (
    <>
      <div className="topHeaderContainer grid-ce-1 grid-md-ce-2 grid-lg-ce-3 grid-xl-ce-4 d-flex flex-column">
        <Link className={`d-flex ai-center ${styles.backButton}`} to="/" onClick={handleBackToHome}>
          <FontAwesomeIcon className={styles.backIcon} icon={faChevronLeft} width="10px" height="10px" />
          <span>Back to Home</span>
        </Link>
        {countryData && (
          <div className={`d-flex ai-center ${styles.title}`}>
            <h2>{countryData.continent.name}</h2>
            <span>-</span>
            <h1>{countryData.name}</h1>
            <h3>({countryData.code})</h3>
          </div>
        )}
      </div>
      <div className={`card lateralView`}>
        {countryData && <CountryDataView country={countryData} />}
        <LoadingScreen />
      </div>
    </>
  );
}
