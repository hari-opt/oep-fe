import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Tabs, Tab, TableHead, Box } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import { Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Header } from "../Header/Header";
import Carousel from "../Carousel/Carousel";
import NewsAndNotifications from "../NewsAndNotifications/NewsAndNotifications";
import Footer from "../Footer/Footer";
import "./Home.css";

export const Home = ({ primarytdata, imgfile, secondarydata, cetificate }) => {
  const [value, setValue] = useState("one");
  const [skilldata, setSkilldata] = useState([]);
  const jwt = Cookies.get("jwt");
  let navigate = useNavigate();
  useEffect(() => {
    handleSubmit();
  }, []);

  const handlelinks = (item) => {
    if (item == "HRMS") {
      window.open("https://optimum.peoplestrong.com/altLogin.jsf");
    } else if (item == "Update Skills") {
      navigate("../UpdateSkills");
    } else if (item === "Referrals") {
      navigate("../Referrals");
    } else if (item === "Training") {
      navigate("/Training");
    }
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.gray,
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

  const handleSubmit = () => {
    console.log("in on submit");
    // event.preventDefault();
    const getData = async () => {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const res = await fetch(
        "https://oep-backend-node.herokuapp.com/user-skills",
        options
      );
      const data = await res.json();
      setSkilldata([...skilldata, data]);
    };
    const response = getData();
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="header2">
          <h4 className="child2">All News</h4>
          <h4 className="child2">India</h4>
          <h4 className="child2">Sales</h4>
          <h4 className="child2">Openings</h4>
          <h4 className="child2">Useful Links</h4>
        </div>
        <div className="imagecontent">
          <Carousel />
          <div>
            <h1 className="news-noti-header">News and Notifications</h1>
            <NewsAndNotifications className="news-noti-container" />
          </div>
        </div>
        <div className="links">
          <ul className="ul">
            {links.map((item) => (
              <li className="li" onClick={() => handlelinks(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

const links = ["HRMS", "Update Skills", "Referrals", "Training"];
