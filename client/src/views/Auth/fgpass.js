import React, {useState, useEffect} from 'react'
import isEmail from "../../tools/isEmail";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import "../../css/fgpass.css"
import { useHistory} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

export default function Fgpass() {

  const [email, setemail] = useState("");
  const [erremail, seterremail] = useState("");
  const history = useHistory();
  const [token, setToken] = useState("");
  const [alert, setalert] = useState(0);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) history.push("/");
    // eslint-disable-next-line
  }, [token]);

  const handleFgpass = () => {
    seterremail("");
    if (!email) {
      seterremail("#e87c03");
      setalert(1);
    }
    else if (!isEmail(email)) seterremail("#e87c03");
    else if (email && !erremail) {
      axios.post("http://localhost:3001/fgpass", { email: email }).then((res) => {
        if (res.data.message === "done") {
          setalert(3);
          setemail("")
        } else {
          console.log(res.data)
          setalert(2);
          setemail("");
        }
      });
    }
  };
    return (
        <div className="login" data-aos="zoom-out-right" data-aos-duration="2000">
      <div className="login-content" data-aos="zoom-out-right" data-aos-duration="3000" delay="50">
        <div className="fgpass">
          <h1>
            <FormattedMessage id="Forgot Password?" />
          </h1>
          <p>
          Enter the email address you used when you joined and we’ll send you instructions to reset
          your password.
        </p>
        </div>

        <div className="inputs">
        <div>
            {alert === 1 ? (
              <Alert severity="warning" className="alert">
                <FormattedMessage id="Email should not be empty, Please try again." />
              </Alert>
            ) : alert === 2 ? (
              <Alert severity="warning" className="alert">
                <FormattedMessage id="Email Not Found, Please try again." />
              </Alert>
            ) : alert === 3 ? (
              <Alert severity="success"  color="success" className="alert success">
                <FormattedMessage id="Email Send Please Check Your EmailBox To Change Your Password!" />
              </Alert>
            ) : (
              ""
            )}
          </div>
        <input
              className="inpt"
              type="email"
              placeholder="Email"
              value={email}
              style={{ borderBottomColor: erremail }}
              onChange={(e) => {
                setemail(e.target.value)
              }}
            />

          <div className="validation-button">
            <button className="login-button" onClick={() => handleFgpass()}>
              <FormattedMessage id="Send Reset Instructions" />
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
