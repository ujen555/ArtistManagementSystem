import React from 'react'
import { useSidebarContext } from '../context/SidebarContext.jsx'
function Hamburger() {
    const {isCollapsed,setIsCollapsed}=useSidebarContext();
    return (
        <button onClick={()=>setIsCollapsed(isCollapsed=>!isCollapsed)} className={`hamburger ${isCollapsed?'open':''}`}>
            <span></span>
        </button>
    )
}

export default Hamburger
