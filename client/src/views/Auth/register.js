import React, { useState, useEffect } from "react";
import "../../css/register.css";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import isEmail from "../../tools/isEmail";
import isUsername from "../../tools/isUsername";
import isName from "../../tools/isName";
import isPassword from "../../tools/isPassword";
import { Alert } from 'reactstrap'
import PropTypes from 'prop-types';
import Fade from 'Fade';

Alert.propTypes = {
  className: PropTypes.string,
  closeClassName: PropTypes.string,
  color: PropTypes.string, // default: 'success'
  isOpen: PropTypes.bool,  // default: true
  toggle: PropTypes.func,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  fade: PropTypes.bool, // default: true
  // Controls the transition of the alert fading in and out
  // See Fade for more details
  transition: PropTypes.shape(Fade.propTypes),
}

export default function Register() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    verifypassword: "",
  });
  const [userErrors, setUserErrors] = useState({
    errfirstname: "",
    errlastname: "",
    errusername: "",
    erremail: "",
    errpassword: "",
    errverifypassword: "",
  });

  // console.log({ ...user });

  useEffect(() => {
    if ((user.firstname && !isName(user.firstname) && user.firstname.length < 24) || (user.firstname.length > 24) ){
      userErrors.errfirstname = "#e87c03";
      // setUserErrors({ ...userErrors });
    }else {
      userErrors.errfirstname = "";
      setUserErrors({ ...userErrors });
    }
    if ((user.lastname && !isName(user.lastname) && user.lastname.length < 24) || (user.lastname.length > 24) ){
      userErrors.errlastname = "#e87c03";
      // setUserErrors({ ...userErrors });
    }else {
      userErrors.errlastname = "";
      setUserErrors({ ...userErrors });
    }
    if ((user.username && !isUsername(user.username) && user.username.length < 24) || (user.username.length > 24) ){
      userErrors.errusername = "#e87c03";
      setUserErrors({ ...userErrors });
    }else {
      userErrors.errusername = "";
      setUserErrors({ ...userErrors });
    }
    if (user.email && !isEmail(user.email) && user.email.length < 24){
      userErrors.erremail = "#e87c03";
      setUserErrors({ ...userErrors });
    }else {
      userErrors.erremail = "";
      setUserErrors({ ...userErrors });
    }

    if (user.password && !isPassword(user.password))
    {
      userErrors.errpassword = "#e87c03";
        setUserErrors({ ...userErrors });
    }else {
      userErrors.errpassword = "";
      setUserErrors({ ...userErrors });
    }
    if (user.verifypassword && user.password !== user.verifypassword)
    {
      userErrors.errverifypassword = "#e87c03";
      setUserErrors({ ...userErrors });
    }else {
      userErrors.errverifypassword = "";
      setUserErrors({ ...userErrors });
    }// eslint-disable-next-line
  }, [user.firstname, user.lastname, user.username, user.email, user.password, user.verifypassword]);

  const handelRegister = () => {
    if (!user.firstname) {
      userErrors.errfirstname = "#e87c03";
        setUserErrors({ ...userErrors });
        <Alert color="warning">
        This is a warning alert — check it out!
      </Alert>
    };

    if (!user.lastname) {
      userErrors.errlastname = "#e87c03";
        setUserErrors({ ...userErrors });
    };

    if (!user.username) {
      userErrors.errusername= "#e87c03";
        setUserErrors({ ...userErrors });
    };

    if (!user.email) {
      userErrors.erremail = "#e87c03";
        setUserErrors({ ...userErrors });
    };

    if (!user.password) {
      userErrors.errpassword = "#e87c03";
        setUserErrors({ ...userErrors });
    };

    if (!user.verifypassword) {
      userErrors.errverifypassword = "#e87c03";
        setUserErrors({ ...userErrors });
    };

    // if (
    //   username &&
    //   firstname &&
    //   lastname &&
    //   email &&
    //   password &&
    //   verifypassword === password &&
    //   !errusername &&
    //   !errfirstname &&
    //   !errlastname &&
    //   !erremail &&
    //   !errpassword &&
    //   !errverifypassword
    // ) {
    //   Axios.post("http://localhost:3001/register", {
    //     firstname: firstname,
    //     lastname: lastname,
    //     username: username,
    //     email: email,
    //     password: password,
    //   })
    //     .then((res) => {
    //       if (res.data.message === "Email and or username are already used") {
    //         Swal.fire({
    //           icon: "error",
    //           text: "Email and or username are already used please try with another one ",
    //           showConfirmButton: false,
    //           heightAuto: false,
    //         });
    //       } else {
    //         Swal.fire({
    //           icon: "success",
    //           text: "You Are Now Registered Please Check Your Email To Confirm Your Account! ",
    //           showConfirmButton: false,
    //           heightAuto: false,
    //         });
    //         history.push("/login");
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // }
  };

  return (
    <div className="register" data-aos="zoom-out" data-aos-duration="2000">
      <div className="register-content" data-aos="fade-up" data-aos-duration="3000" delay="50">
        <div>
          <h1>
            <FormattedMessage id="Sign up" />
          </h1>
        </div>

        <div className="inputs">
          <div className="inputs-inline">
            <FormattedMessage id="First name">
              {(text) => (
                <input
                  className="inpt"
                  type="text"
                  placeholder={text}
                  value={user.firstname}
                  style={{ borderBottomColor: userErrors.errfirstname }}
                  onChange={(e) => {
                    user.firstname = e.target.value;
                    setUser({ ...user });
                  }}
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="Last name">
              {(text) => (
                <input
                  className="inpt"
                  type="text"
                  placeholder={text}
                  value={user.lastname}
                  style={{ borderBottomColor: userErrors.errlastname }}
                  onChange={(e) => {
                    user.lastname = e.target.value;
                    setUser({ ...user });
                  }}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="inputs-inline">
            <FormattedMessage id="Username">
              {(text) => (
                <input
                  className="inpt"
                  type="text"
                  placeholder={text}
                  value={user.username}
                  style={{ borderBottomColor: userErrors.errusername}}
                  onChange={(e) => {
                    user.username = e.target.value;
                    setUser({ ...user });
                  }}
                />
              )}
            </FormattedMessage>
            <input
              className="inpt"
              type="email"
              placeholder="Email"
              value={user.email}
              style={{ borderBottomColor: userErrors.erremail}}
              onChange={(e) => {
                user.email = e.target.value;
                setUser({ ...user });
              }}
            />
          </div>
          <FormattedMessage id="Password">
            {(text) => (
              <input
                className="inpt"
                type="password"
                placeholder={text}
                value={user.password}
                style={{ borderBottomColor: userErrors.errpassword}}
                onChange={(e) => {
                  user.password = e.target.value;
                  setUser({ ...user });
                }}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="Verify Password">
            {(text) => (
              <input
                className="inpt"
                type="password"
                placeholder={text}
                value={user.verifypassword}
                style={{ borderBottomColor: userErrors.errverifypassword}}
                onChange={(e) => {
                  user.verifypassword = e.target.value;
                  setUser({ ...user });
                }}
              />
            )}
          </FormattedMessage>

          <div className="validation-button">
            <button className="register-button" onClick={() => handelRegister()}>
              <FormattedMessage id="Sign up" />
            </button>
          </div>
        </div>
        <div className={localStorage.getItem("locale") === "fr" ? "to-login fr" : "to-login "}>
          <p>
            <FormattedMessage id="Already a member?" />
            &nbsp;
            <Link className="decoration" to="/login">
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
