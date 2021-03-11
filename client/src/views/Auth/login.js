import React from "react";
import "../../css/style.css";
import google from "../../photos/search.svg";
import git from "../../photos/github.svg";
import intra from "../../photos/42.svg";

export default function Login() {
  return (
    <div className="login" data-aos="fade-right"  data-aos-duration="2000" >
      <div className="login-content">
          <div><h1>Sign in</h1></div>
          
        <div className="inputs" data-aos="zoom-out-right"  data-aos-duration="3000">
            <button className="passport-button Google">Sign in with Google <img alt=""  className="btn-icon g" src={google} /></button>
            <button className="passport-button Git">Sign in with Github <img alt=""  className="btn-icon g" src={git} /></button>
            <button className="passport-button Intra">Sign in with Intra <img alt=""  className="btn-icon g" src={intra} /></button>
          <input className="inpt" type="text" placeholder="Username" />
          {/* <span className="errors">{errusername}</span> */}
          <br />
          <input className="inpt" type="password" placeholder="Password" />
          {/* <span className="errors">{errpassword}</span> */}
        </div>
      </div>
    </div>
  );
}
