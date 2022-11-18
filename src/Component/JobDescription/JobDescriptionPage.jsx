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
import ClipLoader from "react-spinners/ClipLoader";
import "./JobDescriptionPage.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 568,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const JobDescriptionPage = ({ props }) => {
  const jwt = Cookies.get("jwt");
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
  const [loading, setLoading] = useState(false);
  const [alertMsz, setAlertMsz] = useState("");
  const [successMsz, setSuccessMsz] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const form = new FormData();

  const fileProperties = (data) => {
    setResumefile(data.target.files[0]);
    setResume(data.target.files[0].name);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    form.append("file", resumefile);
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
        if (json.message === "Referred") {
          setopenModal(false);
          setLoading(false);
          setResponseMsz(json.message);
          setSuccessMsz("User Reffered");
          setTimeout(() => {
            setAlertOpen(true);
          }, 5000);
          console.log(json, "resssssssssssssss1111111111");
        } else {
          setAlertMsz("All fields are required");
          setLoading(false);
        }
      });
  };

  const handleMyReferrals = () => {
    navigate("../MyRefferalPage");
  };

  return (
    <form onSubmit={handlesubmit}>
      <div className="header-backarrow">
        <ArrowBackIcon
          style={{ fontSize: "40" }}
          className="back-arrow"
          onClick={() => navigate(-1)}
        />
        <Header />
      </div>
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
        {responseMsz === "Referred" ? (
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
      {alertOpen === false ? (
        <div className="success-alert">
          {successMsz !== "" ? (
            <Alert severity="success" variant="filled">
              {successMsz}
            </Alert>
          ) : null}
        </div>
      ) : null}
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
          {responseMsz === "Referred" ? <h4>{`User ${responseMsz}`}</h4> : null}
          {alertMsz !== "" ? (
            <Alert severity="error" variant="filled">
              {alertMsz}
            </Alert>
          ) : null}
          <div className="job-discription">
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

          <div className="job-discription">
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
              required
            />
          </div>

          <div className="job-discription">
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
              required
            />
          </div>

          <div className="job-discription">
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
              required
            />
          </div>

          <div className="job-discription">
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
              required
            />
          </div>
          <div className="refferal-resume-upload">
            <label htmlFor="Upload-Resume">
              <input
                style={{ display: "none" }}
                id="Upload-Resume"
                name="Upload-Resume"
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => fileProperties(e)}
                required
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
            {resume !== "" ? <h4>{resume}</h4> : null}
          </div>

          <div className="refferal-cancel-button">
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
            {loading === false ? (
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
            ) : (
              <ClipLoader
                loading={loading}
                color="#317ac7"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loadertwo"
              />
            )}
          </div>
        </Box>
      </Modal>
      <div className="job-discription-data">
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
            <div className="job-details">
              <p>Job ID:</p>
              <p className="job-details-paragraph">{state.data.jobid}</p>
            </div>

            <div className="job-details">
              <p>Contract Type:</p>
              <p className="job-details-paragraph">Full Time</p>
            </div>

            <div className="job-details">
              <p>Location:</p>

              <p className="job-details-paragraph">{state.data.location}</p>
            </div>

            <div className="job-details">
              <p>Posted On:</p>

              <p className="job-details-paragraph">{state.data.dateposted}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
