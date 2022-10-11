import React, { useState } from "react";
import Cookies from "js-cookie";
import { MdGroups } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import "./Register.css";

const gender = [
  {
    id: 0,
    displayText: "Male",
    value: "Male",
  },
  {
    id: 1,
    displayText: "Female",
    value: "Female",
  },
  {
    id: 2,
    displayText: "Other",
    value: "Other",
  },
];

function Register() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userGender, setUserGender] = useState(gender[0].value);
  const [password, setPassword] = useState("");
  const [showRegisterError, setShowRegisterError] = useState("");
  const [showRegisterSuccess, setShowRegisterSuccess] = useState("");
  const [idErrorMessage, setIdErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [mobileErrorMessage, setMobileErrorMessage] = useState(false);
  const [locationErrorMessage, setLocationErrorMessage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  const jwt = Cookies.get("jwt_token");

  const onChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const onChangeUserEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const onChangeUserMobile = (event) => {
    setUserMobile(event.target.value);
  };

  const onChangeUserLocation = (event) => {
    setUserLocation(event.target.value);
  };

  const onChangeUserGender = (event) => {
    setUserGender(event.target.value);
  };

  const onSubmitSuccess = (message) => {
    if (message === "User registered") {
      setShowRegisterSuccess(message);
    }
  };

  const onSubmitFailure = (error) => {
    setShowRegisterError(error);
  };

  const onSubmitregisterDetails = async (event) => {
    event.preventDefault();
    const userDetails = {
      userId,
      userName,
      userEmail,
      userMobile,
      userLocation,
      userGender,
      password,
    };
    for (const prop in userDetails) {
      onBlur(prop, userDetails[prop].length);
    }
    console.log(
      idErrorMessage,
      passwordErrorMessage,
      userNameErrorMessage,
      emailErrorMessage,
      mobileErrorMessage,
      locationErrorMessage
    );

    if (
      idErrorMessage ||
      passwordErrorMessage ||
      userNameErrorMessage ||
      emailErrorMessage ||
      mobileErrorMessage ||
      locationErrorMessage
    ) {
      return;
    } else {
      setShowRegisterError("");
      setShowLoader(true);

      const url = "https://oep-backend-node.herokuapp.com/register";
      // const url = "http://localhost:9010/register";
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
      if (response.ok === true && data.msg === "User registered") {
        onSubmitSuccess(data.msg);
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
      case "userName":
        if (length === 0) {
          setUserNameErrorMessage(true);
        } else setUserNameErrorMessage(false);
        break;
      case "userEmail":
        if (length === 0) {
          setEmailErrorMessage(true);
        } else setEmailErrorMessage(false);
        break;
      case "userMobile":
        if (length === 0) {
          setMobileErrorMessage(true);
        } else setMobileErrorMessage(false);
        break;
      case "userLocation":
        if (length === 0) {
          setLocationErrorMessage(true);
        } else setLocationErrorMessage(false);
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
      <div className="user-register-form-container">
        <div className="landing-image-main-container">
          <div className="landing-image-container">
            <img
              alt="web-logo"
              className="web-register-logo"
              src="https://res.cloudinary.com/dbdv9w5si/image/upload/v1664427009/optimumsolutions_wbwgx9.svg"
            />
          </div>
        </div>
        <hr className="hr-line" />
        <div className="register-form-container">
          <form
            className="register-form-sub-container"
            onSubmit={onSubmitregisterDetails}
          >
            {/* <div className="register-web-logo-name-container">
              <MdGroups className="md-icon" size={90} />
            </div> */}
            <div className="register-user-field-container">
              <label htmlFor="userId" className="register-input-label">
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
                <p className="register-error-message">* Required</p>
              )}
            </div>
            <div className="register-user-field-container">
              <label htmlFor="userName" className="register-input-label">
                User name
              </label>
              <input
                placeholder="Full Name"
                type="text"
                id="userName"
                className="input-field"
                onChange={onChangeUserName}
                value={userName}
                onBlur={(userName) =>
                  onBlur(userName.target.id, userName.target.value.length)
                }
              />
              {userNameErrorMessage && (
                <p className="register-error-message">* Required</p>
              )}
            </div>
            <div className="register-user-field-container">
              <label htmlFor="userEmail" className="register-input-label">
                Email
              </label>
              <input
                placeholder="Email"
                type="email"
                id="userEmail"
                className="input-field"
                onChange={onChangeUserEmail}
                value={userEmail}
                onBlur={(userEmail) =>
                  onBlur(userEmail.target.id, userEmail.target.value.length)
                }
              />
              {emailErrorMessage && (
                <p className="register-error-message">* Required</p>
              )}
            </div>
            <div className="register-user-field-container">
              <label htmlFor="userMobile" className="register-input-label">
                Mobile
              </label>
              <input
                placeholder="Mobile"
                type="text"
                id="userMobile"
                className="input-field"
                onChange={onChangeUserMobile}
                value={userMobile}
                onBlur={(userMobile) =>
                  onBlur(userMobile.target.id, userMobile.target.value.length)
                }
              />
              {mobileErrorMessage && (
                <p className="register-error-message">* Required</p>
              )}
            </div>
            <div className="register-user-field-container">
              <label htmlFor="userLocation" className="register-input-label">
                Location
              </label>
              <input
                placeholder="Location"
                type="text"
                id="userLocation"
                className="input-field"
                onChange={onChangeUserLocation}
                value={userLocation}
                onBlur={(userLocation) =>
                  onBlur(
                    userLocation.target.id,
                    userLocation.target.value.length
                  )
                }
              />
              {locationErrorMessage && (
                <p className="register-error-message">* Required</p>
              )}
            </div>
            <div className="register-user-field-container">
              <label htmlFor="userGender" className="register-input-label">
                Gender
              </label>
              <select
                id="userGender"
                className="input-field"
                onChange={onChangeUserGender}
                value={userGender}
              >
                {gender.map((each) => (
                  <option key={each.id} value={each.value}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div className="register-password-field-container">
              <label htmlFor="password" className="register-input-label">
                Password
              </label>
              <input
                placeholder="Password"
                type="password"
                id="password"
                className="input-field"
                onChange={onChangePassword}
                value={password}
                onBlur={(password) =>
                  onBlur(password.target.id, password.target.value.length)
                }
              />
              {passwordErrorMessage && (
                <p className="register-error-message">* Required</p>
              )}
            </div>
            <button type="submit" className="sign-up-button">
              Register
            </button>
            {showRegisterError && (
              <p className="register-error-message">{showRegisterError}</p>
            )}
            {showRegisterSuccess && (
              <>
                <p className="register-success-message">
                  {showRegisterSuccess}
                </p>
                <button
                  type="button"
                  className="sign-up-button navigate-login-button"
                  onClick={() => navigate("/login")}
                >
                  Login Here
                </button>
              </>
            )}
            {showLoader && (
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
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
