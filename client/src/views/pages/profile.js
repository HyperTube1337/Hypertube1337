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
        console.log(res.data)
        // setprofile(1);
        // console.log(res.data);
        // setfirstname(res.data[0].firstname);
        // setlastname(res.data[0].lastname);
        // setusername(res.data[0].username);
        // setRating(res.data[0].rating);
        // setCity(res.data[0].city);
        // setlastConnection(res.data[0]?.last_connection);
        // if (res.data[0].tags) setTags(JSON.parse(res.data[0].tags));
        // gender.birthday = moment(res.data[0].birthday).format("YYYY-MM-DD");
        // gender.yourGender = res.data[0].gender;
        // gender.genderLooking = res.data[0].genderLooking;
        // setGender({ ...gender });
        // center.lat = res.data[0].latitude;
        // center.lng = res.data[0].longitude;
        // setCenter({ ...center });
        // setNotes(res.data[0].bio);
        // if (res.data[0].profilePic)
        //   setProfileImg(
        //     res.data[0]?.profilePic.substr(0, 5) === "https"
        //       ? res.data[0].profilePic
        //       : "http://localhost:3001/images/" + res.data[0].profilePic
        //   );
        // if (res.data[0].image) setImg(res.data);
      
    }
  });
}, [])
  const [visible, setvisible] = useState(0);
  const [pass, setpass] = useState(0);
  return (
    <div className="profile">
      <div style={{ height: "5%" }}></div>
      <div className="profile-content">
        <div className="profile-content-right">
          <div className="picture-div"></div>
          <div className="username-div"></div>
        </div>
        <div className="line-div"></div>
        <div className="profile-content-left">
          <div style={{ height: "5%" }}></div>
          <div className="validation-button edit">
            <button
              className="button-edit"
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
          {pass === 0 ? <EditInfo data={{ visible, setvisible }} /> : <EditPass data={{ visible, setvisible }} />}
        </div>
      </div>
      <div className="profile-list"></div>
    </div>
  );
}
