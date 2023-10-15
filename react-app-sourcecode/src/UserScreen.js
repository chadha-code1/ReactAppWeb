import './App.css';
import './App';
import React, { useState } from 'react';
import Header  from './Header';
import Main  from './Main';
import SideBarUser from './sidebarUser';


export default function UserScreen(s) {

    return (
      <div className="header-sidebar-container">
      <SideBarUser />
      <div className="content">
        <Header title="DASHBOARD" login={true} />
        <Main />
       
      </div>
    </div>
    );
  };


  