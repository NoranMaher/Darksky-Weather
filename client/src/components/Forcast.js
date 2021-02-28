import React, { useState } from "react";
import DailyForcast from "components/DailyForcast";
import HourlyForcast from "components/HourlyForcast";

const Forcast = (props) => {
  const { daily, hourly } = props;
  const [activeType, setActiveType] = useState("hourly");

  const handlePanalToggle = (type) => {
    if(activeType !== type){
        setActiveType(type);
    }
  };
  return (
    <div className="forcastPanal">
      <div className="forcastPanal-nav">
        <span
          onClick={() => handlePanalToggle('hourly')}
          className={`${activeType == "hourly" && "active"} type-item`}
        >
          Hourly
        </span>
        <span
           onClick={() => handlePanalToggle('daily')}
          className={`${activeType == "daily" && "active"} type-item`}
        >
          Daily
        </span>
      </div>
      {activeType == "hourly" ? (
        <div className="forcastPanal-item">
          <HourlyForcast hourly={hourly} />
        </div>
      ) : (
        <div className="forcasrPanal-item">
          <DailyForcast daily={daily} />
        </div>
      )}
    </div>
  );
};
export default Forcast;
