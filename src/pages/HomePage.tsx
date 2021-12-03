import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SearchComponent from "../components/SearchComponent/SearchComponent";
import SearchView from "../components/SearchResults/SearchResults";
import useCountries from "../hooks/useCountries";
import { set } from "../reducers/selectedCountryReducer";
import { RootState } from "../store";
import { Country } from "../utils/models";

export default function Home() {
  const { countriesData } = useCountries();
  const [countriesToShow, setCountriesToShow] = useState<Country[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCountry = useSelector((state: RootState) => state.selectedCountry.country);

  useEffect(() => {
    if (selectedCountry) navigate(`country/${selectedCountry}`);
  }, [navigate, selectedCountry]);

  useEffect(() => {
    dispatch(set(null));
  }, [dispatch]);

  useEffect(() => {
    setCountriesToShow(countriesData.countries);
  }, [countriesData]);

  const handleCountrySelected = (country: Country) => {
    dispatch(set(country.code));
  };

  const handleCountriesFiltering = (countries: Country[]) => {
    setCountriesToShow(countries);
  };

  const handleSubmit = () => {
    if (countriesToShow.length === 1) {
      navigate(`country/${countriesToShow[0].code}`);
    }
  };

  return (
    <>
      <div className="mapTopContainer grid-ce-1 grid-md-ce-2 grid-lg-ce-3 grid-xl-ce-4">
        <SearchComponent countriesData={countriesData} onFilter={handleCountriesFiltering} onSubmit={handleSubmit} />
      </div>
      <SearchView countries={countriesToShow} onCountrySelected={handleCountrySelected} />
    </>
  );
}
