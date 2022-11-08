import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Link from "@mui/material/Link";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";

export const Login = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openBackdrop, setopenBackdrop] = React.useState(false);
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
    // setopenBackdrop(true)
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
            multiline
            maxRows={2}
            label="UserId"
            helperText={emailErrMessage}
            type="number"
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
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
    </div>
  );

  if (jwt !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="app">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        {/* <CircularProgress color="inherit" /> */}
      </Backdrop>

      <div className="login-form">
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div className="title">Sign In</div>

          <img src={require("../img/OEP.png")} alt="logo" id="imgland" />
        </div>
        {renderForm}
      </div>
    </div>
  );
};
