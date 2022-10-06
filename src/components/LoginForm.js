import React, { useState } from "react";

import "./LoginForm.css";

const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginError, setShowLoginError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="user-login-form-container">
      <div className="landing-image-container">
        <img
          src="https://res.cloudinary.com/hariy/image/upload/v1642575234/TastyKitchen/Rectangle_1457_pek5zd.png"
          alt="website login"
          className="login-mobile-landing-image"
        />
        <img
          src="https://res.cloudinary.com/dbdv9w5si/image/upload/v1664366503/whyoptimum_vkhzyn.jpg"
          alt="website login"
          className="login-desktop-landing-image"
        />
      </div>
      <div className="login-form-container">
        <form
          className="login-form-sub-container"
          //   onSubmit={this.onSubmitLoginDetails}
        >
          <img
            src="https://res.cloudinary.com/hariy/image/upload/v1642622290/TastyKitchen/Vector_1_i2n5wd.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="app-title">Optimum Info Systems</h1>
          <h1 className="login-heading">Login</h1>
          <div className="login-user-field-container">
            <label htmlFor="username" className="login-input-label">
              USERID
            </label>
            <input
              placeholder="User Id"
              type="text"
              id="userId"
              className="input-field"
              onChange={(event) => setUserId(event.target.value)}
              value={userId}
            />
          </div>
          <div className="login-password-field-container">
            <label htmlFor="userpassword" className="login-input-label">
              PASSWORD
            </label>
            <input
              placeholder="Password"
              type="password"
              id="userpassword"
              className="input-field"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
          <button type="submit" className="login-submit-button">
            Login
          </button>
          {showLoginError && (
            <p className="login-error-message">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
