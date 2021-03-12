import React from "react";
import "../../css/register.css";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register" data-aos="zoom-out" data-aos-duration="2000">
      <div
        className="register-content"
        data-aos="fade-up"
        data-aos-duration="3000"
        delay="50"
      >
        <div>
          <h1>Sign up</h1>
        </div>

        <div className="inputs">
          <div className="inputs-inline">
            <input
              className="inpt"
              type="text"
              placeholder="First name"
              // value={firstname}
              // onChange={(e) => {
              //   setfirstname(e.target.value);
              // }}
            />
            {/* <span className="errors">{errfirstname}</span> */}
            <input
              className="inpt"
              type="text"
              placeholder="Last name"
              // value={lastname}
              // onChange={(e) => {
              //   setlastname(e.target.value);
              // }}
            />
          </div>
          <div className="inputs-inline">
            {/* <span className="errors">{errlastname}</span> <br /> */}
            <input
              className="inpt"
              type="text"
              placeholder="Username"
              // value={username}
              // onChange={(e) => {
              //   setusername(e.target.value);
              // }}
            />
            {/* <span className="errors">{errusername}</span> */}
            <input
              className="inpt"
              type="email"
              placeholder="Email"
              // value={email}
              // onChange={(e) => {
              //   setemail(e.target.value);
              // }}
            />
            {/* <span className="errors">{erremail}</span> */}
          </div>
          <input
            className="inpt"
            type="password"
            placeholder="Password"
            // value={password}
            // onChange={(e) => {
            //   setpassword(e.target.value);
            // }}
          />
          {/* <span className="errors">{errpassword}</span> <br /> */}
          <input
            className="inpt"
            type="password"
            placeholder="Verify Password"
            // value={verifypassword}
            // onChange={(e) => {
            //   setverifypassword(e.target.value);
            // }}
          />
          {/* <span className="errors">{errverifypassword}</span> */}

          <div className="validation-button">
            <button className="register-button">Sign up</button>
          </div>
        </div>
        <div className="forget-password-div">
          <Link className="forget-password" to="/fgpass">
            Forget password?
          </Link>
        </div>
        <div className="to-login">
          <p>
            Already a member?&nbsp;
            <Link className="decoration" to="/login">
              Sign in Now.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
