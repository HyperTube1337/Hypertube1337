import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import isEmail from "../../tools/isEmail";
import isUsername from "../../tools/isUsername";
import isName from "../../tools/isName";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Cookies from 'universal-cookie';

export default function EditInfo(props) {
  const cookies = new Cookies();
  const [userErrors, setUserErrors] = useState({
    errfirstname: "",
    errlastname: "",
    errusername: "",
    erremail: "",
  });
  const data = props.data1.user;
  const [alert, setalert] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (
      (props.data1.user.firstname && !isName(props.data1.user.firstname) && props.data1.user.firstname.length < 24) ||
      props.data1.user.firstname.length > 24
    ) {
      userErrors.errfirstname = "#e87c03";
      setUserErrors({ ...userErrors });
    } else {
      userErrors.errfirstname = "";
      setUserErrors({ ...userErrors });
    }
    if (
      (props.data1.user.lastname && !isName(props.data1.user.lastname) && props.data1.user.lastname.length < 24) ||
      props.data1.user.lastname.length > 24
    ) {
      userErrors.errlastname = "#e87c03";
      setUserErrors({ ...userErrors });
    } else {
      userErrors.errlastname = "";
      setUserErrors({ ...userErrors });
    }
    if (
      (props.data1.user.username && !isUsername(props.data1.user.username) && props.data1.user.username.length < 24) ||
      props.data1.user.username.length > 24
    ) {
      userErrors.errusername = "#e87c03";
      setUserErrors({ ...userErrors });
    } else {
      userErrors.errusername = "";
      setUserErrors({ ...userErrors });
    }
    if (props.data1.user.email && !isEmail(props.data1.user.email) && props.data1.user.email.length < 24) {
      userErrors.erremail = "#e87c03";
      setUserErrors({ ...userErrors });
    } else {
      userErrors.erremail = "";
      setUserErrors({ ...userErrors });
    } // eslint-disable-next-line
  }, [props.data1.user.firstname, props.data1.user.lastname, props.data1.user.username, props.data1.user.email]);

  const handelEdit = () => {
    if (!props.data1.user.firstname) {
      userErrors.errfirstname = "#e87c03";
      setUserErrors({ ...userErrors });
      setalert(1);
    }

    if (!props.data1.user.lastname) {
      userErrors.errlastname = "#e87c03";
      setUserErrors({ ...userErrors });
      setalert(1);
    }

    if (!props.data1.user.username) {
      userErrors.errusername = "#e87c03";
      setUserErrors({ ...userErrors });
      setalert(1);
    }

    if (!props.data1.user.email) {
      userErrors.erremail = "#e87c03";
      setUserErrors({ ...userErrors });
      setalert(1);
    }
    if (
      props.data1.user.firstname &&
      props.data1.user.lastname &&
      props.data1.user.username &&
      props.data1.user.email &&
      !userErrors.errusername &&
      !userErrors.errfirstname &&
      !userErrors.errlastname &&
      !userErrors.erremail
    )
      axios
        .post(
          "http://localhost:3001/edit",
          {
            ...data,
          },
          { withCredentials: true, }
        )
        .then((res) => {
          if (res.data === "U failed to authenticate" || res.data === "we need a token") {
            cookies.remove("jwt");
            history.push("/login");
          } else {
            console.log(res.data)
            if (res.data === "nothing changed") setalert(4);
            else if (res.data === "username is already used") setalert(5);
            else if (res.data === "email is already used") setalert(6);
            else if (res.data === "updated") setalert(7);
          }
        });
  };

  return (
    <div className="inputs inputs-profile" data-aos="fade-up" data-aos-duration="3000">
      <div>
        {alert === 1 ? (
          <Alert severity="warning" className="alert">
            <FormattedMessage id="All the fields should not be empty, Please try again." />
          </Alert>
        ) : alert === 2 ? (
          <Alert severity="warning" className="alert">
            <FormattedMessage id="already used" />
          </Alert>
        ) : alert === 3 ? (
          <Alert severity="success" color="success" className="alert success">
            <FormattedMessage id="Registered" />
          </Alert>
        ) : alert === 4 ? (
          <Alert severity="warning" className="alert">
            <FormattedMessage id="Nothing changed" />
          </Alert>
        ) : alert === 5 ? (
          <Alert severity="warning" className="alert">
            <FormattedMessage id="Username is already used" />
          </Alert>
        ) : alert === 6 ? (
          <Alert severity="warning" className="alert">
            <FormattedMessage id="Email is already used" />
          </Alert>
        ) : alert === 7 ? (
          <Alert severity="success" color="success" className="alert success">
            <FormattedMessage id="Your informations have been successfully modified" />
          </Alert>
        ) : (
          ""
        )}
      </div>
      <FormattedMessage id="First name">
        {(text) => (
          <input
            disabled={props.data.visible === 0 ? true : false}
            style={
              props.data.visible === 0
                ? {
                    backgroundColor: "rgba(240, 240, 240, 0.2)",
                    border: "none",
                  }
                : { backgroundColor: "", borderBottomColor: userErrors.errfirstname }
            }
            className="inpt inpt-profile"
            type="text"
            placeholder={text}
            value={props.data1.user.firstname}
            // style={{ borderBottomColor: userErrors.errfirstname }}
            onChange={(e) => {
              props.data1.user.firstname = e.target.value;
              props.data1.setUser({ ...props.data1.user });
            }}
          />
        )}
      </FormattedMessage>
      <FormattedMessage id="Last name">
        {(text) => (
          <input
            disabled={props.data.visible === 0 ? true : false}
            style={
              props.data.visible === 0
                ? {
                    backgroundColor: "rgba(240, 240, 240, 0.2)",
                    border: "none",
                  }
                : { backgroundColor: "", borderBottomColor: userErrors.errlastname }
            }
            className="inpt inpt-profile"
            type="text"
            placeholder={text}
            value={props.data1.user.lastname}
            // style={{ borderBottomColor: userErrors.errlastname }}
            onChange={(e) => {
              props.data1.user.lastname = e.target.value;
              props.data1.setUser({ ...props.data1.user });
            }}
          />
        )}
      </FormattedMessage>
      <FormattedMessage id="Username">
        {(text) => (
          <input
            disabled={props.data.visible === 0 ? true : false}
            style={
              props.data.visible === 0
                ? {
                    backgroundColor: "rgba(240, 240, 240, 0.2)",
                    border: "none",
                  }
                : { backgroundColor: "", borderBottomColor: userErrors.errusername }
            }
            className="inpt inpt-profile"
            type="text"
            placeholder={text}
            value={props.data1.user.username}
            // style={{ borderBottomColor: userErrors.errusername }}
            onChange={(e) => {
              props.data1.user.username = e.target.value;
              props.data1.setUser({ ...props.data1.user });
            }}
          />
        )}
      </FormattedMessage>
      <input
        disabled={props.data.visible === 0 ? true : false}
        style={
          props.data.visible === 0
            ? {
                backgroundColor: "rgba(240, 240, 240, 0.2)",
                border: "none",
                display: props.data1.user.message === "not the user logged" ? "none" : "",
              }
            : {
                backgroundColor: "",
                borderBottomColor: userErrors.erremail,
                display: props.data1.user.message === "not the user logged" ? "none" : "",
              }
        }
        className="inpt inpt-profile"
        type="email"
        placeholder="Email"
        value={props.data1.user.email}
        onChange={(e) => {
          props.data1.user.email = e.target.value;
          props.data1.setUser({ ...props.data1.user });
        }}
      />
      <div
        className="validation-button"
        style={{ width: "97%", display: props.data.visible === 0 ? "none" : "inline" }}
      >
        <button className="register-button inpt-profile" onClick={() => handelEdit()}>
          <FormattedMessage id="Edit change" />
        </button>
      </div>
    </div>
  );
}
