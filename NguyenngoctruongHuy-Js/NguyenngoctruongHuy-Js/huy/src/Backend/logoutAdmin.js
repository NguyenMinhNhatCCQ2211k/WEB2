import { useNavigate } from "react-router-dom";
import UserContext from "../frontend/context/userContext";
import React, { useEffect, useContext } from "react";

function Logout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
 
  useEffect(() => {
    setUser("");
    localStorage.removeItem("userAdmin"); 
    navigate("/admin");
    window.location.reload();
  }, [setUser, navigate]);
  return (
    <></>
  );
 
}

export default Logout;
