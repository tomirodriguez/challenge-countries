import { ApolloError, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadFinished, willLoad } from "../reducers/loadingDataReducer";
import { Country } from "../utils/models";

const GET_COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      continent {
        code
        name
      }
      currency
      languages {
        code
        name
        native
      }
      capital
    }
  }
`;

export interface CountryDescription extends Country {
  languages: {
    code: string;
    name: string;
    native: string;
  }[];
  capital: string;
}

const useCountry = (
  code: string
): {
  loading: boolean;
  error: ApolloError | undefined;
  countryData: CountryDescription | null;
} => {
  const { loading, error, data } = useQuery(GET_COUNTRY, { variables: { code } });
  const [country, setCountry] = useState<CountryDescription | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) dispatch(willLoad());
  }, [loading, dispatch]);

  useEffect(() => {
    if (data) {
      const { currency, ...otherProps } = data.country;
      const newCountry = { ...otherProps, currencies: currency?.split(",") || [] };
      setCountry(newCountry);
    }

    if (data && !loading) dispatch(loadFinished());
  }, [data, dispatch, loading]);

  return { loading, error, countryData: country };
};

export default useCountry;
