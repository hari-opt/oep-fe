import React, { useState, useEffect, useRef } from "react";
import { Button, Alert, Fab } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";

export const UserResumeUpload = () => {
  const [resumeLink, setResumeLink] = useState("");
  const [resumefile, setResumefile] = useState("");
  const [resumeMsz, setResumeMsz] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const jwt = Cookies.get("jwt");

  useEffect(() => {
    getResume();
  }, []);

  const fileProperties = (data) => {
    // console.log(data.target.files[0], "asaiiinne");
    setResumefile(data.target.files[0]);
  };

  const saveUserResume = async () => {
    await postResume();
  };

  const postResume = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("file", resumefile, "resume");
    const url =
      "https://oep-backend-node.herokuapp.com/user-certifications/update/resume";
    const options = {
      method: "POST",
      headers: {
        Authorization: `bearer ${jwt}`,
      },
      body: form,
    };
    const res = await fetch(url, options);
    if (res.status === 200) {
      setResumefile("");
      setAlertOpen(true);
      setLoading(false);
      getResume();
    } else {
      setLoading(false);
    }
  };

  const getResume = async () => {
    const url =
      "https://oep-backend-node.herokuapp.com/user-certifications/resume";
    // const url = "http://192.168.2.130:9010/user-certifications/resume";
    const options = {
      method: "GET",
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    };
    const res = await fetch(url, options);
    if (res.status === 200) {
      const data = await res.json();
      setResumeLink(data.userResume);
      // setResumefile(data.userResume);
      setResumeMsz("Resume Uploaded Successfully");
      setTimeout(() => {
        setAlertOpen(false);
      }, 5000);
    }
  };

  const handleRemoveResume = async () => {
    const url =
      "https://oep-backend-node.herokuapp.com/user-certifications/delete/resume";
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const res = await fetch(url, options);
    if (res.status === 200) {
      const data = await res.json();
      setResumeMsz("Resume Removed");
      setTimeout(() => {
        setAlertOpen(false);
      }, 5000);
      getResume();
    }
  };

  return (
    <div>
      <div className="childcertificate">
        <div>
          <div
            style={{
              display: "inline",
              marginRight: "2rem",
            }}
          >
            <h3
              style={{
                fontFamily: "revert",
              }}
            >
              Resume
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "800px",
              position: "relative",
            }}
          >
            {alertOpen === true ? (
              <Alert severity="success" variant="filled">
                {resumeMsz}
              </Alert>
            ) : null}
          </div>
          {resumeLink === null ? (
            <label>No Resume Uploaded</label>
          ) : (
            <a
              href={resumeLink}
              target="_blank"
              style={{ textDecoration: "none" }}
              rel="noreferrer"
            >
              <label style={{ color: "#317ac7" }}>View Resume</label>
            </a>
          )}
          <Button
            variant="contained"
            style={{
              display: "inline",
              marginLeft: "5rem",
              borderRadius: "2rem",
            }}
            onClick={handleRemoveResume}
          >
            Remove Resume
          </Button>
          {resumefile !== "" ? <p>Resume Selected</p> : null}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              marginTop: "20px",
              textAlign: "left",
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
                Select Resume
              </Fab>
              <br />
              <br />
            </label>
            {loading === false ? (
              <Button
                variant="contained"
                onClick={saveUserResume}
                style={{
                  borderRadius: "10px",
                  width: "7rem",
                  marginLeft: "5rem",
                  //   marginBottom: "4rem",
                }}
              >
                Add
              </Button>
            ) : (
              <ClipLoader
                loading={loading}
                color="#317ac7"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loader-resume"
              />
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
