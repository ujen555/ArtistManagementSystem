import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext=createContext(undefined);

export default function SidebarContextProvider({children}){
    const [isCollapsed,setIsCollapsed]=useState(false);
    const [width,setWidth]=useState("");
  
    function getSize(){
      setWidth(window.innerWidth);
    }
  
    useEffect(()=>{
      window.addEventListener('resize',getSize);
      if(width<1023){
        setIsCollapsed(true)
      }
      else{
        setIsCollapsed(false);
      }
      return ()=>{
        window.removeEventListener('resize',getSize);
      }
    },[window.innerWidth])
    return <SidebarContext.Provider value={{isCollapsed,setIsCollapsed}}>
        {children}
    </SidebarContext.Provider>
}

export function useSidebarContext(){
    const context=useContext(SidebarContext);
    if(context === undefined){
        throw new Error("useSidebarContext must be inside of a SidebarContextProvider")
    }
    return context;
}