import React, { Component, useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import Header  from './Header';
import SideBarAdmin from "./sideBarAdmin";
import { useRef } from "react";
export default function ManageUsers({  }) {
    const [data, setData] = useState([]);
    const [limit,setLimit]=useState(5);
    const [pageCount,setPageCount]=useState(1);
    const currentPage=useRef();
    const [userData, setUserData] = useState([]);

   // const location = useLocation();
  //const { userData } = location.state;
    useEffect(() => {
      currentPage.current=1;
       //getAllUser();
      getPaginatedUsers();
    }, []);

    const getAllUser = () => {
      fetch("http://localhost:5000/getAllUser", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          setData(data.data);
        });
        setUserData(data.data);

    };
 //deleting user

 
 const deleteUser = (id, fname,lname) => {
  if (window.confirm(`Are you sure you want to delete ${fname} ${lname} `)) {
    fetch("http://localhost:5000/deleteUser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert(data.message);
          getAllUser(); // Reload the user data after deletion
        } else {
          alert("User deletion failed");
        }
      })
      .catch((error) => {
        alert("An error occurred: " + error);
      });
  }
};

function handlePageClick(e) {
  console.log(e);
 currentPage.current=e.selected+1;
  getPaginatedUsers();
 

}
function changeLimit(){
  currentPage.current=1;
  getPaginatedUsers();
}
function getPaginatedUsers(){
  fetch(`http://localhost:5000/paginatedUsers?page=${currentPage.current}&limit=${limit}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userData");
      setPageCount(data.pageCount);
      setData(data.result)
      
     
    });

}

      return (
        <div className="header-sidebar-container">
           <SideBarAdmin />
           <div className="content">
                  <Header title="Bienvenue"  login={true} />

        <div className="auth-wrapper" >

          <div className="auth-inner">
          <h3 className="custom-h2">Users' Informations</h3>
          <div className="table-container">
            <table >
              <tr>
              
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Numéro de Téléphone</th>
                <th>Localisation</th>
                <th>Compagnie</th>
                <th>ID Compagnie </th>
                <th>Type Utilisateur</th>
                <th>Supprimer</th>
              </tr>
              {data.map((i) => {
                return (
                  <tr  key={i._id}>
                   <td>{i.fname}</td>
                   <td>{i.lname}</td>
                  <td>{i.email}</td>
                  <td>{i.phone}</td>
                  <td>{i.location}</td>
                <td>{i.company}</td>
                <td>{i.company_id}</td>
                <td>{i.isAdmin ? 'Admin' : 'User'}</td>
                  <td>
                   <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteUser(i._id, i.fname, i.lname)}
                  />
                  </td>
                </tr>
                );
              })}
            </table>
            </div>
           
            <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          forcePage={currentPage.current-1}
        />
        <input placeholder="Limit" onChange={e=>setLimit(e.target.value)}/>
        <button onClick={changeLimit}>Limiter</button>
         
          </div>
         
         
        </div>
        </div>
        </div>
      );    
}
