import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { useSidebarContext } from '../context/SidebarContext.jsx';
import { FaUsers } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { FaMusic } from "react-icons/fa";

function SideMenu() {
   const {isCollapsed}=useSidebarContext();
    return (
      <> 
        <Sidebar collapsed={isCollapsed} backgroundColor="#fff" >
          <h1 className="appLogo">
            AMS
          </h1>
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
              },
            }}
          >
            <MenuItem icon={<FaUsers/>} component={<NavLink  to="/users" />}>Users</MenuItem>
            <MenuItem icon={<GiMicrophone/>} component={<NavLink to="/calendar" />}>Artists</MenuItem>
            <MenuItem icon={<FaMusic/>} component={<NavLink to="/e-commerce" />}>Songs</MenuItem>
          </Menu>
        </Sidebar>
      </>
    );
}

export default SideMenu
