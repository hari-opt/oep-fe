import React, { useState } from "react";
import { Header } from "../Header/Header";
import { useEffect } from "react";
import { TextField, Button,Alert} from "@mui/material";
import Cookies from "js-cookie";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Label } from "@mui/icons-material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PulseLoader from "react-spinners/PulseLoader";
import "./Training.css"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Training = () => {
  const[coursedata,setCourseData]=useState([])
  const[enrolledData,setenrolledData]=useState([])
  const[courseDetails,setCourseDetails]=useState([])
  const[courseID, setcourseID] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [enrollAlert, setEnrollAlert] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [enrollState, setenrollState] = useState(false);
  const[alertValue,setAlertValue]=useState('')
  const [loading, setLoading] = useState(false);
  const openFilter = Boolean(anchorEl);

  const jwt = Cookies.get("jwt")
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    getData();
  },[])

const getData = () => {
  setLoading(true)
  fetch("https://oep-backend-node.herokuapp.com/courses",{
    method:"GET",
    headers:{
      Authorization: `Bearer ${jwt}`
    }
  }).then((response)=>response.json()).then((json)=>
{ 
  setCourseData(json.courses);
  setLoading(false)
  setenrolledData(json.enrolledCourses)}
  )
}

const courseEnroll = async() =>{
  setLoading(true) 
  setEnrollAlert('')
  const url = `https://oep-backend-node.herokuapp.com/courses/enroll/${courseID}`
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const res = await fetch(url, options);
  if(res.status == 200){
    getData();
    setLoading(false)
    setAlertValue("success")
    setAlertOpen(true);
    setEnrollAlert("successfully Enrolled");
    setTimeout(() => {
      setAlertOpen(false);
      setOpen(false);
    }, 5000);
  }else{
    setAlertValue("error")
    setAlertOpen(true);
    setEnrollAlert("Something went wrong!");
    setTimeout(() => {
      setAlertOpen(false);
      setOpen(false);
    }, 5000);
  }
}

const courseDisEnroll = async() =>{ 
  setEnrollAlert('')
  const url = `https://oep-backend-node.herokuapp.com/courses/disenroll/${courseID}`
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const res = await fetch(url, options);
  if(res.status == 200){
    getData();
    setAlertValue("error")
    setAlertOpen(true)
    setEnrollAlert("Course Disenrolled Successfully");
    setTimeout(() => {
      setAlertOpen(false);
      setOpen(false);
    }, 5000);
  }
  else{
    setAlertValue("error")
    setAlertOpen(true);
    setEnrollAlert("Something went wrong!");
    setTimeout(() => {
      setAlertOpen(false);
      setOpen(false);
    }, 5000);
  }
}

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

const handleClick = (item)=>{
  setcourseID(item.courseid)
  setCourseDetails([item])
  setOpen(true);
}

const handleCloseFilter = () => {
  setAnchorEl(null);
};

const handleSelectEnroll = (data) =>{
if(data == "EnrolledCourses"){
  if(enrolledData !== null){
    setenrollState(false)
  setCourseData(enrolledData.map((items)=>{
    return coursedata.find(data => data.courseid === items.courseid)
  }))
}
else{
  setenrollState(true)
}
  setAnchorEl(null);
}
else if(data == "Allcourses"){
  setenrollState(false)
  getData();
  setAnchorEl(null);
}
}

const handleClickFilter = (event) => {
  setAnchorEl(event.currentTarget);
};


return (
    <>
  <Header />
 <div>
      <div className="filtericon-style">
        <label>Filter By:</label>
        <FilterAltIcon onClick={handleClickFilter} />
      </div>
 {loading ? (
          <PulseLoader
            loading={loading}
            color="#317ac7"
            aria-label="Loading Spinner"
            data-testid="loader"
            className="loaderrefferal"
          />
        ) : 
 enrollState === false ?
 <TableContainer component={Paper} style={{ marginTop: "15px" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Course Id</StyledTableCell>
            <StyledTableCell align="center">
              Course
            </StyledTableCell>
            <StyledTableCell align="center">From</StyledTableCell>
            <StyledTableCell align="center">To</StyledTableCell>
            <StyledTableCell align="center">Mode</StyledTableCell>
            <StyledTableCell align="center">Platform</StyledTableCell>
            <StyledTableCell align="center">
            
            </StyledTableCell>
           
          </TableRow>
        </TableHead>
      
        <TableBody>
         {coursedata.map((item) => (
            <StyledTableRow key={item.courseid} onClick={()=>handleClick(item)}>
              <StyledTableCell className="courses-list-style" align="center">
              {item.courseid}
              </StyledTableCell>
              <StyledTableCell className="courses-list-style" align="center">
                {item.course}
              </StyledTableCell>
              <StyledTableCell className="courses-list-style" align="center">
                {item.from}
              </StyledTableCell>
              <StyledTableCell className="courses-list-style" align="center">
                {item.to}
              </StyledTableCell>
              <StyledTableCell className="courses-list-style"  align="center">
                {item.mode}
              </StyledTableCell>
              <StyledTableCell className="courses-list-style" align="center">
              {item.platform}
              </StyledTableCell>
              <StyledTableCell className="courses-list-style" align="center">
                <div className="course-filter" >
          </div>
              </StyledTableCell>
            </StyledTableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>:
              <div id="noreferral">
                <h2>No Enrollments!</h2>
              </div>
          }
    {courseDetails.length!==0?
   
    <div>
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative', backgroundColor:"gray" }}>
      <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Course Details
            </Typography>
          </Toolbar>
      </AppBar>
      <List style={{margin:"2rem"}}>
        {courseDetails.map((item)=>
        <><><label>Course Details</label><p>{item.coursedetails}</p></>
        <><label>Course Certificate</label><p>{item.certification}</p></>
        <><label>Course Skills</label><p>{item.skills}</p></></>
        )}
      </List>

    {courseDetails[0].enroll == false ?
            <Button
            style={{
              borderRadius: "10rem",
              marginLeft: "10px",
              width: "10%",
              backgroundColor: "#0070ad",
              color: "white",
              border: "1px solid #0070ad",
            }}
            onClick={courseEnroll}
            variant="outlined"
          >
            Enroll
          </Button> :
   
    <Button
            style={{
              borderRadius: "10rem",
              marginLeft: "10px",
              width: "10%",
              backgroundColor: "red",
              color: "white",
              border: "1px solid #0070ad",
            }}
            onClick={courseDisEnroll}
            variant="outlined"
          >
            Disenroll
          </Button> }
    
  
            <div className="success-alert">
            {alertOpen === true ? (
              <Alert severity={alertValue} variant="filled">
                {enrollAlert}
              </Alert>
            ) : null}
            </div>
    </Dialog>

  </div>:null}
  <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openFilter}
            onClose={handleCloseFilter}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() =>handleSelectEnroll("EnrolledCourses")}>Enrolled Courses</MenuItem>
            <MenuItem onClick={() =>handleSelectEnroll("Allcourses")}>All Courses</MenuItem>
          </Menu>

 </div>
 </>
  );
};
