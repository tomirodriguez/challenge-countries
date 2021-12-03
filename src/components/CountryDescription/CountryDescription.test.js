import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { countryExtended } from "../../testing/mocks/countries.mock";
import { render } from "../../testing/test-utils";
import CountryDescription from "./CountryDescription";

describe("<CountryDescription />", () => {
  let component;

  beforeEach(() => {
    component = render(<CountryDescription country={countryExtended} />);
  });

  test("All the country data is displayed", () => {
    component.getByText(`${countryExtended.name} (${countryExtended.code})`);
    component.getByText(countryExtended.capital);
    component.getByText(`${countryExtended.continent.name} (${countryExtended.continent.code})`);
    countryExtended.currencies.forEach((currency) => component.getByText(currency));
    countryExtended.languages.forEach((language) => component.getByText(`${language.name} (${language.native})`));
  });
});
