import { CountryDescription } from "../../hooks/useCountry";
import styles from "./CountryDataView.module.scss";

interface PropTypes {
  country: CountryDescription;
}

const Item = ({ title, info }: { title: string; info: string }) => (
  <li className={`d-flex flex-column ai-center jc-center ${styles.item}`}>
    <div className={styles.info}>{info}</div>
    <h4 className={styles.title}>{title}</h4>
  </li>
);

export default function CountryDataView({ country }: PropTypes) {
  return (
    <ul className={`w-100 h-100 d-flex flex-column jc-around ${styles.countryDataView}`}>
      <Item title="Name" info={`${country.name} (${country.code})`} />
      <Item title="Capital" info={country.capital} />
      <Item title="Continent" info={`${country.continent.name} (${country.continent.code})`} />
      <Item title="Currency" info={`${country.currencies.join(",")}`} />
      <li className={`d-flex flex-column ai-center jc-center ${styles.item}`}>
        <div className={styles.info}>
          {country.languages.map((language) => (
            <div className={styles.languages} key={language.code}>{`${language.name} (${language.native})`}</div>
          ))}
        </div>
        <h4 className={styles.title}>Languages</h4>
      </li>
    </ul>
  );
}
