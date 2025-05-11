import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import apiUser from "../../../api/apiUser";
function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
      phone,
      address,
    };
    console.log("Attempting to register user with data:", user);
    try {
      const response = await apiUser.createUser(user);
      console.log("Registration successful:", response.data);
      alert("Registration successful");
      
      setUserName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        `Registration failed: ${error.response?.data?.error || error.message}`
      );
    }
  };
  return (
    <div className="woocommerce">
    <div className="woocommerce-notices-wrapper"></div>
    <h2>Đăng ký </h2>
    <form className="woocommerce-form woocommerce-form-login login" method="post" onSubmit={handleSubmit}>
      <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
        <label htmlFor="name">Tên&nbsp;<span className="required">*</span></label>
        <input
          type="text"
          className="woocommerce-Input woocommerce-Input--text input-text"
          name="name"
          id="name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </p>
      <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
        <label htmlFor="email">Email&nbsp;<span className="required">*</span></label>
        <input
          type="email"
          className="woocommerce-Input woocommerce-Input--text input-text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </p>
      <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
        <label htmlFor="password">Password&nbsp;<span className="required">*</span></label>
        <input
          type="password"
          className="woocommerce-Input woocommerce-Input--text input-text"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </p>
      <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
        <label htmlFor="phone">Số điện thoại&nbsp;<span className="required">*</span></label>
        <input
          type="tel"
          className="woocommerce-Input woocommerce-Input--text input-text"
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </p>
      <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
        <label htmlFor="address">Địa chỉ&nbsp;<span className="required">*</span></label>
        <input
          type="text"
          className="woocommerce-Input woocommerce-Input--text input-text"
          name="address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </p>
      <p className="form-row">
        <button type="submit" className="woocommerce-button button woocommerce-form-login__submit" name="register" value="Register">Register</button>
      </p>
    </form>
  </div>
  
  );
}
export default Register;
