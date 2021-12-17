/// <reference types='Cypress' />
const countries = require("../fixtures/countries.json");
const albania = require("../fixtures/albania.json");

describe("Browsing challenge", function () {
  beforeEach(() => {
    cy.intercept("https://countries.trevorblades.com/", (req) => {
      const { operationName } = req.body;

      switch (operationName) {
        case "getCountries":
          req.reply((res) => {
            res.send({ data: countries.data });
          });
          break;
        case "Country":
          const { code } = req.body.variables;
          if (code === "AL") {
            req.reply((res) => {
              res.send({ data: albania.data });
            });
          } else req.continue();
          break;
        default:
          req.continue();
          break;
      }
    });
    cy.visit("http://localhost:3000/");
  });

  it("User can browse countries", function () {
    // user search a country
    cy.findByLabelText(/filtered countries list/i)
      .children()
      .should("have.length", 48);
    cy.findByPlaceholderText(/search a country/i).type("Al");

    // list updates
    cy.findByLabelText(/filtered countries list/i)
      .children()
      .should("have.length", 3);

    // user filter continent
    cy.findByText(/filter by continent/i).click({ force: true });
    cy.findByText(/europe/i).click({ force: true });
    cy.findByPlaceholderText(/search a country/i).click();

    // list updates
    cy.findByLabelText(/filtered countries list/i)
      .children()
      .should("have.length", 1);
    cy.findByLabelText(/filtered countries list/i)
      .children()
      .should("have.text", "Albania");

    // user filter currency
    cy.findByText(/filter by currency/i).click({ force: true });
    cy.findByText(/AFN/i).click({ force: true });
    cy.findByPlaceholderText(/search a country/i).click();

    // list updates
    cy.findByLabelText(/filtered countries list/i)
      .children()
      .should("have.length", 0);

    // can remove filter
    cy.findByLabelText(/Remove AFN/i).click({ force: true });
    cy.findByLabelText(/filtered countries list/i)
      .children()
      .should("have.length", 1);
    cy.findByLabelText(/filtered countries list/i)
      .children()
      .should("have.text", "Albania");

    // user select a country
    cy.findByText(/albania/i).click();

    // country info is displayed
    cy.findByText("Albania (AL)").should("exist");
    cy.findByText("Tirana").should("exist");
    cy.findByText("Europe (EU)").should("exist");
    cy.findByText("ALL").should("exist");
    cy.findByText("Albanian (Shqip)").should("exist");

    // user can go back to main page
    cy.findByText(/back to home/i).click();
    cy.findByLabelText(/filtered countries list/i)
      .children()
      .should("have.length", 48);
  });
});
