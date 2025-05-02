import React from 'react'
import Hamburger from './Hamburger'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { FaUser } from "react-icons/fa";
function Topbar() {
  const {data:currentUser}=useCurrentUser();
  return (
    <div className='dashboardLayout__topBar'>
        <Hamburger/>
        <h2 className="dashboardLayout__topBar__heading"><span>Artist Management System (</span>AMS<span>)</span></h2>
        <div className="userInfoPill">
          <FaUser className='cIcon'></FaUser>
          {currentUser.first_name} {currentUser.last_name}
        </div>
    </div>
  )
}

export default Topbar
