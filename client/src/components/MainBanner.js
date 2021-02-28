import React from "react";

const MainBanner = (props) => {
 
  const images = require.context("../../public/weather-icons", true);

  const { city, date, forcast } = props;
  return (
    <div className="mainBanner">
      <div className="mainBanner-cont--left">
        <h1 className="mainBanner-city">{city}</h1>
        <h5 className="mainBanner-date">{date}</h5>
        <div className="mainBanner-icon">
          <img
            src={`${process.env.PUBLIC_URL}/weather-icons/${forcast.currently.icon}.svg`}
          />
        </div>
        <h3 className="mainBanner-summary">{forcast.currently.summary}</h3>
      </div>
      <div className="mainBanner-cont--right">
        <h2 className="mainBanner-temp"> {Math.round(forcast.currently.temperature)}° </h2>
        <p className="mainBanner-temps">
          {Math.round(forcast.daily.data[0].temperatureHigh)}° /{" "}
          {Math.round(forcast.daily.data[0].temperatureLow)}°
        </p>
        <p className="mainBanner-details">{forcast.daily.data[0].summary}</p>
      </div>
    </div>
  );
};
export default MainBanner;
