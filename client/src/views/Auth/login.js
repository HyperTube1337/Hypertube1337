import React from "react";
import "../../css/login.css";
import google from "../../photos/search.svg";
import git from "../../photos/github.svg";
import intra from "../../photos/42.svg";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export default function Login() {
  return (
    <div className="login" data-aos="zoom-out-right" data-aos-duration="2000">
      <div
        className="login-content"
        data-aos="zoom-out-right"
        data-aos-duration="3000"
        delay="50"
      >
        <div>
          <h1>
            <FormattedMessage id="login" />
          </h1>
        </div>

        <div className="inputs">
          <button className="passport-button Google">
            <FormattedMessage id="passport" />
            &nbsp;Google
            <img alt="" className="btn-icon g" src={google} />
          </button>
          <button className="passport-button Git">
            <FormattedMessage id="passport" />
            &nbsp;Github <img alt="" className="btn-icon g" src={git} />
          </button>
          <button className="passport-button Intra">
            <FormattedMessage id="passport" />
            &nbsp;Intra <img alt="" className="btn-icon g" src={intra} />
          </button>

          <FormattedMessage id="Username">
            {(text) => <input className="inpt" type="text" placeholder={text} />}
          </FormattedMessage>
          <FormattedMessage id="Password">
            {(text) => <input className="inpt" type="text" placeholder={text} />}
          </FormattedMessage>

          <div className="validation-button">
            <button className="login-button">
              <FormattedMessage id="login" />
            </button>
          </div>
        </div>
        <div className="forget-password-div">
          <Link className="forget-password" to="/fgpass">
            <FormattedMessage id="forgetPassword" />
          </Link>
        </div>
        <div
          className={
            localStorage.getItem("locale") === "fr"
              ? "to-register fr"
              : "to-register "
          }
        >
          <p>
            <FormattedMessage id="New" /> Hypertube?&nbsp;
            <Link className="decoration" to="/register">
              <FormattedMessage id="login" />
              &nbsp;
              <FormattedMessage id="Now" />.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
