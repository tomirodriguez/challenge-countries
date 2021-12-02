import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useCountry from "../../hooks/useCountry";
import { set } from "../../reducers/selectedCountryReducer";

export default function CountryView() {
  const { code = "" } = useParams();
  const { loading, countryData } = useCountry(code);
  const dispatch = useDispatch();

  useEffect(() => {
    if (countryData) {
      dispatch(set(countryData));
    }
  }, [dispatch, countryData]);

  return !loading && countryData ? (
    <>
      <div className={`card lateralView`}>
        <h1>{countryData.name}</h1>
      </div>
    </>
  ) : (
    <div>LOADING</div>
  );
}
