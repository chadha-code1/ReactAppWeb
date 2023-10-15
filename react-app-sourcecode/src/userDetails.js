import React, { Component, useEffect, useState } from "react";
import Header  from './Header';

import UserScreen from "./UserScreen";
import './App.css';
import './App';
import AdminScreen from "./AdminScreen";
import ManageUsers from "./manageUsers";
export default function UserDetails({}) {
  const [userData, setUserData] = useState([]);
  const [admin, setAdmin] = useState(false);

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

        if (data.data.isAdmin=== true) {
            console.log(data.data.isAdmin)

          setAdmin(true);
        }

        setUserData(data.data);
        
        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./LoginHeader";
        }

      });
  }, []);

  return admin ?  <AdminScreen userData={userData} /> : <UserScreen userData={userData}/>;
}

//<UserHome userData={userData}