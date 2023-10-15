import React, { useState,useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Login ({ setLoginStatus }) {

  const [email, setEmail] = useState("");
  //const [login, setLoginStatus] = useState(false);
  const [password, setPassword] = useState();
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginMessage, setLoginMessage] = useState('');


  const validateForm = () => {
    let isValid = true;

    // Reset previous errors
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!email) {
      setEmailError("Adresse Email est obligatoire.");
      isValid = false;
    }
    // Password validation
    if (!password) {
       setPasswordError("Mot de Passe est obligatoire.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    if (validateForm()) {
    // make a popup alert showing the "submitted" text
    console.log(email, password);
    fetch("http://localhost:5000/login-user1", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if (data.status == "ok") {
        alert("Identification réussie");
        setLoginMessage('Identification réussie'); // Set the message state

        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
       //setLoginStatus(true)
      window.location.href = "./UserDetails";
      }else{
     alert(data.message)
     setLoginMessage(data.message); // Set the message state
     NotificationManager.error('Échec de la connexion', loginMessage ,  5000);

    }
    });
  }
  }
   
    return (
      <div id='LoginBox' className='container mt-5'>
         
      <Form onSubmit={(e)=>handleSubmit(e)}>
      {/* email */}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Adresse Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrer email"
        />
        <div className="error">{emailError}</div>
      </Form.Group>

      {/* password */}
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Mot de Passe</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de pasee"
        />
          <div className="error">{passwordError}</div>

      </Form.Group>
      <div class="containerbtn">
      <div class="center">
      {/* submit button */}
      <Button
       className="btn"
       
        onClick={(e) => handleSubmit(e)}
      >
        Login
      </Button>
      </div>
      <NotificationContainer />
      </div>
    </Form>
  
    </div>
    )

 } ;