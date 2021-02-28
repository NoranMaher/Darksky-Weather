import React, { useState } from "react";
const Header = ({parentCallback}) => {
    
    const [tempType,setTempType]=useState('fe');
    const handleChangeTempType = (type)=>{
       if(tempType !== type){
           setTempType(type);
           parentCallback(type);
       }
    }
 return (
      <div className="header">
      <span className="header-logo">Instaweather</span>
      <div className="header-tempType">
          <span className={`tempType-item ${tempType == "si" && "active"}`}  onClick={() => handleChangeTempType('si')}>c</span>
          <span className="tempType-sep"></span>
          <span className={`tempType-item ${tempType == "fe" && "active"}`} onClick={() => handleChangeTempType('fe')}>f</span>
      </div>
      </div>
    );
};
export default Header;