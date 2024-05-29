import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import './tempMain.css';
import Thermometer from "./thermometer";
const TempMain = () => {
  const APIKey = process.env.REACT_APP_API_KEY;
  const [inputCity, setInputCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  

  const handleInputCity = (event) => {
    // console.log("api",APIKey)
    setInputCity(event.target.value);
  };
  const handleSubmitCity = async () => {
    if (inputCity !== "") {
      console.log(inputCity);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${APIKey}`
      );
      console.log(response.data);
      setWeatherData(response.data);
      setInputCity("")
    } else setSnackBar(true);
  };

  const calculateTempInCelsius = (value) => {
    if (value == "currentTemp") {
      const tempInCelsius = weatherData.main.temp - 273.15;
      return Math.round(tempInCelsius * 100) / 100;
    } else if (value == "feelsLike") {
      const tempInCelsius = weatherData.main.feels_like - 273.15;
      return Math.round(tempInCelsius * 100) / 100;
    }
  };

  const calculateTempInFarenheit = (value) => {
    if (value == "currentTemp") {
      const tempInFarenheit = ((weatherData.main.temp - 273.15) * 9) / 5 + 32;
      return Math.round(tempInFarenheit * 100) / 100;
    } else if (value == "feelsLike") {
      const tempInFarenheit =
        ((weatherData.main.feels_like - 273.15) * 9) / 5 + 32;
      return Math.round(tempInFarenheit * 100) / 100;
    }
  };

  return (
    // <div className="mainContainer">
    //   TempMain
    //   <label> Enter City name: </label>
    //   <TextField
    //     required
    //     type="text"
    //     id="outlined-required"
    //     // defaultValue="Hello World"
    //     value={inputCity}
    //     onChange={handleInputCity}
    //   />
    //   {/* <input type="text" value={inputCity} onChange={handleInputCity}/> */}
    //   <Button variant="contained" onClick={handleSubmitCity}>
    //     Check Weather
    //   </Button>
    //   {weatherData ? (
    //     <div>
    //       <h1>
    //         Current temperature in {weatherData.name} is{" "}
    //         {calculateTempInCelsius("currentTemp")}°C /{" "}
    //         {calculateTempInFarenheit("currentTemp")}°F
    //       </h1>
    //       <h1>
    //         Currently feels like {calculateTempInCelsius("feelsLike")}°C /{" "}
    //         {calculateTempInFarenheit("feelsLike")}°F
    //       </h1>
    //     </div>
    //   ) : (
    //     ""
    //   )}
    //   <Snackbar
    //     anchorOrigin={{ vertical:'top', horizontal:'right' }}
    //     open={snackBar}
    //     onClose={()=>setSnackBar(false)}
    //     message="Enter City"
    //     autoHideDuration={2000}
    //   />
    // </div>
    <div className="mainContainer">
      <h1 className="header">Weather Checker</h1> <Thermometer/>
      <label className="label">Enter City name:</label>
      <TextField
        required
        type="text"
        id="outlined-required"
        value={inputCity}
        onChange={handleInputCity}
        className="inputField"
      />
      <br/>
      <Button variant="contained" onClick={handleSubmitCity} className="submitButton">
        Check Weather
      </Button>
      {weatherData ? (
        <div className="weatherInfo">
          <h2>
            Current temperature in {weatherData.name} is{" "}
            {calculateTempInCelsius("currentTemp")}°C /{" "}
            {calculateTempInFarenheit("currentTemp")}°F
          </h2>
          <h2>
            Currently feels like {calculateTempInCelsius("feelsLike")}°C /{" "}
            {calculateTempInFarenheit("feelsLike")}°F
          </h2>
        </div>
      ) : null}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackBar}
        onClose={() => setSnackBar(false)}
        message="Enter City"
        autoHideDuration={2000}
        className="snackbar"
      />
     
    </div>
  );
};

export default TempMain;
