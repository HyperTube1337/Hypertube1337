import React, { useState, useEffect} from "react";
import "../../css/login.css";
import google from "../../photos/search.svg";
import git from "../../photos/github.svg";
import intra from "../../photos/42.svg";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
  const history = useHistory();
  const [alert, setalert] = useState(0);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [userErrors, setUserErrors] = useState({
    errusername: "",
    errpassword: "",
  });
  let data = history.location.state?.data;
  // console.log(data);
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) history.push("/");
    // eslint-disable-next-line
  }, [token]);

  const handleLogin = () => {
    userErrors.errusername = "";
    setUserErrors({ ...userErrors });
    if (!user.username) {
      userErrors.errusername = "#e87c03";
      setUserErrors({ ...userErrors });
      setalert(1);
    }
    userErrors.errpassword = "";
    setUserErrors({ ...userErrors });
    if (!user.password) {
      userErrors.errpassword = "#e87c03";
      setUserErrors({ ...userErrors });
      setalert(1);
    }

    if (user.username && user.password) {
      axios
        .post("http://localhost:3001/login", { ...user }, {})
        .then((response) => {
          // console.log(response.data);
          if (
            response.data.message === "Wrong combination!" ||
            response.data.message === "User Dosen't exist" ||
            response.data.message === "error"
          ) {
            // console.log(response.data.message);
            setalert(5);
          } else if (response.data.message === "Please check your email") {
            setalert(6);
          } else {
            localStorage.setItem("token", response.data.token);
            // console.log("done");
            history.push("/profile");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="login responsive" data-aos="zoom-out-right" data-aos-duration="2000">
      <div className="login-content" data-aos="zoom-out-right" data-aos-duration="3000" delay="50">
        <div>
          <h1>
            <FormattedMessage id="login" />
          </h1>
        </div>

        <div className="inputs">
          {alert === 1 ? (
            <Alert severity="warning" className="alert">
              <FormattedMessage id="All the fields should not be empty, Please try again." />
            </Alert>
          ) : alert === 5 ? (
            <Alert severity="warning" className="alert">
              <FormattedMessage id="Wrong Username Or Password" />
            </Alert>
          ) : alert === 6 ? (
            <Alert severity="warning" className="alert">
              <FormattedMessage id="Please check your email" />
            </Alert>
          ) : data === 3 ? (
            <Alert severity="success" color="success" className="alert success">
              <FormattedMessage id="Registered" />
            </Alert>
          ) : data === 4 ? (
            <Alert severity="success" color="success" className="alert success">
              <FormattedMessage id="Your password has been successfully modified." />
            </Alert>
          ) : (
            ""
          )}
          <button
            className="passport-button Google"
            onClick={() => (window.location = "http://localhost:3001/auth/google")}
          >
            <FormattedMessage id="passport" />
            &nbsp;Google
            <img alt="" className="btn-icon g" src={google} />
          </button>
          <button
            className="passport-button Git"
            onClick={() => (window.location = "http://localhost:3001/auth/github")}
          >
            <FormattedMessage id="passport" />
            &nbsp;Github <img alt="" className="btn-icon g" src={git} />
          </button>
          <button className="passport-button Intra" onClick={() => (window.location = "http://localhost:3001/auth/42")}>
            <FormattedMessage id="passport" />
            &nbsp;Intra <img alt="" className="btn-icon g" src={intra} />
          </button>
          <div className="divOr">
            <div className="line"></div>
            <div className="Or"> Or</div>
            <div className="line"></div>
          </div>
          <FormattedMessage id="Username">
            {(text) => (
              <input
                className="inpt"
                type="text"
                placeholder={text}
                value={user.username}
                style={{ borderBottomColor: userErrors.errusername }}
                onChange={(e) => {
                  user.username = e.target.value;
                  setUser({ ...user });
                }}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="Password">
            {(text) => (
              <input
                className="inpt"
                type="password"
                placeholder={text}
                value={user.password}
                style={{ borderBottomColor: userErrors.errpassword }}
                onChange={(e) => {
                  user.password = e.target.value;
                  setUser({ ...user });
                }}
              />
            )}
          </FormattedMessage>

          <div className="validation-button">
            <button className="login-button" onClick={() => handleLogin()}>
              <FormattedMessage id="login" />
            </button>
          </div>
        </div>
        <div className="forget-password-div">
          <Link className="forget-password" to="/fgpass">
            <FormattedMessage id="forgetPassword" />
          </Link>
        </div>
        <div className={localStorage.getItem("locale") === "fr" ? "to-register fr" : "to-register "}>
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
