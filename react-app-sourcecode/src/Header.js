import { useHistory } from 'react-router-dom';
import React from 'react';

export default function Header(props){
    
    return  ( 
    <header>
        <nav className="navbar ">
            <div> <span className="title">{props.title}</span>
            {props.login? <img id="Logout" title="Logout" src="logout.png" onClick={logOut} />:<></>}

            </div>
            <img src="logo.png" alt="Logo" height="60"/>
        </nav>        
    </header>
    )
    
}
const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./LoginHeader";
  };
 