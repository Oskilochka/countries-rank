import React from "react";
import { Layout } from "../../components/Layout/Layout";
import styles from "./Country.module.css";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);

  return await res.json();
};
const Country = ({ country }) => {
  const [ borders, setBorders ] = React.useState([]);

  const getBorders = async () => {
    const borders = await Promise?.all(country.borders?.map((border) => getCountry(border)));
    setBorders(borders);
  };

  React.useEffect(() => {
    country?.borders?.length && getBorders();
  }, [ country ]);

  return (<Layout title={country.name}>
    <div className={styles.container}>
      <MainInfo country={country} />
      <Details borders={borders} country={country} />
    </div>
  </Layout>);
};
export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};

const MainInfo = ({ country }) =>
  (<div className={styles.left}>
    <div className={styles.wrap}>
      <img src={country?.flag} alt={country.name} />
      <h1 className={styles.name}>{country.name}</h1>
      <h2 className={styles.region}>{country.region}</h2>
      <div className={styles.numbers}>
        <div>
          <h5 className={styles.label}>Population</h5>
          <div className={styles.value}>{country.population}</div>
        </div>
        <div>
          <h5 className={styles.label}>Area (km<sup className={styles.areaSup}>2</sup>)</h5>
          <div className={styles.value}>{country.area}</div>
        </div>
      </div>
    </div>
  </div>);

const Details = (
  {
    borders,
    country,
  }) =>
  (<div className={styles.details}>
    <div className={styles.wrap}>
      <h1 className={styles.detailsHeader}>Details</h1>
      <div>
        <div className={styles.detailsRow}>
          <h2 className={styles.detailsLabel}>Capital</h2>
          <div className={styles.detailsValue}>
            {country.capital === "Kiev" ? "Kyiv" : country.capital}
          </div>
        </div>
        <div className={styles.detailsRow}>
          <h2 className={styles.detailsLabel}>Language</h2>
          <div className={styles.detailsValue}>
            {country.languages.map(({ name }) => name)
              .join(", ")}
          </div>
        </div>
        <div className={styles.detailsRow}>
          <h2 className={styles.detailsLabel}>Currencies</h2>
          <div
            className={styles.detailsValue}> {country.currencies.map(({ name }) => name)
            .join(", ")} </div>
        </div>
        <div className={styles.detailsRow}>
          <h2 className={styles.detailsLabel}>Native Name</h2>
          <div className={styles.detailsValue}> {country.nativeName} </div>
        </div>
        <div className={styles.detailsRow}>
          <h2 className={styles.detailsLabel}>Gini</h2>
          <div className={styles.detailsValue}>
            {country.gini ? `${country.gini} %` : "N/A"}
          </div>
        </div>
      </div>
      <div className={styles.neighbours}>
        <h2 className={styles.detailsLabel}>Neighbouring Countries</h2>
        <div className={styles.bordersWrap}>
          {borders.length > 0
            ? borders.map(({
                             flag,
                             name,
                           }) =>
              <div className={styles.border}>
                <img src={flag} alt={name} />
                <h5 className={styles.borderName}>{name}</h5>
              </div>)
            : <h5 className={styles.borderName}>Country has not any Neighbours</h5>}
        </div>
      </div>
    </div>
  </div>);
