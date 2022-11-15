import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./RegisterPage.css";

export const RegisterPage = () => {
  const [userID, setuserID] = useState("");
  const [userIDErrMessage, setuserIDErrMessage] = useState("");
  const [userIDerr, setuserIDerr] = useState(false);
  const [userName, setuserName] = useState("");
  const [userNameErrMessage, setuserNameErrMessage] = useState("");
  const [userNameerr, setuserNameerr] = useState(false);
  const [email, setemail] = useState("");
  const [emailErrMessage, setemailErrMessage] = useState("");
  const [emailerr, setemailerr] = useState(false);
  const [password, setpassword] = useState("");
  const [PasswordErrMessage, setPasswordErrMessage] = useState("");
  const [passworderr, setpassworderr] = useState(false);
  const [userMobile, setuserMobile] = useState("");
  const [userMobileErrMessage, setuserMobileErrMessage] = useState("");
  const [userMobileerr, setuserMobileerr] = useState(false);
  const [userGender, setuserGender] = useState("");
  const [userGenderErrMessage, setuserGenderErrMessage] = useState("");
  const [userGendererr, setuserGendererr] = useState(false);
  const [userLocation, setuserLocation] = useState("");
  const [userLocationErrMessage, setuserLocationErrMessage] = useState("");
  const [userLocationerr, setuserLocationerr] = useState(false);

  let navigate = useNavigate();

  const validate = (e) => {
    console.log(
      userID,
      userName,
      email,
      password,
      userMobile,
      userGender,
      userLocation,
      "check all user information"
    );

    e.preventDefault();
    let hasError = false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!userID) {
      setuserIDErrMessage("UserId is required");
      hasError = true;
      setuserIDerr(true);
    } else {
      setuserIDErrMessage("");
      setuserIDerr(false);
      hasError = false;
    }

    if (!userName) {
      setuserNameErrMessage("UserName is required");
      hasError = true;
      setuserNameerr(true);
    } else {
      setuserNameErrMessage("");
      setuserNameerr(false);
      hasError = false;
    }

    if (!email) {
      setemailErrMessage("Email is required!");
      setemailerr(true);
      hasError = true;
    } else if (!regex.test(email)) {
      setemailErrMessage("This is not a valid email format!");
      setemailerr(true);
      hasError = true;
    } else {
      setemailErrMessage("");
      setemailerr(false);
      hasError = false;
    }

    if (!password) {
      setPasswordErrMessage("Password is required");
      hasError = true;
      setpassworderr(true);
    } else if (password.length < 4) {
      setPasswordErrMessage("Password must be more than 4 characters");
      hasError = true;
      setpassworderr(true);
    } else if (password.length > 10) {
      setPasswordErrMessage("Password cannot exceed more than 10 characters");
      hasError = true;
      setpassworderr(true);
    } else {
      setPasswordErrMessage("");
      setpassworderr(false);
      hasError = false;
    }

    if (!userMobile) {
      setuserMobileErrMessage("Mobile Number is required");
      hasError = true;
      setuserMobileerr(true);
    } else {
      setuserMobileErrMessage("");
      setuserMobileerr(false);
      hasError = false;
    }

    if (!userGender) {
      setuserGenderErrMessage("UserGender is required");
      hasError = true;
      setuserGendererr(true);
    } else {
      setuserGenderErrMessage("");
      setuserGendererr(false);
      hasError = false;
    }

    if (!userLocation) {
      setuserLocationErrMessage("UserLocation is required");
      hasError = true;
      setuserLocationerr(true);
    } else {
      setuserLocationErrMessage("");
      setuserLocationerr(false);
      hasError = false;
    }

    if (!hasError) {
      fetch("https://oep-backend-node.herokuapp.com/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          userName: userName,
          userEmail: email,
          password: password,
          userMobile: userMobile,
          userGender: userGender,
          userLocation: userLocation,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "oooooooooooooooooooooooooooooooooooooo");
          if (data.msg === "User registered") {
            console.log("data->", data);
            navigate("../");
          } else {
            alert("User already registered! Try to login");
          }
        });
    }
  };

  const handleMessageBox = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({
        messageBox: "",
      });
    }
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={validate}>
        <div className="input-container">
          <TextField
            error={userIDerr}
            value={userID}
            onChange={(e) => {
              setuserID(e.target.value);
            }}
            multiline
            maxRows={2}
            label="UserId"
            helperText={userIDErrMessage}
            onKeyPress={(e) => handleMessageBox(e)}
          />
        </div>

        <div className="input-container">
          <TextField
            error={userNameerr}
            value={userName}
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            multiline
            maxRows={2}
            label="User Name"
            helperText={userNameErrMessage}
            onKeyPress={(e) => handleMessageBox(e)}
          />
        </div>

        <div className="input-container">
          <TextField
            error={emailerr}
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            multiline
            maxRows={2}
            label="Email"
            helperText={emailErrMessage}
            onKeyPress={(e) => handleMessageBox(e)}
          />
        </div>

        <div className="input-container">
          <TextField
            error={passworderr}
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            multiline
            maxRows={2}
            label="Password"
            helperText={PasswordErrMessage}
            onKeyPress={(e) => handleMessageBox(e)}
          />
        </div>

        <div className="input-container">
          <TextField
            error={userMobileerr}
            value={userMobile}
            onChange={(e) => {
              setuserMobile(e.target.value);
            }}
            multiline
            maxRows={2}
            label="Mobile Number"
            helperText={userMobileErrMessage}
            onKeyPress={(e) => handleMessageBox(e)}
          />
        </div>

        <div className="input-container">
          <TextField
            error={userGendererr}
            value={userGender}
            onChange={(e) => {
              setuserGender(e.target.value);
            }}
            multiline
            maxRows={2}
            label="Gender"
            helperText={userGenderErrMessage}
            onKeyPress={(e) => handleMessageBox(e)}
          />
        </div>

        <div className="input-container">
          <TextField
            error={userLocationerr}
            value={userLocation}
            onChange={(e) => {
              setuserLocation(e.target.value);
            }}
            multiline
            maxRows={2}
            label="Location"
            helperText={userLocationErrMessage}
            onKeyPress={(e) => handleMessageBox(e)}
          />
        </div>

        <div className="button-container">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app-reg">
      <div className="login-form">
        <div className="sign-up-title">
          <div
            className="sign-up"
            onClick={() => {
              navigate("../components/Dashboard");
            }}
          >
            Sign Up
          </div>

          <img src={require("../img/OEP.png")} alt="logo" id="imgland" />
        </div>

        {renderForm}
      </div>
    </div>
  );
};
