import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Link from "@mui/material/Link";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import "./Login.css";

export const Login = () => {
  const [email, setemail] = useState("");
  const [emailErrMessage, setemailErrMessage] = useState("");
  const [emailerr, setemailerr] = useState(false);
  const [password, setpassword] = useState("");
  const [passworderr, setpassworderr] = useState(false);
  const [PasswordErrMessage, setPasswordErrMessage] = useState("");
  let navigate = useNavigate();
  const jwt = Cookies.get("jwt");
  const [loading, setLoading] = useState(false);

  const validate = (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = {};
    let hasError = false;
    if (!email) {
      setemailErrMessage("UserId is required");
      hasError = true;
      setemailerr(true);
    } else {
      setemailErrMessage("");
      setemailerr(false);
      hasError = false;
    }
    if (!password) {
      setPasswordErrMessage("Password is required");
      hasError = true;
      setpassworderr(true);
      setLoading(false);
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

    if (!hasError) {
      fetch("https://oep-backend-node.herokuapp.com/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.jwtToken) {
            setLoading(false);
            Cookies.set("jwt", json.jwtToken);
            navigate("/");
          } else if (json.error_msg) {
            alert("invalid");
            setLoading(false);
          }
        });
    }
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={validate}>
        <div className="input-container">
          <TextField
            error={emailerr}
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            label="UserId"
            helperText={emailErrMessage}
          />
        </div>
        <div className="input-container">
          <TextField
            error={passworderr}
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            
            label="Password"
            helperText={PasswordErrMessage}
            type="password"
            autoComplete="current-password"
          />
        </div>

        <div className="button-container">
          {loading === false ? (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          ) : (
            <ClipLoader
              loading={loading}
              color="#317ac7"
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="loader"
            />
          )}
        </div>
      </form>
      <div className="register-link">
        <p>New User ?&nbsp;</p>

        <Link
          component="button"
          style={{ textDecoration: "none" }}
          variant="body2"
          onClick={() => {
            navigate("/RegisterPage");
          }}
        >
          Register&nbsp;
        </Link>
      </div>
    </div>
  );

  if (jwt !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="app">
      <div className="login-form">
        <div className="signin-text">
          <img src={require("../img/OEP.png")} alt="logo" id="imgland" />
        </div>
        <h1 className="sign-in-title">Sign In</h1>
        {renderForm}
      </div>
    </div>
  );
};
