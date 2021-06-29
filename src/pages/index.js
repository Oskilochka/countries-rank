import {Layout} from "../components/Layout/Layout";
import {SearchInput} from "../components/SearchInput/SearchInput";
import {CountriesList} from "../components/CountriesList/CountriesList";
import {useState} from "react";

export default function Home({countries}) {

    const [input, setInput] = useState('')
    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(input) ||
        country.region.toLowerCase().includes(input) ||
        country.subregion.toLowerCase().includes(input)
    )
    const onInputChange = (e) => {
        e.preventDefault()
        setInput(e.target.value.toLowerCase())
    }

    return (
        <Layout>
            <SearchInput onChange={onInputChange}/>
            <CountriesList countries={filteredCountries}/>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await res.json()
    return {
        props: {
            countries
        }
    }
}
