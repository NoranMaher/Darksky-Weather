import React from "react";
import ForcastCard from "components/ForcastCard";
const HourlyForcast = (props) => {
  const { hourly } = props;
  return (
    <ul className="panal panal-hourly">
      {hourly.data.slice(0, 24).map((item,key) => (
        <li key={key}>
          <ForcastCard type="hourly" temp={item.temperature} icon={item.icon} title={ key==0 ? "Now": item.time} />
        </li>
      ))}
    </ul>
  );
};
export default HourlyForcast;
