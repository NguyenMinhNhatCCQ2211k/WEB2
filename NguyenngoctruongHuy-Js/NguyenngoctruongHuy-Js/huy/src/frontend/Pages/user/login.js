import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUser from "../../../api/apiUser";
import UserContext from "../../context/userContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email, // Adjust to username if backend requires it
            password: password,
        };
        console.log("Login payload:", data);
        try {
            const response = await apiUser.loginUser(data);
            console.log("Login response:", response);
            const username = response.user?.username || response.username || "default_username";

            localStorage.setItem("user", JSON.stringify(username));
            setUser(username);
            setEmail("");
            setPassword("");

            alert("Đăng nhập thành công");
            navigate("/home");
        } catch (error) {
            console.error("Login error details:", {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers,
            });
            alert(`Login failed: ${error.response?.data?.error?.message || error.message}`);
        }
    };

    return (
        <div id="main-content" className="main-wrapper page-default content-shop">
            <div className="entry-content">
                <h2 className="title-shop-page">Đăng nhập</h2>
                <div className="woocommerce">
                    <div className="woocommerce-notices-wrapper"></div>
                    <h2>Login</h2>
                    <form className="woocommerce-form woocommerce-form-login login" onSubmit={handleSubmit}>
                        <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                            <label htmlFor="email">
                                Email <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                className="form-control border-0 px-4"
                                placeholder="Your Email"
                                style={{ height: "55px" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                            <label htmlFor="password">
                                Password <span className="required">*</span>
                            </label>
                            <input
                                type="password"
                                className="form-control border-0 px-4"
                                placeholder="Password"
                                style={{ height: "55px" }}
                                value={password}
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
                                />{" "}
                                <span>Remember me</span>
                            </label>
                            <button
                                type="submit"
                                className="woocommerce-button button woocommerce-form-login__submit"
                                name="login"
                                value="Log in"
                            >
                                Đăng nhập
                            </button>
                        </p>
                        <p className="woocommerce-LostPassword lost_password">
                            <a href="/re">Đăng ký?</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;