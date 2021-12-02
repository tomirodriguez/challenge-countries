import { useEffect, useState } from "react";
import { ActionMeta } from "react-select";
import { CountriesData } from "../../hooks/useCountries";
import useCountriesFilter from "../../hooks/useCountriesFilter";
import { Continent, Country } from "../../utils/models";
import MultiSelect, { Option } from "../MultiSelect/MultiSelect";
import SearchInput from "../SearchInput/SearchInput";

interface PropTypes {
  countriesData: CountriesData;
  onFilter: (countries: Country[]) => void;
}

const sortAlphabetically = (a: Option, b: Option) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
};

export default function SearchComponent({ countriesData, onFilter }: PropTypes) {
  const { countries, currencies, continents } = countriesData;
  const [nameFilter, setNameFilter] = useState<string>("");
  const [continentFilter, setContinentFilter] = useState<Continent[]>(continents);
  const [currencyFilter, setCurrencyFilter] = useState<Set<string>>(currencies);
  const countriesToShow = useCountriesFilter({ countries, continentFilter, currencyFilter, nameFilter });

  useEffect(() => {
    setContinentFilter(continents);
    setCurrencyFilter(currencies);
  }, [continents, currencies]);

  useEffect(() => {
    onFilter(countriesToShow);
  }, [countriesToShow, onFilter]);

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
  return (
    <div className="d-grid grid-col-2">
      <label htmlFor="searchInput" hidden>
        Search Field
      </label>
      <div className="grid-ce-2">
        <SearchInput name="searchInput" onChange={setNameFilter} placeholder="Search a country" />
      </div>
      <MultiSelect
        options={continents
          .map((continent) => ({ value: continent.code, label: continent.name }))
          .sort(sortAlphabetically)}
        placeholder={"Filter by continent"}
        onChange={handleContinentFilterChange}
      />
      <MultiSelect
        options={Array.from(currencies)
          .map((currency) => ({ value: currency, label: currency }))
          .sort(sortAlphabetically)}
        placeholder={"Filter by currency"}
        onChange={handleCurrencyFilterChange}
      />
    </div>
  );
}
