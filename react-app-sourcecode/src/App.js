import './App.css';
import React, { useState } from 'react';
import Header  from './Header';
import Main  from './Main';
import Login  from './Login';
import SignUp  from './SignUp';
import UserDetails  from './userDetails';
import UserScreen  from './UserScreen';
import SidebarAdmin from './sideBarAdmin';
import SidebarUser from './sidebarUser';
import ManageUsers from './manageUsers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminScreen from './AdminScreen';
import Pred from './Pred';
import Userdets from './Userdets';
import Admindets from './Admindets';
import BarChartWithData from './BarChartWithData'
import UsersByLocationChart from "./UserLocationChart";
import BarChartUser from './BarChartUser';

const isLoggedIn = window.localStorage.getItem("loggedIn");


const App = () => {

  const [loginStatus, setLoginStatus] = useState(false);
 return (
  //  <>
 //{loginStatus ? <WelcomeScreen />: <> <Header title="Login"  login={false}/> <Login setLoginStatus={setLoginStatus} /> </>}
   // </>
// );




<Router>
  <Routes>

    <Route
      exact
      path="/"
      element={isLoggedIn== true ?   <UserDetails/>  : <><Header title="Login"  login={false} /> <Login  /> </>}
    />
    <Route path="/Login" element={<Login />} />
    <Route path="/UserDetails" element={<UserDetails />} />
    <Route path="/SignUp" element={<SignUp />} />
    <Route path="/LoginHeader" element={<><Header title="Login" login={false} /><Login /></>} />
    <Route path="/manageUsers" element={<ManageUsers />} />
    <Route path="/Main" element={<Main />} />
    <Route path="/sidebarUser" element={<SidebarUser />} />
    <Route path="/sidebarAdmin" element={<SidebarAdmin />} />
    <Route path="/AdminScreen" element={<AdminScreen/>} />
    <Route path="/UserScreen" element={<UserScreen/>} />

    <Route path="/Userdets" element={<Userdets/>} />
    <Route path="/Admindets" element={<Admindets/>} />
    <Route path="/BarChartWithData" element={<BarChartWithData/>} />
    <Route path="/UsersByLocationChart" element={<    UsersByLocationChart/>} />
    <Route path="/BarChartUser" element={<BarChartUser/>} />

    <Route path="/Pred" element={<Pred/>} />

  </Routes>
  {/* <ImageUpload/> */}

</Router>
)
};
export default App;
