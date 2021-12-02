import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchComponent from "../components/SearchComponent/SearchComponent";
import SearchView from "../components/SearchResults/SearchResults";
import useCountries from "../hooks/useCountries";
import { set } from "../reducers/selectedCountryReducer";
import { Country } from "../utils/models";

export default function Home() {
  const { loaded, error, countriesData } = useCountries();
  const [countriesToShow, setCountriesToShow] = useState<Country[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCountriesToShow(countriesData.countries);
  }, [countriesData]);

  if (!loaded) return <div>loading</div>;
  if (error) return <div>ERROR</div>;

  const handleCountrySelected = (country: Country) => {
    dispatch(set(country));
  };

  const handleCountriesFiltering = (countries: Country[]) => {
    setCountriesToShow(countries);
  };

  return (
    <>
      <div className="mapTopContainer grid-ce-1 grid-md-ce-2 grid-lg-ce-3 grid-xl-ce-4">
        <SearchComponent countriesData={countriesData} onFilter={handleCountriesFiltering} />
      </div>
      <SearchView countries={countriesToShow} onCountrySelected={handleCountrySelected} />
    </>
  );
}
