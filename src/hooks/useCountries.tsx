import { ApolloError, useQuery } from "@apollo/client";
import { log } from "console";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { willLoad, loadFinished } from "../reducers/loadingDataReducer";
import { Continent, Country, CountryDTO } from "../utils/models";

const GET_COUNTRIES = gql`
  query getCountries {
    countries {
      code
      name
      continent {
        code
        name
      }
      currency
    }
  }
`;

export interface CountriesData {
  countries: Country[];
  continents: Continent[];
  currencies: Set<string>;
}

const useCountries = (): {
  loaded: boolean;
  error: ApolloError | undefined;
  countriesData: CountriesData;
} => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [countriesData, setCountriesData] = useState<CountriesData>({
    countries: [],
    continents: [],
    currencies: new Set(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) dispatch(willLoad());
    else dispatch(loadFinished());
  }, [loading, dispatch]);

  useEffect(() => {
    if (data) {
      let continentsHash: { [id: string]: string } = {};
      const currenciesSet = new Set<string>();

      const countries: Country[] = data?.countries.map((country: CountryDTO) => {
        const { continent, currency, ...otherProps } = country;
        continentsHash[continent.code] = continent.name;
        const difCurrencies = currency?.split(",") || [];
        difCurrencies.forEach((currency) => currenciesSet.add(currency));
        return { continent, ...otherProps, currencies: difCurrencies };
      });

      setCountriesData({
        countries: countries,
        currencies: currenciesSet,
        continents: Object.entries(continentsHash).map(([code, name]) => ({ code, name })),
      });
      setLoaded(true);
    }

    if (!loading && !data) setLoaded(true);
  }, [data, loading]);

  return {
    loaded,
    error,
    countriesData,
  };
};

export default useCountries;
