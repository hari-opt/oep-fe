import React, { useEffect, useState } from "react";
import { CardContent, Card, Link, Button, Grid, Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Header } from "../Header/Header";
import PulseLoader from "react-spinners/PulseLoader";
import "./MyRefferal.css";

export const MyRefferal = () => {
  const [refferalData, setRefferalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  let navigate = useNavigate();
  const jwt = Cookies.get("jwt");

  useEffect(() => {
    getData();
    getDatatwo();
  }, []);

  const getData = async () => {
    setLoading(true);
    console.log("running");
    fetch("https://oep-backend-node.herokuapp.com/job-referral/", {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setRefferalData([refferalData, data.userReferral]);
        console.log("refferaldata", refferalData);
      });
  };

  const getDatatwo = () => {
    fetch("https://oep-backend-node.herokuapp.com/user-details", {
      method: "GET",
      headers: { Authorization: `bearer ${jwt}` },
    })
      .then((response) => response.json())
      .then((json) => setUserAvatar(json.userDetails.firstname));
  };

  const handlelogout = (e) => {
    e.preventDefault();
    navigate("/login");
    Cookies.remove("jwt");
  };

  return (
    <div>
      <div className="header-backarrow">
        <ArrowBackIcon
          style={{ fontSize: "40" }}
          className="back-arrow"
          onClick={() => navigate(-1)}
        />
        <Header />
      </div>
      <div>
        {loading ? (
          <PulseLoader
            loading={loading}
            color="#317ac7"
            aria-label="Loading Spinner"
            data-testid="loader"
            className="loaderrefferal"
          />
        ) : (
          <Card
            style={{
              display: "flex",
              flexWrap: "wrap",
              height: "565px",
            }}
          >
            {refferalData.flat(1).length === 0 ? (
              <div id="noreferral">
                <h2>No Referrals yet</h2>
              </div>
            ) : (
              refferalData.flat(1).map((item) => (
                <CardContent
                  style={{
                    margin: "1.5rem",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    height: "210px",
                    width: "250px",
                  }}
                >
                  <label style={{ color: "#0070ad" }}>Job Reffered</label>
                  <ul>
                    <li>{`JobId :  ${item.jobid}`}</li>
                    <li>{`Refferad By : ${item.referredby}`}</li>
                    <li>{`First Name : ${item.firstname}`}</li>
                    <li>{`Last Name : ${item.lastname}`}</li>
                    <li>{`Email : ${item.email}`}</li>
                    <li>{`Mobile No : ${item.phone}`}</li>
                    <li>{`Status : ${item.status}`}</li>
                    <li>
                      <Link underline="none" href={item.resume} target="_blank">
                        <h4 style={{ margin: "3px", color: "blue" }}>
                          Click here for resume
                        </h4>
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              ))
            )}
          </Card>
        )}
      </div>
    </div>
  );
};
