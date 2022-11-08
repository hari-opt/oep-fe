import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Card, CardContent } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Cookies from "js-cookie";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Fab } from "@mui/material";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { json, useNavigate } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { moment } from "moment";
import { Header } from "../Header/Header";
const form = new FormData();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "gray",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const UpdateSkills = () => {
  const [primarySkills, setPrimarySkills] = useState([]);
  const [secondarySkills, setSecondarySkills] = useState([]);
  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [certificatedata, setCertificatedata] = useState([]);
  const [certificateInputError, setCertificateInputError] = useState(false);
  const [skillInputError, setSkillInputError] = useState({
    primarySkill: false,
    secondarySkill: false,
    additionalSkill: false,
  });
  const [resumeLink, setResumeLink] = useState("");
  const [resumefile, setResumefile] = useState("");
  const [resume, setResume] = useState("");
  const jwt = Cookies.get("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    getDetails();
  }, []);

  const fileProperties = (data) => {
    setResumefile(data.target.files[0]);
  };

  const getDetails = async () => {
    // const url = "http://localhost:9010/user-certifications";
    const url = "https://oep-backend-node.herokuapp.com/user-certifications";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const res = await fetch(url, options);

    if (res.ok === true) {
      const data = await res.json();
      const { userCertifications } = data;
      const updatedCertifications = userCertifications.map((ele) => {
        return {
          validFrom: ele.validfrom,
          validTo: ele.validto,
          certification: ele.certification,
          certificationBy: ele.certificationby,
          skills: ele.skills,
        };
      });

      const filteredData = updatedCertifications.filter((each) => {
        return !Object.values(each).includes(null);
      });

      setCertificatedata(filteredData);

      setPrimarySkills(
        data.userSkills.primaryskills == null
          ? []
          : data.userSkills.primaryskills.split(",")
      );
      setSecondarySkills(
        data.userSkills.secondaryskills == null
          ? []
          : data.userSkills.secondaryskills.split(",")
      );
      setAdditionalSkills(
        data.userSkills.additionalskills == null
          ? []
          : data.userSkills.additionalskills.split(",")
      );
      setResumeLink(data.userResume == null ? "" : data.userResume);
    }
  };

  const postDetails = async () => {
    console.log("im woprking");
    // const url = "http://localhost:9010/user-certifications/update";
    const url =
      "https://oep-backend-node.herokuapp.com/user-certifications/update";
    const postData = {
      userCertifications:
        certificatedata.length === 0
          ? [
              {
                certificationBy: null,
                certification: null,
                validFrom: null,
                validTo: null,
                skills: null,
              },
            ]
          : [...certificatedata],
      userSkills: {
        primarySkills:
          primarySkills.length === 0 ? null : primarySkills.toString(),
        secondarySkills:
          secondarySkills.length === 0 ? null : secondarySkills.toString(),
        additionalSkills:
          additionalSkills.length === 0 ? null : additionalSkills.toString(),
      },
    };

    form.append("file", resumefile, "Resume");
    form.append(
      "data",
      JSON.stringify({
        userCertifications: [...certificatedata],
        userSkills: {
          primarySkills:
            primarySkills.length === 0 ? null : primarySkills.toString(),
          secondarySkills:
            secondarySkills.length === 0 ? null : secondarySkills.toString(),
          additionalSkills:
            additionalSkills.length === 0 ? null : additionalSkills.toString(),
        },
      })
    );

    console.log("forrmmm", form.get("file"));
    console.log("forrmmm", form.get("data"));
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: form,
    };

    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      console.log("data", data);
      alert(`${data.msg}`);
    } else {
      alert("data not saved");
    }
  };

  const handleclickbut = (name) => {
    switch (name) {
      case "primarySkills":
        const primarySkill = document.getElementById("primarySkills").value;
        if (primarySkill === "") {
          setSkillInputError({ ...skillInputError, primarySkill: true });
        } else {
          setSkillInputError({ ...skillInputError, primarySkill: false });
          setPrimarySkills([...primarySkills, primarySkill]);
          document.getElementById("primarySkills").value = "";
        }
        break;
      case "secondarySkills":
        const secondaryskill = document.getElementById("secondarySkills").value;
        if (secondaryskill === "") {
          console.log({ secondaryskill });
          setSkillInputError({ ...skillInputError, secondarySkill: true });
        } else {
          setSkillInputError({ ...skillInputError, secondarySkill: false });
          setSecondarySkills([...secondarySkills, secondaryskill]);
          document.getElementById("secondarySkills").value = "";
        }
        break;
      case "additionalSkills":
        const additionalskill =
          document.getElementById("additionalSkills").value;
        if (additionalskill === "") {
          setSkillInputError({ ...skillInputError, additionalSkill: true });
        } else {
          setSkillInputError({ ...skillInputError, additionalSkill: false });
          setAdditionalSkills([...additionalSkills, additionalskill]);
          document.getElementById("additionalSkills").value = "";
        }
        break;

      default:
        break;
    }
  };

  const handleCertificate = (event) => {
    event.preventDefault();
    const certification = document.getElementById("certification").value;
    const certificationBy = document.getElementById("certificationBy").value;
    const validFrom = document.getElementById("validFrom").value;
    const validTo = document.getElementById("validTo").value;
    const skills = document.getElementById("skills").value;
    if (
      certification === "" ||
      certificationBy === "" ||
      validFrom === "" ||
      validTo === "" ||
      skills === ""
    ) {
      setCertificateInputError(true);
    } else {
      setCertificateInputError(false);
      setCertificatedata([
        ...certificatedata,
        { certification, certificationBy, validFrom, validTo, skills },
      ]);
    }
  };

  const saveUserSkillsCertitficates = async () => {
    await postDetails();
    await getDetails();
  };

  const handleDelete = (skill, index) => {
    switch (skill) {
      case "primarySkills":
        primarySkills.splice(index, 1);
        setPrimarySkills([...primarySkills]);
        break;
      case "secondarySkills":
        secondarySkills.splice(index, 1);
        setSecondarySkills([...secondarySkills]);
        break;
      case "additionalSkills":
        additionalSkills.splice(index, 1);
        setAdditionalSkills([...additionalSkills]);
        break;
      case "certificatedata":
        certificatedata.splice(index, 1);
        setAdditionalSkills([...certificatedata]);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Header />
      <div className="containerskills">
        <div className="childskills">
          <h3 style={{ fontFamily: "revert" }}>Primary Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {primarySkills.length === 0 ? (
              <p>Add skills</p>
            ) : (
              primarySkills.map((item, index) => (
                <Card
                  className="skillcards"
                  key={index}
                  onClick={() => {
                    handleDelete("primarySkills", index);
                  }}
                >
                  {item}
                </Card>
              ))
            )}
          </div>
          <TextField
            id="primarySkills"
            label="Skill name"
            variant="standard"
            multiline
            maxRows={2}
            focused
            style={{
              width: "16rem",
              paddingRight: "2rem",
            }}
          />
          <Button
            variant="contained"
            onClick={() => handleclickbut("primarySkills")}
          >
            Add
          </Button>
          {skillInputError.primarySkill && (
            <p style={{ color: "red" }}>* Required</p>
          )}
        </div>
        <div className="childskills">
          <h3 style={{ fontFamily: "revert" }}>Secondary Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {secondarySkills.length === 0 ? (
              <p>Add skills</p>
            ) : (
              secondarySkills.map((item, index) => (
                <Card
                  className="skillcards"
                  color="primary"
                  key={index}
                  onClick={() => {
                    handleDelete("secondarySkills", index);
                  }}
                >
                  {item}
                </Card>
              ))
            )}
          </div>
          <TextField
            label="Skill name"
            variant="standard"
            id="secondarySkills"
            multiline
            maxRows={2}
            focused
            style={{ width: "16rem", paddingRight: "2rem" }}
          />
          <Button
            variant="contained"
            onClick={() => handleclickbut("secondarySkills")}
          >
            Add
          </Button>
          {skillInputError.secondarySkill && (
            <p style={{ color: "red" }}>* Required</p>
          )}
        </div>
        <div className="childskills">
          <h3 style={{ fontFamily: "revert" }}>Additional Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {additionalSkills.length === 0 ? (
              <p>Add skills</p>
            ) : (
              additionalSkills.map((item, index) => (
                <Card
                  className="skillcards"
                  key={index}
                  onClick={() => handleDelete("additionalSkills", index)}
                >
                  {item}
                </Card>
              ))
            )}
          </div>
          <TextField
            label="Skill name"
            variant="standard"
            id="additionalSkills"
            multiline
            maxRows={2}
            focused
            style={{ width: "16rem", paddingRight: "2rem" }}
          />
          <Button
            variant="contained"
            onClick={() => handleclickbut("additionalSkills")}
          >
            Add
          </Button>
          {skillInputError.additionalSkill && (
            <p style={{ color: "red" }}>* Required</p>
          )}
        </div>
      </div>
      <div className="childcertificate">
        <div style={{ display: "inline", marginRight: "2rem" }}>
          <h3 style={{ fontFamily: "revert" }}>Resume</h3>
          {resumeLink === "" ? (
            <p>No Resume Uploaded</p>
          ) : (
            <a
              href={resumeLink}
              target="_blank"
              style={{ textDecoration: "none" }}
              rel="noreferrer"
            >
              View
            </a>
          )}
        </div>
        <Button variant="contained" style={{ display: "inline" }}>
          Remove
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
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
              Upload Resume
            </Fab>
            <br />
            <br />
          </label>
        </div>
      </div>
      <div>
        <div className="childcertificate">
          <form onSubmit={handleCertificate}>
            <h3 style={{ fontFamily: "revert" }}>Certificates</h3>
            <TextField
              id="certification"
              label="Certificate Name"
              variant="standard"
              multiline
              maxRows={2}
              focused
              style={{ width: "15rem", paddingRight: "2rem" }}
            />
            <TextField
              id="certificationBy"
              label="Certification by"
              variant="standard"
              multiline
              maxRows={2}
              focused
              style={{ width: "15rem", paddingRight: "2rem" }}
            />
            <div
              style={{
                display: "inline",
              }}
            >
              <label
                htmlFor=""
                style={{
                  fontSize: "0.8rem",
                  paddingRight: "0.6rem",
                  color: "#0070ad",
                }}
              >
                Valid from
              </label>
              <input
                id="validFrom"
                type="date"
                style={{
                  height: "2rem",
                  fontSize: "1rem",
                  border: "2px solid #0070ad",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div
              style={{
                display: "inline",
                marginLeft: "2rem",
                marginRight: "2rem",
                color: "#0070ad",
              }}
            >
              <label
                htmlFor=""
                style={{ fontSize: "0.8rem", paddingRight: "0.6rem" }}
              >
                Valid To
              </label>
              <input
                id="validTo"
                type="date"
                style={{
                  height: "2rem",
                  fontSize: "1rem",
                  border: "2px solid #0070ad",
                  borderRadius: "8px",
                }}
              />
            </div>
            <TextField
              id="skills"
              label="Skills"
              variant="standard"
              multiline
              maxRows={2}
              focused
              style={{ width: "10rem", paddingRight: "2rem" }}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ marginBottom: "0.5rem" }}
            >
              Add
            </Button>
            <br />
            {certificateInputError && (
              <p style={{ color: "red" }}>* All Fields are required</p>
            )}
          </form>
          {certificatedata.length === 0 ? (
            <p style={{ textAlign: "center" }}>Add certificates</p>
          ) : (
            <TableContainer component={Paper} style={{ marginTop: "15px" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Certificate Name</StyledTableCell>
                    <StyledTableCell align="right">
                      Certification By
                    </StyledTableCell>
                    <StyledTableCell align="right">Valid From</StyledTableCell>
                    <StyledTableCell align="right">Valid To</StyledTableCell>
                    <StyledTableCell align="right">Skills</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {certificatedata.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {item.certification}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.certificationBy}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.validFrom}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.validTo}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.skills}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <DeleteIcon
                          onClick={() => handleDelete("certificatedata", index)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          onClick={saveUserSkillsCertitficates}
          style={{
            borderRadius: "10px",
            width: "7rem",
            marginRight: "2rem",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
