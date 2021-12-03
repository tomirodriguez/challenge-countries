import "@testing-library/jest-dom/extend-expect";
import { fireEvent, within } from "@testing-library/react";
import React from "react";
import { countries } from "../../testing/mocks/countries.mock";
import { render } from "../../testing/test-utils";
import SearchResults from "./SearchResults";

describe("<SearchResults />", () => {
  let mockHandler = jest.fn();
  let component;

  beforeEach(() => {
    component = render(<SearchResults countries={countries.slice(0, 3)} onCountrySelected={mockHandler} />);
  });

  test("Countries filtered render items correctly", () => {
    const list = component.getByLabelText("Filtered countries list");
    countries.slice(0, 3).forEach((country) => {
      within(list).getByText(country.name);
      expect(component.getByLabelText(`${country.name} link`)).toHaveAttribute("href", `/country/${country.code}`);
    });
  });

  test("If country click, the country selected will change", () => {
    const countryItem = component.getByText(countries[0].name);
    fireEvent.click(countryItem);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toBeCalledWith(countries[0]);
  });
});
