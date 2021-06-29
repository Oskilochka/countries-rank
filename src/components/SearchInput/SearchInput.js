import styles from "./SearchInput.module.css";
import React from "react";
import {SearchRounded} from "@material-ui/icons";

export const SearchInput = ({onChange}) => {
    return (
        <div className={styles.wrap}>
            <SearchRounded style={{color: "white", margin: "10px"}}/>
            <input placeholder='Write a name of country, region or subregion' className={styles.searchInput} onChange={onChange}/>
        </div>
    )
}