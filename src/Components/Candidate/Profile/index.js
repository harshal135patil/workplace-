import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import {
  primaryRole,
  skills,
  expectedSalary,
  experience,
} from "../../../constants";
import SearchableDropDown from "../../common/SearchableDropDown";
import UploadFile from "../../common/UploadFile";
import { userContext } from "../../../context/userContext";
import { db } from "../../../firebaseconfig";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import toastMessage from "../../../utils/toastMessage";
import { useNavigate } from "react-router-dom";
import FormLoading from "../../common/Skeleton/FormLoading";
function Profile() {
  const [state, dispatch] = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [disabledField, setDisabledField] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: state.user.displayName,
    email: state.user.email,
    phone: "",
    primaryRole: "",
    linkedin: "",
    skills: [],
    experience: "",
    bio: "",
    resume: "",
    expectedSalary: "",
  });

  const fetchUserData = async () => {
    setLoading(true);
    // fetch data from firebase firestore from userInfo collection where userId = state.user.email
    const userId = state.user.email;
    const docRef = doc(db, "userInfo", userId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data(), "userinfo");
        setUserData(docSnap.data());
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const setSkills = (skill) => {

    if (userData.skills.includes(skill)) {
      setUserData({
        ...userData,
        skills: userData.skills.filter((item) => item !== skill),
      });
    } else {
      setUserData({ ...userData, skills: [...userData.skills, skill] });
    }
  };

  const submitData = async () => {

    console.log(userData);

    const userId = state.user.email;

    try {
      await setDoc(doc(db, "userInfo", userId), {
        ...userData,
        userId,
        userType: "candidate",
      });
      toastMessage("Data Saved Successfully", "success");
    
    } catch (err) {
      console.log(err);
      toastMessage("Something Went Wrong", "error");
    }
  };
  
  const saveData = () => {
    if (disabledField) {
      setDisabledField(false);
    } else {
      submitData();
      setDisabledField(true);
    }
      

  };
  const logout =()=>{
    dispatch({
      type: "LOGOUT",
      payload: {
        userType: "candidate"
      }
    })
  }      
  return loading ? (
    <div><FormLoading fields={8} /></div>
  ) : (
    <form onSubmit={submitData}>
      <div>
        <Button onClick={(logout)}>Logout</Button>
        <Button onClick={saveData}>{disabledField ? "Edit" : "Save"}</Button>
      </div>
      <Grid className="grid-container" container spacing={2}>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Name</label>
          <TextField
            disabled={disabledField}
            size="small"
            fullWidth
            required
            value={userData.name}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Email</label>
          <TextField
            disabled
            size="small"
            type={"email"}
            fullWidth
            required
            value={userData.email}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>phone</label>
          <TextField
            size="small"
            disabled={disabledField}
            fullWidth
            required
            value={userData.phone}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Primary Role</label>
          <Select
            disabled={disabledField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userData.primaryRole}
            size="small"
            fullWidth
            onChange={(e) =>
              setUserData({ ...userData, primaryRole: e.target.value })
            }
          >
            {primaryRole.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Experience</label>
          <Select
            disabled={disabledField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userData.experience}
            size="small"
            fullWidth
            onChange={(e) =>
              setUserData({ ...userData, experience: e.target.value })
            }
          >
            {experience.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Salary Expectations</label>
          <Select
            disabled={disabledField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userData.expectedSalary}
            size="small"
            fullWidth
            onChange={(e) =>
              setUserData({ ...userData, expectedSalary: e.target.value })
            }
          >
            {expectedSalary.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>linkedin </label>
          <TextField
            disabled={disabledField}
            size="small"
            type="url"
            fullWidth
            value={userData.linkedin}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) =>
              setUserData({ ...userData, linkedin: e.target.value })
            }
          />
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <label>Skills </label>
          <SearchableDropDown
            disabled={disabledField}
            options={skills}
            onChange={(newValue) => setSkills(newValue)}
          />
          <div className="skills-container">
            {userData.skills.map((item) => {
              return (
                <div
                  onClick={() => {
                    !disabledField && setSkills(item);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <label>Bio</label>
          <TextField
            disabled={disabledField}
            size="small"
            multiline
            minRows={4}
            fullWidth
            required
            value={userData.bio}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          />
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <label>Resume</label>
          <UploadFile
            disabled={disabledField}
            type="doc"
            onUpload={(url) => setUserData({ ...userData, resume: url })}
            value={userData.resume}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          className="grid-item"
          item
          xs={12}
        >
        
        </Grid>
      </Grid>
    </form>
  );
}

export default Profile;
