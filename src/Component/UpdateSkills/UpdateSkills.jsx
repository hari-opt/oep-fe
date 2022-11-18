import React from "react";
import { Header } from "../Header/Header";
import { UserSkillsUpdate } from "../UserSkillsUpdate/UserSkillsUpdate";
import { UserResumeUpload } from "../UserResumeUpload/UserResumeUpload";
import { UserCertificateUpload } from "../UserCertificateUpload/UserCertificateUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const UpdateSkills = () => {
  let navigate = useNavigate();
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
      <UserSkillsUpdate />
      <UserResumeUpload />
      <UserCertificateUpload />
    </div>
  );
};
