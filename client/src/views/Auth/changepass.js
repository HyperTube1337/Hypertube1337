import React, { useState, useEffect } from "react";
import "../../css/change-pass.css";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Users from "../../services/Users";
import isPassword from "../../tools/isPassword";

export default function Changepass(props) {
  const history = useHistory();
  const [alert, setalert] = useState(0);
  const [validtoken, setValidToken] = useState(0);
  const [password, setPassword] = useState({ Npassword: "", CNpassword: "" });
  const [passwordErrors, setPasswordErrors] = useState({
    errNpassword: "",
    errCNpassword: "",
  });

  useEffect(() => {
    if (validtoken === 0 && props.match.params.token)
      Users.checktoken(props.match.params.token).then((res) => {
        if (res === "1") setValidToken(1);
        else history.push("/error");
      });

    if (password.Npassword && !isPassword(password.Npassword))
    {
      passwordErrors.errNpassword = "#e87c03";
      setPasswordErrors({ ...passwordErrors });
    }
    else {
      passwordErrors.errNpassword = "";
      setPasswordErrors({ ...passwordErrors });
    }
    if (password.CNpassword && password.Npassword !== password.CNpassword) 
    {
      passwordErrors.errCNpassword = "#e87c03";
      setPasswordErrors({ ...passwordErrors });
    }
    else
    {
      passwordErrors.errCNpassword = "";
      setPasswordErrors({ ...passwordErrors });
    }// eslint-disable-next-line
  }, [password.Npassword, password.CNpassword, history, props.match.params.token, validtoken]);

  const handlePass = () => {
    console.log(props.match.params.token);
    const token = props.match.params.token;
    if (!password.Npassword) {
      passwordErrors.errNpassword = "#e87c03";
      setPasswordErrors({ ...passwordErrors });
      setalert(1);
    }
    if (!password.CNpassword) {
      passwordErrors.errCNpassword = "#e87c03";
      setPasswordErrors({ ...passwordErrors });
      setalert(1);
    }
    if (password.Npassword && password.CNpassword && !passwordErrors.errNpassword && !passwordErrors.errCNpassword) {
      axios
        .post("http://localhost:3001/changepass", { password: password.Npassword, token: token })
        .then((res) => {
          if (res.data.message === "modified") {
            setalert(4);
            history.push("/login", { data: 4 });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="box-form" data-aos="zoom-out" data-aos-duration="2000">
      <div className="change-pass-box" data-aos="fade-left" data-aos-duration="3000">
        <div className="change-pass">
          <h1>
            <FormattedMessage id="Reset Password !" />
          </h1>
          <p>
            <FormattedMessage id="Please Enter Your new Password :" />
          </p>
          <div className="inputs changepass">
          <div>
            {alert === 1 ? (
              <Alert severity="warning" className="alert">
                <FormattedMessage id="All the fields should not be empty, Please try again." />
              </Alert>
            ) : ""}
          </div>
            <FormattedMessage id="Password">
              {(text) => (
                <input
                  className="inpt"
                  type="password"
                  placeholder={text}
                  value={password.Npassword}
                  style={{ borderBottomColor: passwordErrors.errNpassword }}
                  onChange={(e) => {
                    password.Npassword = e.target.value;
                    setPassword({ ...password });
                  }}
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="Confirm New Password">
              {(text) => (
                <input
                  className="inpt"
                  type="password"
                  placeholder={text}
                  value={password.CNpassword}
                  style={{ borderBottomColor: passwordErrors.errCNpassword }}
                  onChange={(e) => {
                    password.CNpassword = e.target.value;
                    setPassword({ ...password });
                  }}
                />
              )}
            </FormattedMessage>
            <br />
            <button className="btn btn-rounded" onClick={() => handlePass()}>
            <FormattedMessage id="Change Password" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
