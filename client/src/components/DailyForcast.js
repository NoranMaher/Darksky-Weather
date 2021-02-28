import React from "react";
import ForcastCard from "components/ForcastCard";
const DailyForcast = (props) => {
  const { daily } = props;
  return (
    <ul className="panal panal-daily">
      {daily.data.map((item, key) => (
        <li key={key}>
          <ForcastCard type="daily" temp={[item.temperatureHigh,item.temperatureLow]} icon={item.icon}  title={key==0 ? "Today": item.time} />
        </li>
      ))}
    </ul>
  );
};
export default DailyForcast;
