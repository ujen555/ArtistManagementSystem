// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext=createContext(undefined);

// export default function AuthProvider({children}){
//     const [currentUser,setCurrentUser]=useState();
//     const [loadingCurrentUser, setLoadingCurrentUserg] = useState(true);

//     function currentUserSetter(user){
//         setCurrentUser(user);
//     }

 
//     })

//     return <AuthContext.Provider value={{currentUser,currentUserSetter,loadingCurrentUser}}>
//         {children}
//     </AuthContext.Provider>
// }

// export function useAuth(){
//     const context=useContext(AuthContext);
//     if(context === undefined){
//         throw new Error("useAuth must be inside of a authProvider")
//     }
//     return context;
// }