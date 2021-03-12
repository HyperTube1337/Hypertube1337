import React from "react";
import "../../css/login.css";
import google from "../../photos/search.svg";
import git from "../../photos/github.svg";
import intra from "../../photos/42.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login" data-aos="zoom-out-right"  data-aos-duration="2000" >
      <div className="login-content" data-aos="zoom-out-right"  data-aos-duration="3000" delay="50">
          <div><h1>Sign in</h1></div>
          
        <div className="inputs" >
            <button className="passport-button Google">Sign in with Google <img alt=""  className="btn-icon g" src={google} /></button>
            <button className="passport-button Git">Sign in with Github <img alt=""  className="btn-icon g" src={git} /></button>
            <button className="passport-button Intra">Sign in with Intra <img alt=""  className="btn-icon g" src={intra} /></button>
          <input className="inpt" type="text" placeholder="Username" />
          {/* <span className="errors">{errusername}</span> */}
          <input className="inpt" type="password" placeholder="Password" />
          {/* <span className="errors">{errpassword}</span> */}
        <div className="validation-button">
          <button className="login-button">
            Sign in
            </button></div>
        </div>
        <div className="forget-password-div">
          <Link className="forget-password" to="/fgpass">
            Forget password?
          </Link>
        </div>
        <div className="to-register">
        <p>
          New to Hypertube?&nbsp;
          <Link className="decoration" to="/register">
            Sign up Now.
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}
