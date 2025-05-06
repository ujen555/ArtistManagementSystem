import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, NavLink } from 'react-router-dom';
import { useSidebarContext } from '../context/SidebarContext.jsx';
import { FaUsers } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { FaMusic } from "react-icons/fa";
import { useCurrentUser } from '../hooks/useCurrentUser.js';
import { hasRole } from '../helpers/helpers.js';

function SideMenu() {
  const {data:currentUser}=useCurrentUser();
   const {isCollapsed}=useSidebarContext();
    return (
      <> 
        <Sidebar collapsed={isCollapsed} backgroundColor="#fff"   collapsedWidth="0px" rootStyles={{
          borderWidth:'0px'
        }} >
      
            <Link  to='/'>
             <h1 className="appLogo">
              AMS
              </h1>
            </Link>
       
          <Menu
            menuItemStyles={{
              padding:'40px',
              root:{
                fontSize:'1.6rem',
                fontWeight:'500'
              },
              icon:{
                fontSize:'2rem'
              },  
              button: {
                color: '#141414',
                [`&:hover`]:{
                  color: '#fff',
                  backgroundColor: '#108A00',
                },
                [`&.active`]: {
                  color: '#fff',
                  backgroundColor: '#108A00',
                },
                [`&.ps-disabled`]: {
                  color: '#D4D7E3',
                },
              },
            }}
          >
            <MenuItem icon={<FaUsers/>} component={<NavLink  to="/users" />} disabled={!hasRole(currentUser,['super_admin'])}>Users</MenuItem>
            <MenuItem icon={<GiMicrophone/>} component={<NavLink to="/artists" />} disabled={!hasRole(currentUser,['super_admin',
              'artist_manager'])}>Artists</MenuItem>
            <MenuItem icon={<FaMusic/>} component={<NavLink to="/songs" />} disabled={!hasRole(currentUser,['artist'])}>My Songs</MenuItem>
          </Menu>
        </Sidebar>
      </>
    );
}

export default SideMenu
