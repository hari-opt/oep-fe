import React, { useState, useEffect } from "react";
import { TextField, Button,Checkbox} from "@mui/material";
import Cookies from "js-cookie";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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


export const UserCertificateUpload = () => {
  const [certificatedata, setCertificatedata] = useState([]);
  const [certificateInputError, setCertificateInputError] = useState(false);
  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [noExpiry, setNoExpiry] = React.useState(false);
  const [openModal, setopenModal] = useState(false);
  const [certId, setCertId] = useState('')
  const [certvalidTo, setCertValidTo] = useState('')

  const handleChange = (event) => {
    setNoExpiry(event.target.checked);
  };
  const jwt = Cookies.get("jwt");
  const form = new FormData();
  
useEffect(() => {
    getCertificate();
  }, []);

  const getCertificate = async () => {
    const url ="https://oep-backend-node.herokuapp.com/user-certifications/certificates";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const res = await fetch(url, options);
    if(res.status == 200){
      const data = await res.json();
      console.log(data,"check response");
      const updateData = data.userCertifications.map(each=>{
        setCertId(each.id)
        return {
            userId:each.userid,
            certification:each.certification,
            certificationBy:each.certificationby,
            validFrom:each.validfrom,
            validTo:each.validto,
            skills:each.skills,
            certificate:each.certificate,
            certificateId:each.id
        }
        
      })
      setCertificatedata(updateData);
    }
  };
 const handleCertificate = async (event) => {
    event.preventDefault();
    
    const certification = document.getElementById("certification").value;
    const certificationBy = document.getElementById("certificationBy").value;
    const validFrom = document.getElementById("validFrom").value;
    const validTo = document.getElementById("validTo") === null ? "" :  document.getElementById("validTo").value
    const skills = document.getElementById("skills").value;
    console.log(certification,certificationBy,validFrom,validTo,skills,certificatedata,"check data while posting");
    if (
      certification === "" ||
      certificationBy === "" ||
      validFrom === "" ||
      skills === ""
    ) {
      console.log('if');
      setCertificateInputError(true);
    } else {
      console.log('else');
      setCertificateInputError(false);
      const url ="https://oep-backend-node.herokuapp.com/user-certifications/update/certificates";
    //   const url ="http://192.168.2.130:9010/user-certifications/update/certificates";
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userCertifications: [
          { certification, certificationBy, validFrom, validTo,noExpiry, skills, }]
        }),
      };
      const resp = await fetch(url, options);
      console.log(resp.status, "certificateconsole");
      if(resp.status == 200){
        getCertificate();
        setCertValidTo('')
        document.getElementById("certification").value= ''
        document.getElementById("certificationBy").value =''
        document.getElementById("validFrom").value=''
        document.getElementById("validTo").value=''
        document.getElementById("skills").value=''
      }
   
    }

  };

  const handleDelete = async () => {
     console.log(certId,"certIdcertId");
    const url = `https://oep-backend-node.herokuapp.com/user-certifications/delete/certificate/ ${certId}`
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const res = await fetch(url, options);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data, "deleteresponse");
      getCertificate();
      setopenModal(false)
    }
   
  };

  const handleClickOpen = () => {
    setopenModal(true);
  };

  const handleClose = () => {
    setopenModal(false);
  };

return(
<div>
<div className="childcertificate">
<Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Certificate"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Do you want to delete certificate ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>

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
    {noExpiry === false ? <><label
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
        onChange={(e) => setCertValidTo(e.target.value)}
      /> 
      </>: ""}
      {certvalidTo ===""?
      <>
      <label
        htmlFor=""
        style={{ fontSize: "0.8rem", paddingRight: "0.6rem",paddingLeft:"0.6rem" }}
      >
        No Expiry
      </label>

      <Checkbox
  checked={noExpiry}
  onChange={handleChange}
  inputProps={{ 'aria-label': 'controlled' }}
/>
</>
: ""}
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
          {certificatedata.flat(1).map((item, index) => (
           
            <StyledTableRow key={item.certificateId}>
              <StyledTableCell component="th" scope="row">
              {item.certification}
              </StyledTableCell>
              <StyledTableCell align="right">
                {item.certificationBy}
              </StyledTableCell>
              <StyledTableCell align="right">
                {item.validFrom}
              </StyledTableCell>
              {item.validTo!==""?
              <StyledTableCell align="right">
                {item.validTo}
              </StyledTableCell>:
              <StyledTableCell align="right">
                No Expiry
              </StyledTableCell>}
              <StyledTableCell align="right">
                {item.skills}
              </StyledTableCell>
              <StyledTableCell align="right">
                <DeleteIcon
                  onClick={() => setopenModal(true)}
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
)}