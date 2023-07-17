import React from "react";
import { SearchRounded } from "@material-ui/icons";
import styles from "./SearchInput.module.css";

export const SearchInput = ({ onChange }) =>
  (
    <div className={styles.wrap}>
      <SearchRounded style={{
        margin: "10px 0 10px 15px",
        width: "24px",
        height: "24px",
      }} />
      <input placeholder="Write a name of country, region or subregion" className={styles.searchInput} onChange={onChange} />
    </div>
  );