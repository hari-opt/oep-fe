import React, { useState } from "react";
import Cookies from "js-cookie";
import { MdGroups } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import "./LoginForm.css";

const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginError, setShowLoginError] = useState("");
  const [idErrorMessage, setIdErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  const jwt = Cookies.get("jwt_token");

  const onChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = (jwtToken, userDetails) => {
    // const history = useHistory
    setShowLoginError("");
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    navigate("/");
  };

  const onSubmitFailure = (error) => {
    setShowLoginError(error);
  };

  const validateInputDetails = (userDetails) => {
    for (const prop in userDetails) {
      onBlur(prop, userDetails[prop].length);
    }
  };

  const onSubmitLoginDetails = async (event) => {
    event.preventDefault();
    setShowLoader(true);
    setShowLoginError("");
    const userDetails = { userId, password };

    validateInputDetails(userDetails);

    console.log(idErrorMessage, passwordErrorMessage);
    if (userId.length === 0 || password.length === 0) {
      setShowLoader(false);
      return;
    } else {
      console.log("no error");
      const url = "https://oep-backend-node.herokuapp.com/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };

      const response = await fetch(url, options);
      setShowLoader(false);

      const data = await response.json();
      if (response.ok === true) {
        onSubmitSuccess(data.jwtToken, userDetails.userId);
      } else {
        onSubmitFailure(data.error_msg);
      }
    }
  };

  const onBlur = (label, length) => {
    switch (label) {
      case "userId":
        if (length === 0) {
          setIdErrorMessage(true);
        } else setIdErrorMessage(false);
        break;
      case "password":
        if (length === 0) {
          setPasswordErrorMessage(true);
        } else setPasswordErrorMessage(false);
        break;

      default:
        break;
    }
  };

  if (jwt !== undefined) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="bg-container">
      <div className="user-login-form-container">
        <div className="landing-image-main-container">
          <div className="landing-image-container">
            <img
              alt="web-logo"
              className="web-login-logo"
              src="https://res.cloudinary.com/dbdv9w5si/image/upload/v1665052388/template_primary_fghkg2.png"
            />
            <h1 className="app-title">Optimum InfoSystem</h1>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="login-form-container">
          <form
            className="login-form-sub-container"
            onSubmit={onSubmitLoginDetails}
          >
            <div className="login-web-logo-name-container">
              <MdGroups className="md-icon" size={90} />
            </div>
            <div className="login-user-field-container">
              <label htmlFor="userId" className="login-input-label">
                User Id
              </label>
              <input
                placeholder="User Id"
                type="text"
                id="userId"
                className="input-field"
                onChange={onChangeUserId}
                value={userId}
                onBlur={(userId) =>
                  onBlur(userId.target.id, userId.target.value.length)
                }
              />
              {idErrorMessage && (
                <p className="login-error-message">* Required</p>
              )}
            </div>
            <div className="login-password-field-container">
              <label htmlFor="userpassword" className="login-input-label">
                Password
              </label>
              <input
                placeholder="Password"
                type="password"
                id="userpassword"
                className="input-field"
                onChange={onChangePassword}
                value={password}
                onBlur={(password) =>
                  onBlur(password.target.id, password.target.value.length)
                }
              />
              {passwordErrorMessage && (
                <p className="login-error-message">* Required</p>
              )}
            </div>

            <button type="submit" className="login-submit-button">
              Login
            </button>
            {showLoginError && (
              <p className="login-error-message">{showLoginError}</p>
            )}
            {showLoader ? (
              <TailSpin
                height="40"
                width="40"
                color="#ec4608"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="sign-up-button"
              >
                Sign up
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
