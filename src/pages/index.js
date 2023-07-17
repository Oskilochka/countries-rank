import { Layout } from "../components/Layout/Layout";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { CountriesList } from "../components/CountriesList/CountriesList";
import { useState } from "react";

export default function Home({ countries }) {
  const [ keyword, setKeyword ] = useState("");

  const filteredCountries = countries && countries.filter(
    (country) =>
      country.name.toLowerCase()
        .includes(keyword) ||
      country.region.toLowerCase()
        .includes(keyword) ||
      country.subregion.toLowerCase()
        .includes(keyword),
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <SearchInput onChange={onInputChange} />
      <CountriesList countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");

  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
