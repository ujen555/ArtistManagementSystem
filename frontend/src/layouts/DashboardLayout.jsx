import React from 'react'
import SideMenu from '../components/SideMenu'
import Hamburger from '../components/Hamburger'
import Topbar from '../components/Topbar'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  
  return (
    <div className="dashboardLayout">
        <SideMenu/>
        <div className="dashboardLayout__col">
          <Topbar/>
          <main className="dashboardLayout__outlet">
            <Outlet></Outlet>
          </main>
        </div>
    </div>
  )
}

export default DashboardLayout
