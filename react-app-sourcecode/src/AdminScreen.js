import './App.css';
import './App';
import Header  from './Header';
import Main  from './Main';
import SideBarAdmin from "./sideBarAdmin";
import React, { Component, useEffect, useState } from "react";



export default function AdminScreen({userData}) {
    return (
      <div className="header-sidebar-container">
      <SideBarAdmin />

      <div className="content">
        <Header title="Bienvenue" login={true} />
        <Main />
     
      </div>
    </div>
    );
  };


  