import React, { Component, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import SideBarAdmin from "./sideBarAdmin";
import Header from "./Header";
export default function Admindets() {
 const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/userData", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem('token'),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
    
            console.log(data, "userData");
    
    
            setUserData(data.data);
            
            if (data.data == "token expired") {
              alert("Token expired login again");
              window.localStorage.clear();
              window.location.href = "./LoginHeader";
            }
    
          });
      }, []);


  return ( 
  <div className="header-sidebar-container">
  <SideBarAdmin />
  <div className="content">
      <Header title="Bienvenue" login={true} />
      <div className="auth-wrapper">
          <div className="auth-inner">
    
          <div>
          <h3 className="custom-h2">Informations de Profil</h3>
        <div className="profile-box">
        <label>Prénom:</label>
        <div>{userData.fname}</div>
      </div>
      <div className="profile-box">
        <label>Nom:</label>
        <div>{userData.lname}</div>
      </div>
      <div className="profile-box">
        <label>Localisation:</label>
        <div>{userData.location}</div>
      </div>
      <div className="profile-box">
        <label>Compagnie:</label>
        <div>{userData.company}</div>
      </div>
      <div className="profile-box">
        <label>Numéro de Téléphone:</label>
        <div>{userData.phone}</div>
          </div>
           </div>
                </div>
            </div>
        </div>
        </div>
       
  );
}