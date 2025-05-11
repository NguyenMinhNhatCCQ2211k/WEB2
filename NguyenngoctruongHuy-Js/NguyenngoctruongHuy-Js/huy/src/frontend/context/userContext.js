import React,{ createContext ,useState} from "react";

const UserContext=createContext();
export const UserProvider=({children})=>{
    const [user, setUser] = useState(() => {
        // Parse stored user data from local storage if available
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : "";
      });
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext;