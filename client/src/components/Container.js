import React, { useEffect, useState } from "react";
import Header from "components/Header";
import MainBanner from "components/MainBanner";
import Forcast from "components/Forcast";
import MainBG from "../imgs/Background.png";

const Container = () => {
  const [geolocationLoaded, setGeolocationLoaded] = useState(false);
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState({
    lat: "30.005493",
    long: "31.477898",
  });
  const [currentCity, setCurrentCity] = useState("New Cairo");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTempType, setCurrentTempType] = useState("fe");
  const [currentForcast, setCurrentForcast] = useState(null);
  const [hourlyForcast, setHourlyForcast] = useState(null);
  const [DailyForcast, setDailyForcast] = useState(null);
  const APP_URL = "http://localhost:5000/weather/";

//function to convert unix timestamp ti human readable date
  const unixToDateTime = (unix_timestamp) => {
    var a = new Date(unix_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var day = days[a.getDay()];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = day + " " + date + " " + month + " " + year;
    return time;
  };


const handleTempType = (type) => {
    if (currentTempType !== type) {
      setCurrentTempType(type);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoordinates = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          setUserCoordinates(newCoordinates);
        },
        (error) => {
          const newCoordinates = {
            lat: -1,
            long: -1,
          };
          setUserCoordinates(newCoordinates);
        }
      );
    } else {
      const newCoordinates = {
        lat: -1,
        long: -1,
      };
      setUserCoordinates(newCoordinates);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (userCoordinates.lat !== "30.005493" && userCoordinates.long !== "31.477898") {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userCoordinates.lat}&lon=${userCoordinates.long}&zoom=10`
    )
      .then((response) => {return response.json();})
      .then((location) => { 
        if(typeof (location.address.place) !== "undefined"){
        setCurrentCity(location.address.place);
        }
        else if (typeof (location.address.city) !== "undefined")
        {
          setCurrentCity(location.address.city);
        }
        setGeolocationLoaded(true);
      })
     
     fetch(
        APP_URL +
          `?lat=${userCoordinates.lat}&long=${userCoordinates.long}&tempType=${currentTempType}`
      )
        .then((response) => {return response.json();})
        .then((forcast) => {
          let formattedDate = unixToDateTime(forcast.currently.time);
          setCurrentDate(formattedDate);
          setCurrentForcast(forcast);
          setDailyForcast(forcast.daily);
          setHourlyForcast(forcast.hourly);
          setWeatherLoaded(true);
        });
    }
  }, [userCoordinates, currentTempType]);

  return (
    <div className="container">
      <Header parentCallback={handleTempType} />
      <div className="container-bg">
        <img className="container-bgImg" src={MainBG} />
      </div>
      {weatherLoaded   && (
        <>
          <MainBanner
            city={currentCity}
            date={currentDate}
            forcast={currentForcast}
          />
          <Forcast hourly={hourlyForcast} daily={DailyForcast} />
        </>
      )}
    </div>
  );
};
export default Container;
