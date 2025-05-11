import React from 'react';

function Myacc() {
  return (
    <div id="main-content" className="main-wrapper page-default content-shop">
      <div className="entry-content">
        <h2 className="title-shop-page">My Account</h2>
        <div className="woocommerce">
          <div className="woocommerce-notices-wrapper"></div>
          <h2>Login</h2>
          <form className="woocommerce-form woocommerce-form-login login" method="post">
            <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
              <label htmlFor="username">Username or email address&nbsp;<span className="required">*</span></label>
              <input
                type="text"
                className="woocommerce-Input woocommerce-Input--text input-text"
                name="username"
                id="username"
                autoComplete="username"
                value=""
              />
            </p>
            <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
              <label htmlFor="password">Password&nbsp;<span className="required">*</span></label>
              <input
                className="woocommerce-Input woocommerce-Input--text input-text"
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
              />
            </p>
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
              <input type="hidden" id="woocommerce-login-nonce" name="woocommerce-login-nonce" value="0e8beb2de9" />
              <input type="hidden" name="_wp_http_referer" value="/my-account/" />
              <button type="submit" className="woocommerce-button button woocommerce-form-login__submit" name="login" value="Log in">
                Log in
              </button>
              {/* <button type="submit" className="woocommerce-button button woocommerce-form-login__submit" name="register" value="register">
              Register
              </button> */}
            </p>
            {/* <p className="woocommerce-LostPassword lost_password">
              <a href="https://necshop.7uptheme.net/my-account/lost-password/">Lost your password?</a>
            </p> */}
          </form>
          <p className="woocommerce-LostPassword lost_password">
              <a href="/re">Create an account?</a>
            </p>
        </div>
      </div>
    </div>
  );
}

export default Myacc;
