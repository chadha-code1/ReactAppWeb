import React, { useEffect, useRef, useState } from 'react';
import Header  from './Header';
import SideBarUser from './sidebarUser';
const BarChartUser = () => {
  return (
    <div className="header-sidebar-container">
    <SideBarUser />
    <div className="content">
           <Header title="Bienvenue"  login={true} />

 <div className="auth-wrapper" >

   <div className="auth-inner">
   <h3 className="custom-h2">Usage des Cartes</h3>
      <img src="chart.png" alt="Chart" />
    </div>
    </div>

    </div>
    </div>

  );
};


export default BarChartUser;
