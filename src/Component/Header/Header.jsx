import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import Cookies from "js-cookie";

export const Header = () => {
  const navigate = useNavigate();

  const handlelogout = (e) => {
    e.preventDefault();
    navigate("/login");
    Cookies.remove("jwt");
  };

  return (
    <div className="myreferralheader">
      <Grid container spacing={2} className="grid">
        <Grid item xs={4} className="grid">
          <img src={require("../img/OEP.png")} alt="logo" id="imgreferral" />
        </Grid>
        <Grid item xs={4.9}></Grid>
        <Grid item xs={2} className="grid">
          <Button
            onClick={handlelogout}
            variant="contained"
            className="logout"
            style={{ backgroundColor: "#0070ad" }}
          >
            logout
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};
