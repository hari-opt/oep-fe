import "./App.css";
import "./common.css";
import { Router, Routes, Route } from "react-router-dom";

import { Login } from "./Component/Login/Login";
import { Home } from "./Component/Home/Home";
import { UpdateSkills } from "./Component/UpdateSkills/UpdateSkills";
import { ReferalPage } from "./Component/Referral/ReferalPage";
import { JobDescriptionPage } from "./Component/JobDescription/JobDesciptionPage";
import { RegisterPage } from "./Component/Register/RegisterPage";
import { MyRefferal } from "./Component/MyReferral/MyRefferal";
import { ProtectedRoutes } from "./Component/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/passwordreset" element={<PasswordResetPage />} /> */}

        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/UpdateSkills"
          element={
            <ProtectedRoutes>
              <UpdateSkills />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/Referrals"
          element={
            <ProtectedRoutes>
              <ReferalPage />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/JobGD"
          element={
            <ProtectedRoutes>
              <JobDescriptionPage />
            </ProtectedRoutes>
          }
        />

        <Route path="/RegisterPage" element={<RegisterPage />} />

        <Route
          path="/MyRefferalPage"
          element={
            <ProtectedRoutes>
              <MyRefferal />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
