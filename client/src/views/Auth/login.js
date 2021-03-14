import React, { useState} from "react";
import "../../css/login.css";
import google from "../../photos/search.svg";
import git from "../../photos/github.svg";
import intra from "../../photos/42.svg";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

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
  const data = history.location.state?.data
  // console.log(data);
  

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
    // if (username && password) {
    //   Axios.post("http://localhost:3001/login", { username: username, password: password }, {})
    //     // .then((response) =>console.log(response))
    //     .then((response) => {
    //       // console.log(response.data)
    //       if (
    //         response.data.message === "Wrong combination!" ||
    //         response.data.message === "User Dosen't exist" ||
    //         response.data.message === "error"
    //       ) {
    //         Swal.fire({
    //           icon: "error",
    //           text: "Wrong Username Or Password",
    //           showConfirmButton: false,
    //           heightAuto: false,
    //         });
    //       } else if (response.data.message === "Please check your email") {
    //         Swal.fire({
    //           icon: "error",
    //           text: "Please check your email",
    //           showConfirmButton: false,
    //           heightAuto: false,
    //         });
    //       } else {
    //         localStorage.setItem("token", response.data.token);
    //         Swal.fire({
    //           icon: "success",
    //           text: "You are now logged in ",
    //           showConfirmButton: false,
    //           heightAuto: false,
    //         });
    //         history.push("/steps");
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // }
  };
  return (
    <div className="login" data-aos="zoom-out-right" data-aos-duration="2000">
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
          ) : data === 3 ? (
            <Alert severity="success"  color="success" className="alert success">
              <FormattedMessage id="Registered" />
            </Alert>
          ) : ""}
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
