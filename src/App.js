import "./App.css";
import "./common.css";
import { PasswordResetPage } from "./Component/Login/PasswordResetPage";
import { Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Component/Login/LandingPage";
import {useState} from "react"
import { ReferalPage } from "./Component/Login/ReferalPage";
import { JobDescriptionPage } from "./Component/Login/JobDesciptionPage";
import {UpdateSkills} from "./Component/Login/UpdateSkills"
import { LoginPageOEP } from "./Component/Login/LoginPageOEP";
import { RegisterPage } from "./Component/Login/RegisterPage";
import {ProtectedRoutes} from "./Component/Protectedroutes";
import { MyRefferal } from "./Component/Login/MyRefferal";


function App() {
  // const [imgfile, setImgfile] = useState(null);
  // const [primarytdata, setPrimarydata] = useState([]);
  // const[secondarydata,setSecondarydata]=useState([]);
  // const [cetificate,setCertificate]=useState([])
  

  // const imagedata = (e) => {
  //   setImgfile(e.target.files[0]);
  // };
  // const setSkilldata = (updatedata1) => {
  //   setPrimarydata([...primarytdata, updatedata1]);
  // };
  // const setSkilldata2 = (updatedata2) => {
  //   setSecondarydata([...secondarydata, updatedata2]);
  // };
  // const cetificatesdata = (certificatefile) =>{
  //   setCertificate([...cetificate,certificatefile])
  // }
  // console.log("cartificatews==>",cetificate)

  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPageOEP />} />
          <Route path="/passwordreset" element={<PasswordResetPage />} />

          <Route path="/" element={
          <ProtectedRoutes>
                <LandingPage/>
          </ProtectedRoutes>} />

          <Route path="/UpdateSkills" element={
          <ProtectedRoutes>
                <UpdateSkills/>
          </ProtectedRoutes>} />

        <Route path="/Referrals" element={
          <ProtectedRoutes>
            <ReferalPage/>
          </ProtectedRoutes>} />

        <Route path="/JobGD" element={
          <ProtectedRoutes>
            <JobDescriptionPage/>
          </ProtectedRoutes>} />

        <Route path="/RegisterPage" element={
            <RegisterPage/>}/>

        <Route path="/MyRefferalPage" element={
          <ProtectedRoutes>
            <MyRefferal/>
          </ProtectedRoutes>} /> 

        </Routes>
    </div>
  );
}

export default App;
