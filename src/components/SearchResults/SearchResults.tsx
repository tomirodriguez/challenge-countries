import { Link } from "react-router-dom";
import { Country } from "../../utils/models";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import styles from "./SearchResults.module.scss";

interface PropTypes {
  countries: Country[];
  onCountrySelected: (country: Country) => void;
}

export default function SearchView({ countries, onCountrySelected }: PropTypes) {
  return (
    <div className={`d-flex card lateralView ${styles.searchView}`} style={{ position: "relative" }}>
      <ul className="w-100">
        {countries.map((country) => {
          return (
            <li key={country.code} onClick={() => onCountrySelected(country)}>
              <Link className="d-flex" to={`country/${country.code}`}>
                {country.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <LoadingScreen />
    </div>
  );
}
