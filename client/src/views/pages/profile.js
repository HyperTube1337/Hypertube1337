import React, { useState } from "react";
import "../../css/profile.css";
import { Edit2 } from "react-feather";
import { Key } from "react-feather";
import EditInfo from "./edit-info";
import EditPass from "./edit-pass";

export default function Profile(props) {
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
