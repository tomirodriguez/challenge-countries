import { useMemo } from "react";
import { Continent, Country } from "../utils/models";

interface PropTypes {
  countries: Country[];
  continentFilter: Continent[];
  currencyFilter: Set<string>;
  nameFilter: string
}

const useCountriesFilter = ({ countries, continentFilter, currencyFilter, nameFilter }: PropTypes) => {
  return useMemo(() => {
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        continentFilter.find((continent) => country.continent.code === continent.code) &&
        country.currencies.find((currency) => currencyFilter.has(currency))
    );
  }, [nameFilter, countries, continentFilter, currencyFilter]);
};

export default useCountriesFilter;
