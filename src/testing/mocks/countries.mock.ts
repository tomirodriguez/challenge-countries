import { CountryDescription } from "../../hooks/useCountry";
import worldData from "./world.mock.json";

export const continents = worldData.continents;
export const countries = worldData.countries;

const currenciesArray: string[] = [];
countries.forEach((country) => country.currencies.forEach((currency) => currenciesArray.push(currency)));
export const currencies = new Set(currenciesArray);
worldData.currencies = currencies;
export default worldData;

export const countryExtended: CountryDescription = {
  ...countries[0],
  capital: "CAPITAL",
  languages: [
    { code: "LA", name: "Language", native: "langu" },
    { code: "EL", name: "Otro", native: "Otrola" },
  ],
};
