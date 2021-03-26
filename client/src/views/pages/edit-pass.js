import React, { useEffect, useState } from "react";
import isPassword from "../../tools/isPassword";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import Alert from "@material-ui/lab/Alert";

export default function EditPass(props) {
  const cookies = new Cookies();
  const [token, setToken] = useState("");
  const history = useHistory();
  const data = props.data1.user;
  const [alert, setalert] = useState(0);
  const [userErrors, setUserErrors] = useState({
    errOpassword: "",
    errNpassword: "",
    errverifyNpassword: "",
  });
  useEffect(() => {
    setToken(cookies.get("jwt"));
    if (props.data1.user.Npassword && !isPassword(props.data1.user.Npassword)) {
      userErrors.errNpassword = "#e87c03";
      setUserErrors({ ...userErrors });
    } else {
      userErrors.errNpassword = "";
      setUserErrors({ ...userErrors });
    }
    if (props.data1.user.verifyNpassword && props.data1.user.Npassword !== props.data1.user.verifyNpassword) {
      userErrors.errverifyNpassword = "#e87c03";
      setUserErrors({ ...userErrors });
    } else {
      userErrors.errverifyNpassword = "";
      setUserErrors({ ...userErrors });
    } // eslint-disable-next-line
  }, [props.data1.user.Npassword, props.data1.user.verifyNpassword]);

  const handelEditPassword = () => {
    if (
      props.data1.user.Opassword &&
      props.data1.user.Npassword &&
      props.data1.user.verifyNpassword === props.data1.user.Npassword &&
      !userErrors.errNpassword &&
      !userErrors.errverifyNpassword
    )
      axios
        .post(
          "http://localhost:3001/editPassword",
          {
            ...data,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data === "U failed to authenticate" || res.data === "we need a token") {
            if (token) cookies.set("jwt", token, { maxAge: -10, httpOnly: false });            
            history.push("/login");
          } else {
            if (res.data === "inccorect password" || res.data === "error") {
              setalert(1);
            } else if (res.data === "modified") {
              props.data1.user.Opassword = "";
              props.data1.user.Npassword = "";
              props.data1.user.verifyNpassword = "";
              props.data1.setUser({ ...props.data1.user });
              setalert(2);
            }
            console.log(res.data);
          }
        });
  };
  return (
    <div className="inputs inputs-profile" data-aos="fade-up" data-aos-duration="3000">
      <div>
        {alert === 1 ? (
          <Alert severity="warning" className="alert">
            <FormattedMessage id="Your old password is inccorect" />
          </Alert>
        ) : alert === 2 ? (
          <Alert severity="success" color="success" className="alert success">
            <FormattedMessage id="Your password have been successfully modified" />
          </Alert>
        ) : (
          ""
        )}
      </div>
      <FormattedMessage id="Old Password">
        {(text) => (
          <input
            disabled={props.data.visible === 0 ? true : false}
            style={
              props.data.visible === 0
                ? { backgroundColor: "rgba(240, 240, 240, 0.2)", border: "none" }
                : { backgroundColor: "" }
            }
            className="inpt inpt-profile"
            type="password"
            placeholder={text}
            value={props.data1.user.Opassword}
            onChange={(e) => {
              props.data1.user.Opassword = e.target.value;
              props.data1.setUser({ ...props.data1.user });
            }}
          />
        )}
      </FormattedMessage>
      <FormattedMessage id="New Password">
        {(text) => (
          <input
            disabled={props.data.visible === 0 ? true : false}
            style={
              props.data.visible === 0
                ? { backgroundColor: "rgba(240, 240, 240, 0.2)", border: "none" }
                : { backgroundColor: "", borderBottomColor: userErrors.errNpassword }
            }
            className="inpt inpt-profile"
            type="password"
            placeholder={text}
            value={props.data1.user.Npassword}
            onChange={(e) => {
              props.data1.user.Npassword = e.target.value;
              props.data1.setUser({ ...props.data1.user });
            }}
          />
        )}
      </FormattedMessage>
      <FormattedMessage id="Confirm New Password">
        {(text) => (
          <input
            disabled={props.data.visible === 0 ? true : false}
            style={
              props.data.visible === 0
                ? { backgroundColor: "rgba(240, 240, 240, 0.2)", border: "none" }
                : { backgroundColor: "", borderBottomColor: userErrors.errverifyNpassword }
            }
            className="inpt inpt-profile"
            type="password"
            placeholder={text}
            value={props.data1.user.verifyNpassword}
            onChange={(e) => {
              props.data1.user.verifyNpassword = e.target.value;
              props.data1.setUser({ ...props.data1.user });
            }}
          />
        )}
      </FormattedMessage>
      <div
        className="validation-button"
        style={{ width: "97%", display: props.data.visible === 0 ? "none" : "inline" }}
      >
        <button className="register-button inpt-profile" onClick={() => handelEditPassword()}>
          <FormattedMessage id="Edit change" />
        </button>
      </div>
    </div>
  );
}
