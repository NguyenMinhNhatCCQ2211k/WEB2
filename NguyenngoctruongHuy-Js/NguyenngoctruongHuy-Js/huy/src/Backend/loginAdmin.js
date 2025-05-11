import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUser from "../../src/api/apiUser";
import UserContext from "../../src/frontend/context/userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const data = {
      identifier: email,
      password: password,
    };
  
    try {
      const response = await apiUser.loginUser(data);
      console.log("Login successful:", response);
      alert("Login successful");
  
      const username = response.data.user || 'default_username'; 
  
      console.log("user :", username)
      setUser(username);
      setEmail("");
      setPassword("");
      localStorage.setItem("userAdmin", JSON.stringify(username));
    
      navigate("/admin/dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
      alert(`Login failed: ${error.response?.data?.error || error.message}`);
    }
  };
  
  return (
    <div id="main-content" className="main-wrapper page-default content-shop">
    <div className="entry-content">
      <h2 className="title-shop-page">Login Admin</h2>
      <div className="woocommerce">
        <div className="woocommerce-notices-wrapper"></div>
      
  
        <form className="woocommerce-form woocommerce-form-login login" onSubmit={handleSubmit}>
     
          <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label htmlFor="email">Email address&nbsp;<span className="required">*</span></label>
            <input
              type="email"
              className="form-control border-0 px-4"
              placeholder="Your Email"
              style={{ height: "55px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
   
          <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label htmlFor="password">Password&nbsp;<span className="required">*</span></label>
            <input
              type="password"
              className="form-control border-0 px-4"
              placeholder="Password"
              style={{ height: "55px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  

          <p className="form-row">
            <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
              <input
                className="woocommerce-form__input woocommerce-form__input-checkbox"
                name="rememberme"
                type="checkbox"
                id="rememberme"
                value="forever"
              />{' '}
              <span>Remember me</span>
            </label>
            <button type="submit" className="woocommerce-button button woocommerce-form-login__submit" name="login" value="Log in">
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
  
  );
}

export default Login;
