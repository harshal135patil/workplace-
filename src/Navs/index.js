import React, { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "../Components/Auth";
import Onboarding from "../Components/Candidate/Onboarding";
import Profile from "../Components/Candidate/Profile";
import Jobs from "../Components/Candidate/Jobs";
import Applications from "../Components/Candidate/Applications";
import Conversation from "../Components/Candidate/Conversation";

import EmployerOnboarding from "../Components/Employer/Onboarding";
import EmployerProfile from "../Components/Employer/Profile";
import EmployerJob from "../Components/Employer/Job";
import EmployerApplicants from "../Components/Employer/Applicants";
import EmployerConversation from "../Components/Employer/Conversation";
import Landingpage from "../Components/Landingpage/index";
import { userContext } from "../context/userContext";
import CandidateNavbar from "../Hoc/CandidateNavbar";
import EmployerNavbar from "../Hoc/EmployerNavbar.js";
function Navs() {
  const [state, dispatch] = useContext(userContext);
  const CandidateProtected = () => {
    const isAuth = state.isAuth;
    if (isAuth) {
      return <Outlet />;
    } else {
      return <Navigate to="/candidate/auth" />;
    }
  };

  const EmployerProtected = () => {
    const isAuth = state.isAuth;

    if (isAuth) {
      return <Outlet />;
    } else {
      return <Navigate to="/employer/auth" />;
    }
  };
  const Navbar = ({ type }) => {
    if (type === "candidate") {
      return (
        <div>
          <CandidateNavbar />
          <Outlet />
        </div>
      );
    } else if (type === "employer") {
      return (
        <div>
          <EmployerNavbar />
          <Outlet />
        </div>
      );
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/candidate/auth" element={<Auth type={"candidate"} />} />

        <Route element={<CandidateProtected />}>
          <Route path="/candidate/onboarding" element={<Onboarding />} />
          <Route element={<Navbar type={"candidate"} />}>
            <Route path="/candidate/profile" element={<Profile />} />
            <Route path="/candidate/jobs" element={<Jobs />} />
            <Route path="/candidate/applications" element={<Applications />} />
            <Route path="/candidate/Conversation" element={<Conversation />} />
          </Route>
        </Route>

        <Route path="/employer/auth" element={<Auth type={"employer"} />} />
        <Route element={<EmployerProtected />}>
          <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
          <Route element={<Navbar type={"employer"} />}>
            <Route path="/employer/profile" element={<EmployerProfile />} />
            <Route path="/employer/job" element={<EmployerJob />} />
            <Route
              path="/employer/applicants"
              element={<EmployerApplicants />}
            />
            <Route
              path="/employer/Conversation"
              element={<EmployerConversation />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navs;
