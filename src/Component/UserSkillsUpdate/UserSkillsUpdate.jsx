
import React, { useState, useEffect } from "react";
import { TextField, Button, Card, Alert } from "@mui/material";
import Cookies from "js-cookie";
const form = new FormData();

export const UserSkillsUpdate = () => {
  const [primarySkills, setPrimarySkills] = useState([]);
  const [secondarySkills, setSecondarySkills] = useState([]);
  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [resumeMsz, setResumeMsz] = useState("");
  const [skillInputError, setSkillInputError] = useState({
    primarySkill: false,
    secondarySkill: false,
    additionalSkill: false,
  });
  const jwt = Cookies.get("jwt");


  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const url =
      "https://oep-backend-node.herokuapp.com/user-certifications/skills";
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
    }
  };

  const postSkills = async () => {
    const url = "https://oep-backend-node.herokuapp.com/user-certifications/update/skills";
    let obj = JSON.stringify({
      userSkills: {
        primarySkills:
          primarySkills.length === 0 ? null : primarySkills.toString(),
        secondarySkills:
          secondarySkills.length === 0 ? null : secondarySkills.toString(),
        additionalSkills:
          additionalSkills.length === 0 ? null : additionalSkills.toString(),
      },
    })
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: obj,
    };
    const response = await fetch(url, options);
    if (response.status == 200) {
      getDetails();
      setAlertOpen(true);
      setResumeMsz("Skills Uploaded Successfully");
      setTimeout(() => {
        setAlertOpen(false);
      }, 5000);
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
          setPrimarySkills(primarySkill.concat(",", primarySkills).split(","));
          document.getElementById("primarySkills").value = "";
        }
        break;
      case "secondarySkills":
        const secondaryskill = document.getElementById("secondarySkills").value;
        if (secondaryskill === "") {
          setSkillInputError({ ...skillInputError, secondarySkill: true });
        } else {
          setSkillInputError({ ...skillInputError, secondarySkill: false });
          setSecondarySkills(secondaryskill.concat(",", secondarySkills).split(","));
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
          setAdditionalSkills(additionalskill.concat(",", additionalSkills).split(","));
          document.getElementById("additionalSkills").value = "";
        }
        break;

      default:
        break;
    }
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
      default:
        break;
    }
  };

  return (
    <div className="user-skills">
      <div className="containerskills">
        <div className="childskills">
          <h3 style={{ fontFamily: "revert" }}>Primary Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {primarySkills.length === 0 ? (
              <p>Add skills</p>
            ) : (
              primarySkills.map((item, index) => (
                item !== '' && <Card
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
          <div style={{display:"flex",flexDirection:'row'}}>
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
          </div>
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
                item !== '' && <Card
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
          <div style={{display:"flex",flexDirection:'row'}}>
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
          </div>  
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
                item !== '' && <Card
                  className="skillcards"
                  key={index}
                  onClick={() => handleDelete("additionalSkills", index)}
                >
                  {item}
                </Card>
              ))
            )}
          </div>
          <div style={{display:"flex",flexDirection:'row'}}>
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
          </div>
          {skillInputError.additionalSkill && (
            <p style={{ color: "red" }}>* Required</p>
          )}
        </div>
      </div>
      <div className="user-skills-savebutton">
        <Button
          variant="contained"
          onClick={postSkills}
          // onClick={postCertificate}
          style={{
            borderRadius: "10px",
            width: "7rem",
          }}
        >
          Save
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {alertOpen === true ? (
          <Alert severity="success" variant="filled">
            {resumeMsz}
          </Alert>
        ) : null}
      </div>
    </div>
  )
}