import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(inputCity);
  };

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {Object.keys(data).length > 0 && (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox">
            <img
              className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              alt="icon"
            />

            <h6 className="weathorCity">City: {data?.name}</h6>
            <h6 className="weathorTemp">
              Temperature: {(data?.main?.temp - 273.15).toFixed(2)}°C
            </h6>
            <h6 className="weathorTemp">Lat: {data?.coord?.lat} &nbsp; &nbsp; &nbsp; &nbsp;
              Lon: {data?.coord?.lon}</h6>
            <h6 className="weathorTemp">Humidity: {data?.main?.humidity}</h6>
            <h6 className="weathorTemp">Pressure: {data?.main?.pressure}</h6>
            <h6 className="weathorTemp">Sunrise: {data?.sys?.sunrise}</h6>
            <h6 className="weathorTemp">Sunset: {data?.sys?.sunset}</h6>
            <h6 className="weathorTemp">Visibility: {data?.visibility}</h6>
            <h6 className="weathorTemp">Degree: {data?.wind?.deg}</h6>
            <h6 className="weathorTemp">Wind Speed: {data?.wind?.speed}</h6>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
