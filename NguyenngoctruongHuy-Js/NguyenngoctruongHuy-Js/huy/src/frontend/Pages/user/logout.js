import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import React, { useEffect, useContext } from "react";

function Logout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
 
  useEffect(() => {
    setUser("");
    localStorage.removeItem("user"); 
    alert("Đăng xuất thành công")
   
  }, [setUser, navigate]);

  navigate("/home");

  return (
   
    <></>

  );
 
}

export default Logout;
