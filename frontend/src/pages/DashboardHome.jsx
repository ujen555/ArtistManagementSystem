import React from 'react'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { RoleEnum } from '../helpers/helpers';

function DashboardHome() {
    const {data:currentUser}=useCurrentUser();
  return (
    <div className="componentPanel">
        <div className="componentPanel__header">
            <h2 className="componentPanel__header__title title">
                Hi {currentUser?.first_name}
            </h2>
        </div>
        <div className="componentPanel__body">
            <p className=" componentPanel__body__text">Please navigate through sideMenu</p>
            <p className=" componentPanel__body__text">Role: {RoleEnum[currentUser.role] }</p>
        </div>
    </div>
  )
}

export default DashboardHome
