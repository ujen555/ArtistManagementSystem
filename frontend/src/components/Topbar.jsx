import React from 'react'
import Hamburger from './Hamburger'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { FaUser } from "react-icons/fa";
import Modal from './Modal';
import { useState } from 'react';
import { useLogout } from '../hooks/useLogOut';
function Topbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const {data:currentUser}=useCurrentUser();
  const logout=useLogout();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
    <div className='dashboardLayout__topBar'>
        <Hamburger/>
        <h2 className="dashboardLayout__topBar__heading"><span>Artist Management System (</span>AMS<span>)</span></h2>
        <div className="dashboardLayout__topBar__btns">
        <div className="userInfoPill">
          <FaUser className='cIcon'></FaUser>
          {currentUser.first_name} {currentUser.last_name}
        </div>
        <button className="cBtn cBtn--red" onClick={openModal}>
          <span>Log Out</span>
        </button>
        </div>
    </div>
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <div className="modal-body">
        <p>
          Are you sure you want to Logout
        </p>
      </div>
      <div className="cForm__buttons">
        <button className="cBtn cBtn--green authForm__button" type="submit" onClick={logout}>
          <span>Yes</span>
        </button>
      </div>
    </Modal>
    
    </>

  )
}

export default Topbar
