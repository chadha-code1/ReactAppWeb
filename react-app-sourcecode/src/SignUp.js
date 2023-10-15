import React, { Component, useState,useRef } from "react";
import Header  from './Header';
import SideBarAdmin from "./sideBarAdmin";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Alert, AlertTitle } from "@mui/material"; 




export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [nameerror, setNameError] = useState(true);
  const [lnameerror, setLastNameError] = useState(true);
  const [phoneerror, setPhoneError] = useState(true);

  const formRef = useRef(null);

  const validateForm = () => {
    let isValid = true;

    // Reset previous errors
    setEmailError("");
    setPasswordError("");
    setLastNameError("")
    setPhoneError("")
    setNameError("")
    // Password validation
  
    if (!fname) {
      alert("Le champ Prénom est obligatoire.");
      setNameError("Le champ Prénom est obligatoire.")
      isValid = false;

      return;
      
    }
    if (!isValidName(fname)){
      alert("Le champ Prénom est obligatoire.");
      setNameError("Entrer un prénom valide")
      isValid = false;

     return;
    }
    if (!lname) {
      alert("Le champ nom est obligatoire.");
      setLastNameError("Le champ nom est obligatoire.")

      isValid = false;

      return;
      
    }
    if (!isValidLastName(lname)) {
      alert("Le champ Nom est obligatoire.");
      isValid = false;
      
      return;
    }
    if (!email) {
      alert("Le champ Email est obligatoire.");
      setEmailError("Adresse Email est obligatoire.");
      isValid = false;

      return;
    }

    if (!isValidEmail(email)) {
      alert("Veuillez entrer une adresse mail valide.");
      isValid = false;

      return;
    }
   

    
    if (!phone) {
      alert("Le champ Numéro de Téléphone est obligatoire.");
      setPhoneError("Le champ Numéro de Téléphone est obligatoire.")
      isValid = false;

      return;
    }
    if (!isValidPhoneNumber(phone)) {
      alert("Veuillez entrer un numéro de téléphone valide.");
      isValid = false;

      return;
    }
    if (!password) {
      alert("Le champ Mot de Passe est obligatoire.");
      setPasswordError("Mot de Passe est obligatoire.");

      isValid = false;

      return;
    }
    if (!isValidPassword(password)) {
      alert("Numéro de téléphone invalide.");
      isValid = false;

      return;
    }
   
    return isValid;
  };
  /***********************************Is valid functions ********************************* */
  const isValidName = (name) => {
    // Valid name should contain only letters (no digits or special characters)
    const nameRegex = /^[A-Za-z]+$/;
    if (nameRegex.test(name) && name.length >= 2) {
      setNameError(""); // Clear the error message if valid
      return true;
    } else {
      setNameError("Le champ Prénom est invalide.");
      return false;
    }
  };
  const isValidLastName = (namel) => {
    // Valid name should contain only letters (no digits or special characters)
    const nameRegex = /^[A-Za-z]+$/;
    if (nameRegex.test(namel) && namel.length >= 2) {
      setLastNameError(""); // Clear the error message if valid
      return true;
    } else {
      setLastNameError("Le champ nom est invalide.");
      return false;
    }
  };
  
  const isValidPhoneNumber = (phoneNumber) => {
    // Valid phone number should contain only digits and have a specific length
    
    if (phoneNumber.length === 8) {
      setPhoneError(""); // Clear the error message if valid
      return true;
    } else {
      setPhoneError("Le champ Numéro de Téléphone est invalide.");
      return false;
    }
  };

  const isValidEmail = (email) => {
    // A simple email validation function
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
      setEmailError(""); // Clear the error message if valid
      return true;
    } else {
      setEmailError("Veuillez entrer une adresse mail valide.");
      return false;
    }
  };
  
  const isValidPassword = (password) => {
    // Password should have at least 8 characters, containing a mix of letters, numbers, and special characters
   // const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
   if (password.length >= 8) {
    setPasswordError(""); // Clear the error message if valid
    return true;
  } else {
    setPasswordError("Le champ Mot de Passe doit contenir au moins 8 caractères.");
    return false;
  }
  };

  /**************************Handle submit ************************************************* */
  const handleSubmit = (e) => {
      e.preventDefault();
     
      console.log(fname, lname,email, password,isAdmin,location,company,company_id,phone);
      if (validateForm()) {
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
          isAdmin,
          location,
          company,
          company_id,
          phone,
        }),
      })
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert(data.message);
          }
          alert(data.message)
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Une erreur s'est produite.");
        });


        
       
      }  
      if (validateForm()) {
        // Form submission successful
    
        // Clear form fields
        formRef.current.reset();
    
        // Clear state variables
        setFname("");
        setLname("");
        setEmail("");
        setPassword("");
        // ...other state variables
    
       }
      
    
    }
   /***********************************Formulaire ******************* */
  return (
    <div className="header-sidebar-container">

      <SideBarAdmin />

      <div className="content">
    <Header title="Bienvenue"  login={true}  />
    <div className="auth-wrapper">
      <div className="auth-inner">

        <form ref={formRef} onSubmit={handleSubmit}>
        <h3 className="custom-h2">Ajouter Utilisateur</h3>
          <div>
          
          <space>
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(_e) => setAdmin(false)}
            />
            Utilisateur
            </space>
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(_e) => setAdmin(true)}
            />
            Admin
          </div>
         

          <div className="mb-3">
  <div className="name-inputs">
    <div className="input-group">
     
      <input
        type="text"
        className="form-control wider-input"
        placeholder="Prénom"
        onChange={(e) => setFname(e.target.value)}
        
      />
            <div className="error">{nameerror}</div>

    </div>
    <div className="input-group">
     
      <input
        type="text"
        className="form-control wider-input"
        placeholder="Nom"
        onChange={(e) => setLname(e.target.value)}
      />
                 
                  <div className="error">{lnameerror}</div>

    </div>
  </div>
</div>



          <div className="mb-3">
           
            <input
              type="email"
              className="form-control wider-input"
              placeholder="Entrer email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="error">{emailError}</div>

          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control wider-input"
              placeholder="Entrer Mot de Passe"
              onChange={(e) => setPassword(e.target.value)}
            />
                      <div className="error">{passwordError}</div>

          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control wider-input"
              placeholder="Enter Localisation"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control wider-input"
              placeholder="Entrer Compagnie"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control wider-input"
              placeholder="Entrer Id Compagnie "
              onChange={(e) => setCompany_id(e.target.value)}
            />
          </div>
              <div className="mb-3">


            <input
              type="text"
              className="form-control wider-input"
              placeholder="Entrer Numéro de Téléphone"
              onChange={(e) => setPhone(e.target.value)}
            />
                        <div className="error">{phoneerror}</div>

          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up User
            </button>
          </div>
         
        </form>
      </div>
      <p className="forgot-password text-right">
            <a href="/ManageUsers">Vérifier utilisateurs</a>
          </p>
    </div>
    </div>
    </div>
  );
}

