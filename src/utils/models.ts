export interface Continent {
  code: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  continent: Continent;
  currencies: string[];
}

export interface CountryDTO {
  code: string;
  name: string;
  continent: Continent;
  currency: string;
}
