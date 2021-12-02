import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { ActionMeta } from "react-select";
import MultiSelect, { Option } from "../components/MultiSelect/MultiSelect";
import SearchInput from "../components/SearchInput/SearchInput";
import WorldMap from "../components/WordlMap/WorldMap";
import useCountries from "../hooks/useCountries";
import useCountriesFilter from "../hooks/useCountriesFilter";
import { set } from "../reducers/selectedCountryReducer";
import { Continent, Country } from "../utils/models";
import CountryView from "../components/CountryDescription/CountryDescription";
import SearchView from "../components/SearchResults/SearchResults";

const MainView = () => {
  const {
    loaded,
    error,
    countriesData: { continents, countries, currencies },
  } = useCountries();

  const [nameFilter, setNameFilter] = useState<string>("");
  const [continentFilter, setContinentFilter] = useState<Continent[]>(continents);
  const [currencyFilter, setCurrencyFilter] = useState<Set<string>>(currencies);
  const countriesToShow = useCountriesFilter({ countries, continentFilter, currencyFilter, nameFilter });
  const dispatch = useDispatch();

  useEffect(() => {
    setContinentFilter(continents);
    setCurrencyFilter(currencies);
  }, [continents, currencies]);

  if (!loaded) return <div>loading</div>;
  if (error) return <div>ERROR</div>;

  const handleContinentFilterChange = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
    const optionsArray = newValue as Option[];
    if (optionsArray.length === 0) setContinentFilter(continents);
    else {
      const newContinents = (newValue as Option[]).map((option) => ({ code: option.value, name: option.label }));
      setContinentFilter(newContinents);
    }
  };

  const handleCurrencyFilterChange = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
    const optionsArray = newValue as Option[];
    if (optionsArray.length === 0) setCurrencyFilter(currencies);
    else {
      const newCurrenciesSet = new Set<string>();
      (newValue as Option[]).forEach((option) => {
        newCurrenciesSet.add(option.value);
      });

      setCurrencyFilter(newCurrenciesSet);
    }
  };

  const handleCountrySelected = (country: Country) => {
    dispatch(set(country));
  };

  return (
    <div className="d-grid grid-template">
      <label htmlFor="searchInput" hidden>
        Search Field
      </label>
      <SearchInput
        name="searchInput"
        containterClassName="grid-ce-1 grid-md-ce-2 grid-lg-ce-3 grid-xl-ce-4"
        onChange={setNameFilter}
        placeholder="Search a country"
      />
      <MultiSelect
        className="grid-ce-2"
        options={continents.map((continent) => ({ value: continent.code, label: continent.name }))}
        placeholder={"Filter by continent"}
        onChange={handleContinentFilterChange}
      />
      <MultiSelect
        className="grid-ce-2"
        options={Array.from(currencies).map((currency) => ({ value: currency, label: currency }))}
        placeholder={"Filter by currency"}
        onChange={handleCurrencyFilterChange}
      />
      <WorldMap className="d-none d-lg-grid grid-lg-ce-2 grid-xl-ce-3" />
      <Routes>
        <Route
          path="/"
          element={<SearchView countries={countriesToShow} onCountrySelected={handleCountrySelected} />}
        />
        <Route path="/country/:code" element={<CountryView />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default MainView;
