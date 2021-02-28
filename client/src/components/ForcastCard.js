import React, { useEffect, useState } from "react";


const ForcastCard = (props) => {
    const images = require.context('../../public/weather-icons', true);

  const { icon, temp, title, type } = props;
  const [cardTitle, setCardTitle] = useState("");
  
  const unixToDay = (unix_timestamp) => {
    let i = 0;
    let data = { list: [ { timeStamp: unix_timestamp } ] };
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
    let dayNum = new Date(data.list[i].timeStamp * 1000).getDay();
    let dayName = days[dayNum];
    return dayName;
 };

 const unixToTime = (unix_timestamp) => {
    let date = new Date(unix_timestamp * 1000);
    let hours = (date.getHours()) < 10 ? "0" + date.getHours() : date.getHours() ;
    let formattedHour = hours+":00";
    return formattedHour;
  };
  useEffect(() => {
    if (type == "daily") {
      if(title !== "Today"){
        let date = unixToDay(title);
        setCardTitle(date);
      }
      else{
        setCardTitle(title);
      }
    }  if (type == "hourly") {
      if(title !== "Now"){
        let time = unixToTime(title);
        setCardTitle(time);
      }
      else{
        setCardTitle(title);
      }
    }
  }, []);

  return (
    <div className="panal-item">
      <h3>{cardTitle}</h3>
      <div className="panal-item-img">

        <img src={`${process.env.PUBLIC_URL}/weather-icons/${icon}.svg`}  />
      </div>
      {type=="hourly" ?
      <span>{Math.round(temp)}°</span>
      :
      <span>{Math.round(temp[0])}° / {Math.round(temp[1])}°</span>
  }
    </div>
  );
};
export default ForcastCard;
