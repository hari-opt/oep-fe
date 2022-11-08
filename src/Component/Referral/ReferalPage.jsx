import React, { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PulseLoader from "react-spinners/PulseLoader";
import { Alert, TextField } from "@mui/material";
import {
  TableContainer,
  TableCell,
  Table,
  TableBody,
  TableRow,
} from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { width } from "@mui/system";
import { Header } from "../Header/Header";

export const ReferalPage = () => {
  const [jobdata, setJobdata] = useState([]);
  const [jobdata1, setJobdata1] = useState([]);
  const [reset, setReset] = useState(false);
  const [searchInput, setSearchInput] = useState({
    byJobName: "",
    byLocation: "",
    byDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [resetField, setResetField] = useState("");

  console.log("jobdata==>", jobdata);
  const jwt = Cookies.get("jwt");
  let navigate = useNavigate();

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "25rem",
      height: "1rem",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  const BootstrapInputtwo = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "15rem",
      height: "1rem",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    console.log("in on submit");
    setLoading(true);
    const getData = async () => {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const res = await fetch(
        "https://oep-backend-node.herokuapp.com/current-openings",
        options
      );
      const data = await res.json();
      //   const arr = data.split(",");
      setLoading(false);
      setJobdata(data.jobSearchResult);
      setJobdata1(data.jobSearchResult);
    };
    const response = getData();
  };

  const handlechange = (e) => {
    jobdata
      .flat(2)
      .filter((post) => {
        console.log(post, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkk ksnn");
        if (e.target.value === "") {
          return post;
        } else if (
          post.position.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return post;
        }
      })
      .map((post, index) => console.log(post, index, "ddddddddddddddddddd"));
  };

  //   useEffect(() => {
  //     const data = jobdata1.filter((item) => item.position.includes(searchdata));
  //     console.log("data===>", data);
  //     setJobdata(data);
  //   }, [searchdata]);

  //   const setItem = (item) => {
  //     setSearchdata(item);
  //     jobdata1.filter((item) => item.position.includes(searchdata));
  //   };

  const handleclick = (data) => {
    console.log(data);
    navigate("../JobGD", { state: { data } });
  };

  const handleReset = () => {
    setResetField("");
  };

  return (
    <div>
      <Header />
      <div className="referralheader2">
        <h4>Please click on a job to apply or to refer a friend</h4>
        <h4>How to track your referrals?</h4>
        <p>
          1. Select My account menu and click "view profile" <br />
          2. From "Options" Dropdown mwnu select "Referral Tracking" <br />
          3. View your referral tracker
        </p>
      </div>

      <div className="jobfilterdiv">
        <Grid container spacing={2} className="">
          <Grid item xs={0.5}></Grid>
          <div style={{ display: "flex" }}>
            <div className="input-container">
              <TextField
                label="Job Name"
                multiline
                maxRows={2}
                size="small"
                sx={{ width: "300px" }}
                onChange={(event) =>
                  setSearchInput({
                    ...searchInput,
                    byJobName: event.target.value,
                  })
                }
                autoComplete="current-password"
              />
            </div>
            <div className="input-container">
              <TextField
                label="Location"
                multiline
                maxRows={2}
                size="small"
                sx={{ width: "300px" }}
                onChange={(event) =>
                  setSearchInput({
                    ...searchInput,
                    byLocation: event.target.value,
                  })
                }
                autoComplete="current-password"
              />
            </div>
            <div className="input-container">
              <TextField
                label="Date posted"
                multiline
                maxRows={2}
                size="small"
                sx={{ width: "300px" }}
                onChange={(event) =>
                  setSearchInput({
                    ...searchInput,
                    byDate: event.target.value,
                  })
                }
                autoComplete="current-password"
              />
            </div>
          </div>
          <Grid item xs={1} className="">
            <Button
              variant="outlined"
              style={{
                position: "relative",
                borderRadius: "10rem",
                border: "1px solid #0070ad",
                color: "#0070ad",
              }}
            >
              Filter
            </Button>
          </Grid>
          <Grid item xs={1} className="">
            <Button
              variant="outlined"
              style={{
                position: "relative",
                borderRadius: "10rem",
                border: "1px solid #0070ad",
                color: "#0070ad",
              }}
              onClick={() => setReset(true) || handleReset()}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
      </div>
      <div>
        <TableContainer
          style={{
            width: "900px",
            marginLeft: "3rem",
          }}
        >
          <Table aria-label="simple table">
            <TableBody>
              {loading ? (
                <PulseLoader
                  loading={loading}
                  color="#317ac7"
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  className="loaderrefferal"
                />
              ) : (
                jobdata
                  .filter(
                    (each) =>
                      each.position
                        .toLowerCase()
                        .includes(searchInput.byJobName.toLowerCase()) &&
                      each.location
                        .toLowerCase()
                        .includes(searchInput.byLocation.toLowerCase()) &&
                      each.dateposted
                        .toLowerCase()
                        .includes(searchInput.byDate.toLowerCase())
                  )
                  .flat(2)
                  .map((post, index) => (
                    <TableRow onClick={() => handleclick(post)}>
                      <TableCell
                        style={{
                          textAlign: "left",
                          width: "310px",
                        }}
                      >
                        {post.position}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "left",
                          width: "310px",
                        }}
                      >
                        {post.location}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "left" }}
                        //   onClick={() => handlelinks(item)}
                      >
                        {post.dateposted}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
