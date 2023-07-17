import React from "react";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

export const orderCountriesBy = (countries, direction, value) => {
  if (direction === "asc") {
    return [ ...countries ].sort((a, b) => a[value] > b[value] ? 1 : -1);
  }
  if (direction === "desc") {
    return [ ...countries ].sort((a, b) => a[value] > b[value] ? -1 : 1);
  }
  return countries;
};

export const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "inc") {
    return (
      <KeyboardArrowUpRounded />
    );
  } else {
    return (
      <KeyboardArrowDownRounded />
    );
  }
};
