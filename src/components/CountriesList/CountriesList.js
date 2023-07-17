import React from "react";
import Link from "next/link";
import { orderCountriesBy, SortArrow } from "./utils";
import styles from "./CountriesList.module.css";

export const CountriesList = ({ countries }) => {
  const [ direction, setDirection ] = React.useState();
  const [ value, setValue ] = React.useState();

  const orderedCountries = orderCountriesBy(countries, direction, value);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const valueDirectionHandler = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.heading}>
        <button className={styles.headingName} onClick={() => valueDirectionHandler("name")}>
          <div>Name</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button className={styles.headingPop} onClick={() => valueDirectionHandler("population")}>
          <div>Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button className={styles.headingArea} onClick={() => valueDirectionHandler("area")}>
          <div>Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)</div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>

        <button className={styles.headingGini} onClick={() => valueDirectionHandler("gini")}>
          <div>Gini</div>
          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries.map((country) => (
        <Link key={country.name} href={`/country/${country.alpha3Code}`}>
          <div className={styles.row}>
            <div className={styles.countryShort}>
              <img className={styles.flag} src={country.flag} alt={"flag"} />
              <div className={styles.name}>{country.name} </div>
            </div>
            <div className={styles.population}>{country.population} </div>
            <div className={styles.area}>{country.area || "N/A"} </div>
            <div className={styles.gini}>{country.gini || "N/A"} </div>
          </div>
        </Link>
      ))}
    </div>
  );
};