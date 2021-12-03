import "@testing-library/jest-dom/extend-expect";
import { fireEvent, RenderResult, within } from "@testing-library/react";
import React from "react";
import countriesData from "../../testing/mocks/countries.mock";
import { render } from "../../testing/test-utils";
import SearchComponent from "./SearchComponent";

describe("<SearchComponent />", () => {
  let filterMockHandler = jest.fn();
  let submitMockHandler = jest.fn();
  let component;

  beforeEach(() => {
    component = render(
      <SearchComponent countriesData={countriesData} onFilter={filterMockHandler} onSubmit={submitMockHandler} />
    );
  });

  test("Component filter by name", () => {
    const searchField = component.getByPlaceholderText("Search a country");
    component.getByText("Filter by continent");
    component.getByText("Filter by currency");

    fireEvent.change(searchField, { target: { value: countriesData.countries[0].name } });
    expect(searchField.value).toBe(countriesData.countries[0].name);
    expect(filterMockHandler).toBeCalledWith([countriesData.countries[0]]);
  });
});
