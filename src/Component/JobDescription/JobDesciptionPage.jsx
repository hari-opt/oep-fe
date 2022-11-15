import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useNavigate, useLocation, json } from "react-router-dom";
import { Alert, TextField, Grid } from "@mui/material";
import Cookies from "js-cookie";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Header } from "../Header/Header";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const JobDescriptionPage = ({ props }) => {
  const jwt = Cookies.get("jwt");
  console.log("jwtttttt", jwt);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [openModal, setopenModal] = React.useState(false);
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [PhoneNumber, setPhoneNumber] = React.useState("");
  const handleOpenmodal = () => setopenModal(true);
  const handleClosemodal = () => setopenModal(false);
  const [resumefile, setResumefile] = useState("");
  const [resume, setResume] = useState("");
  const [responseMsz, setResponseMsz] = useState("");
  const form = new FormData();
  console.log("resume==<", responseMsz);

  const fileProperties = (data) => {
    setResume(data.target.files[0].name);
    setResumefile(data.target.files[0]);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    form.append("file", resumefile, `Reffer_${firstName}_Resume`);
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("email", Email);
    form.append("phone", PhoneNumber);
    form.append("jobId", state.data.jobid);
  
    fetch("https://oep-backend-node.herokuapp.com/job-referral/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        filename: resume,
      },
      body: form,
    })
      .then((response) => response.json())
      .then((json) => {
        alert("Referral was submitted!");
        setopenModal(false);
        setResponseMsz(json);
        console.log(json, "resssssssssssssss1111111111");
      });
  };

  const handleMyReferrals = () => {
    navigate("../MyRefferalPage");
  };

  return (
    <form onSubmit={handlesubmit}>
      <Header />
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            borderRadius: "10rem",
            marginLeft: "10px",
            width: "15%",
            border: "2px solid #0070ad",
            color: "#0070ad",
          }}
          onClick={handleOpenmodal}
          variant="outlined"
        >
          Refer a friend
        </Button>
        {responseMsz.message === "Referred" ? (
          <Button
            style={{
              borderRadius: "10rem",
              marginLeft: "10px",
              width: "15%",
              border: "2px solid #0070ad",
            }}
            onClick={handleMyReferrals}
            variant="outlined"
          >
            My Refferals
          </Button>
        ) : null}
      </div>

      <Modal
        open={openModal}
        onClose={handleClosemodal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 style={{ color: "#0070ad" }}>
            Please provide your referral's information
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                color: "#0070ad",
              }}
            >
              Job ID
            </p>

            <p
              style={{
                position: "relative",
                right: "8.5rem",
                fontSize: "1.3rem",
              }}
            >
              {state.data.jobid}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                color: "#0070ad",
              }}
            >
              First name
            </p>

            <TextField
              style={{ width: "70%" }}
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                color: "#0070ad",
              }}
            >
              Last name
            </p>

            <TextField
              style={{ width: "70%" }}
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                color: "#0070ad",
              }}
            >
              Email
            </p>

            <TextField
              style={{ width: "70%" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                color: "#0070ad",
              }}
            >
              Phone number
            </p>
            <TextField
              style={{ width: "70%" }}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              marginTop: "20px",
              textAlign: "right",
            }}
          >
            <label htmlFor="Upload-Resume">
              <input
                style={{ display: "none" }}
                id="Upload-Resume"
                name="Upload-Resume"
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => fileProperties(e)}
              />

              <Fab
                color="primary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                style={{ width: "10rem", marginLeft: "1rem" }}
              >
                <AddCircleOutlineIcon />
                Upload Resume
              </Fab>
              <br />
              <br />
            </label>
            {resume !== "" ? <h5>{resume}</h5> : null}
          </div>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              style={{
                borderRadius: "10rem",
                marginLeft: "10px",
                width: "30%",
                backgroundColor: "#0070ad",
                color: "white",
                border: "1px solid #0070ad",
              }}
              onClick={handleClosemodal}
              variant="outlined"
            >
              Cancel
            </Button>

            <Button
              style={{
                borderRadius: "10rem",
                marginLeft: "10px",
                width: "30%",
                backgroundColor: "#0070ad",
                color: "white",
                border: "1px solid #0070ad",
              }}
              variant="outlined"
              onClick={handlesubmit}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>

      <div style={{ padding: "10px" }}>
        <div class="split left">
          <h2 style={{ color: "#0070ad" }}>{state.data.position}</h2>

          <div style={{ paddingTop: "20px" }}>
            <div className="divDescription">
              <label className="labelDescription">
                Job Title: {state.data.position}
              </label>
            </div>

            <div className="divDescription">
              <label className="labelDescription">
                Skills Must: {state.data.musthaveskills}{" "}
              </label>
            </div>

            <div className="divDescription">
              <label className="labelDescription">
                Expericence: {state.data.experience}
              </label>
            </div>
            <div className="divDescription">
              <label className="labelDescription">
                Skills Required: {state.data.requiredskills}
              </label>
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <label className="labelDescription">Job Description:</label>{" "}
            <p>{state.data.description}</p>
          </div>
        </div>

        <div class="split right">
          <div style={{ paddingLeft: "10px" }}>
            <div style={{ marginTop: "30px" }}>
              <p>Job ID:</p>
              <p style={{ color: "#0070ad" }}>{state.data.jobid}</p>
            </div>

            <div style={{ marginTop: "30px" }}>
              <p>Contract Type:</p>
              <p style={{ color: "#0070ad" }}>Full Time</p>
            </div>

            <div style={{ marginTop: "30px" }}>
              <p>Location:</p>

              <p style={{ color: "#0070ad" }}>{state.data.location}</p>
            </div>

            <div style={{ marginTop: "30px" }}>
              <p>Posted On:</p>

              <p style={{ color: "#0070ad" }}>{state.data.dateposted}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
