import React, { useEffect, useRef, useState } from 'react';
import Header  from './Header';
import SideBarAdmin from "./sideBarAdmin";
const BarChartWithData = () => {
  return (
    <div className="header-sidebar-container">
    <SideBarAdmin />
    <div className="content">
           <Header title="Welcome Admin"  login={true} />

 <div className="auth-wrapper" >

   <div className="auth-inner">
   <h3 className="custom-h2">Users' Informations</h3>
      <img src="chart.png" alt="Chart" />
    </div>
    </div>

    </div>
    </div>

  );
};


export default BarChartWithData;
