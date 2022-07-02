import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@mui/material";
import "./CountryPicker.css";
import { fetchCountries } from "../API";

function CountryPicker({ handleCountryChange }) {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    const fetchingCountries = async () => {
      setFetchedCountries(await fetchCountries());
    };
    fetchingCountries();
  }, [fetchedCountries]);

  return (
    <FormControl className="formControl">
      <NativeSelect
        defaultValue=""
        onChange={(e) =>
          e.target.value === "global"
            ? window.location.reload(true)
            : handleCountryChange(e.target.value)
        }
      >
        <option value="global"> Global</option>
        {fetchedCountries &&
          fetchedCountries.map((country, i) => (
            <option key={i} value={country.name}>
              {country.name}
            </option>
          ))}
      </NativeSelect>
    </FormControl>
  );
}

export default CountryPicker;
