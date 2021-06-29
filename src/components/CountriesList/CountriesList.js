import styles from "./CountriesList.module.css";
import React, {useState} from "react";
import {KeyboardArrowDownRounded, KeyboardArrowUpRounded} from "@material-ui/icons";
import Link from 'next/link'

const orderBy = (countries, direction, value) => {
    if (direction === "inc") {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1)
    }
    if (direction === 'dec') {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
    }
    return countries
}

const SortArrow = ({direction}) => {
    if (!direction) {
        return <></>
    }
    if (direction === "inc") {
        return (
            <div className={styles.headingArrow}>
                <KeyboardArrowUpRounded/>
            </div>
        )
    } else {
        return (
            <div className={styles.headingArrow}>
                <KeyboardArrowDownRounded/>
            </div>
        )
    }
}

export const CountriesList = ({countries}) => {
    const [direction, setDirection] = useState()
    const [value, setValue] = useState()
    const orderedCountries = orderBy(countries, direction, value)

    const toggleDirection = () => {
        if (!direction) {
            setDirection('dec')
        } else if (direction === 'dec') {
            setDirection("inc")
        } else {
            setDirection(null)
        }
    }

    const toggleValue = (value) => {
        toggleDirection()
        setValue(value)
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.heading}>
                <button className={styles.headingName} onClick={() => toggleValue('name')}>
                    <div>Name</div>
                    {value === 'name' && <SortArrow direction={direction}/>}
                </button>
                <button className={styles.headingPop} onClick={() => toggleValue('population')}>
                    <div>Population</div>
                    {value === 'population' && <SortArrow direction={direction}/>}
                </button>
                <button className={styles.headingArea} onClick={() => toggleValue('area')}>
                    <div>Area (km<sup style={{fontSize: '0.5rem'}}>2</sup>)</div>
                    {value === 'area' && <SortArrow direction={direction}/>}
                </button>
                <button className={styles.headingGini} onClick={() => toggleValue('gini')}>
                    <div>Gini</div>
                    {value === 'gini' && <SortArrow direction={direction}/>}
                </button>
            </div>
            {orderedCountries.map((country) => (
                <Link href={`/country/${country.alpha3Code}`}>
                    <div className={styles.row}>
                        <div className={styles.countryShort}>
                            <img className={styles.flag} src={country.flag}/>
                            <div className={styles.name}>{country.name} </div>
                        </div>
                        <div className={styles.population}>{country.population} </div>
                        <div className={styles.area}>{country.area || 'no data'} </div>
                        <div className={styles.gini}>{country.gini || 'no data'} </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}