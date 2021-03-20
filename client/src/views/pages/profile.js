import React, { useState,useEffect } from "react";
import "../../css/profile.css";
import { Edit2 } from "react-feather";
import { Key } from "react-feather";
import EditInfo from "./edit-info";
import EditPass from "./edit-pass";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Profile(props) {
const { profilename } = useParams();
const history = useHistory();
const [user, setUser] = useState({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  profilePic : "",
  user_from : "",
  message : "",
  Opassword: "",
  Npassword: "",
  verifyNpassword: "",
});

useEffect(() => {
  axios
  .get(`http://localhost:3001/getDataByUser/${profilename}`, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  })
  .then((res) => {
      if (res.data === "U failed to authenticate" || res.data === "we need a token") {
        localStorage.removeItem("token");
        history.push("/login");
      } else if (res.data === "no user found") history.push("/");
      else {
        // console.log(res.data)
        user.firstname = res.data.data[0].firstname
        user.lastname = res.data.data[0].lastname
        user.username = res.data.data[0].username
        user.email = res.data.message === "user logged" ? res.data.data[0].email : ""
        user.profilePic = res.data.data[0].profilePic
        user.user_from = res.data.data[0].user_from
        user.message = res.data.message
        setUser({...user})
    }
  });// eslint-disable-next-line
}, [history, profilename])
  const [visible, setvisible] = useState(0);
  const [pass, setpass] = useState(0);
  return (
    <div className="profile" data-aos="zoom-in" data-aos-duration="2000">
      <div style={{ height: "5%" }}></div>
      <div className="profile-content">
        <div className="profile-content-right">
          <div className="picture-div">
          <img className="Inpic" src={user.profilePic} alt={user.profilePic} key={user.profilePic} />
          </div>
          <div className="username-div"></div>
        </div>
        <div className="line-div"></div>
        <div className="profile-content-left">
          <div style={{ height: "5%" }}></div>
          <div className="validation-button edit" style={{display : user.message === "not the user logged" ? "none" : ""}}>
            <button
              className="button-edit"
              disabled = {user.user_from === "" ? false : true}
              onClick={() => {
                setpass(1);
                if (visible === 0) {
                  setvisible(1);
                } else if (visible === 1) {
                  setvisible(0);
                }
              }}
            >
              <Key />
            </button>
            <button
              className="button-edit"
              disabled = {user.user_from === "" ? false : true}
              onClick={() => {
                setpass(0);
                if (visible === 0) {
                  setvisible(1);
                } else if (visible === 1) {
                  setvisible(0);
                }
              }}
            >
              <Edit2 />
            </button>
          </div>
          {pass === 0 ? <EditInfo data={{ visible, setvisible }} data1={{user, setUser}} /> : <EditPass data={{ visible, setvisible }} />}
        </div>
      </div>
      <div className="profile-list"></div>
    </div>
  );
}
