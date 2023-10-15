import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import SideBarAdmin from "./sideBarAdmin";
import Header from "./Header";
function UsersByLocationChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("/api/users-by-location")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Create the chart once data is available
    if (data.length > 0) {
      const ctx = document.getElementById("userByLocationChart").getContext("2d");

      // Extract location names and total users from the data
      const labels = data.map((item) => item._id);
      const usersCount = data.map((item) => item.totalUsers);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Utilisateurss par localisation",
              data: usersCount,
              backgroundColor: "rgba(75, 192, 192, 0.2)", 
              borderColor: "rgba(75, 192, 192, 1)", 
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Nombre Utilisateurs",
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="header-sidebar-container">
     <SideBarAdmin />
    <div className="content">
        <Header title="Bienvenue" login={true} />
        <div className="auth-wrapper">
            <div className="auth-inner">
    <div>
      <h2 className="custom-h2">Nombre  Utilisateurs par Localisation </h2>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <canvas id="userByLocationChart" />
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>

  );
}

export default UsersByLocationChart;
