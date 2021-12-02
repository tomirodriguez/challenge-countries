import { ApolloError, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
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

interface CountryDescription extends Country {
  languages: {
    code: string;
    name: string;
    native: string;
  };
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

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) dispatch(willLoad());
    else dispatch(loadFinished());
  }, [loading, dispatch]);

  return { loading, error, countryData: data?.country || null };
};

export default useCountry;
