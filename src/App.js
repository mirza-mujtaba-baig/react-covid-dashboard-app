import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchData } from "./Covid Tracker/API";
import { Card, CardCount, Typography, Grid, CardContent } from "@mui/material";

import { Cards, Chart, CountryPicker } from "./Covid Tracker/exportComponents";

function App() {
  const [covidData, setCovidData] = useState({});
  const [country, setCountry] = useState("");
  useEffect(() => {
    const data = fetchData();
    data.then((res) => {
      setCovidData(res);
    });
  }, []);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);

    setCovidData(data);
    setCountry(country);
  };

  return (
    <div className="container">
      <Typography
        color="textSecondary"
        variant="h4"
        marginBottom={2}
        gutterBottom
      >
        COVID-19 Dashboard
      </Typography>
      <Cards data={covidData} />

      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={covidData} country={country} />
    </div>
  );
}

export default App;
