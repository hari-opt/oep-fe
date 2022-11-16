import React, { useEffect, useState } from "react";
import { Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState("");
  const jwt = Cookies.get("jwt");

  const handlelogout = (e) => {
    e.preventDefault();
    navigate("/login");
    Cookies.remove("jwt");
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("https://oep-backend-node.herokuapp.com/user-details", {
      method: "GET",
      headers: { Authorization: `bearer ${jwt}` },
    })
      .then((response) => response.json())
      .then((json) => setUserAvatar(json.userDetails.firstname));
  };

  return (
    <div className="header-component">
      <img
        src={require("../img/OEP.png")}
        alt="logo"
        id="imgreferral"
        className="logo"
        onClick={() => navigate("/")}
      />

      <div className="header-avatar-logout">
        <Avatar
          sx={{ width: 45, height: 45 }}
          className="header-avatar"
          style={{ backgroundColor: "#168aad" }}
        >
          {userAvatar.charAt(0).toUpperCase()}
        </Avatar>
        <Button
          onClick={handlelogout}
          variant="contained"
          className="logout"
          style={{ backgroundColor: "#0070ad" }}
        >
          logout
        </Button>
      </div>
    </div>
  );
};
