import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import SideBarUser from './sidebarUser';

function Pred() {
    const [recommendedClients, setRecommendedClients] = useState([]);
    const [boutiqueId, setBoutiqueId] = useState(null); // Initialize with null or the default boutique ID
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
                setUserData(data.data);
                console.log(data, "userData");

                if (data.data == "token expired") {
                    alert("Token expired login again");
                  
                } else if (data.data && data.data.company_id) {
                    // Set the boutiqueId based on user data
                    setBoutiqueId(data.data.company_id);
                    console.log(data.data.company_id)
                }
            });
    }, []);

    useEffect(() => {
        if (boutiqueId !== null) {
            axios.get(`/recommendations?boutique_id=${boutiqueId}`)
                .then(response => setRecommendedClients(response.data.recommended_clients))
                .catch(error => console.error('Error:', error));
        }
    }, [boutiqueId]);

    return (
        <div className="header-sidebar-container">
            <SideBarUser />
            <div className="content">
                <Header title="Bienvenue" login={true} />
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <h3 className="custom-h2" >Clients Recommandés pour {userData.company}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rang</th>
                                    <th>Nom Client</th>
                                    <th>Localisation</th>

                                </tr>
                            </thead>
                            <tbody>
                            {recommendedClients.map((client, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{client.name}</td> {/* Access 'name' from the client object */}
            <td>{client.localité}</td> {/* Access 'localité' from the client object */}
        </tr>
    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pred;
