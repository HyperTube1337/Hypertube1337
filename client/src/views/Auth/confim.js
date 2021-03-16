import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "../../css/confirm.css"
import Users from "../../services/Users";
import { FormattedMessage } from "react-intl";

function Confim(props) {
  const history = useHistory();
  const [validtoken, setValidToken] = useState(0);

  useEffect(() => {
    if (validtoken === 0 && props.match.params.token)
      Users.checktokenpass(props.match.params.token).then((res) => {
        if (res === "1") setValidToken(1);
        else history.push("/error");
      });

    const token = props.match.params.token;
    Axios.post("http://localhost:3001/confirm", { token: token }).then((res) => {
      // console.log(res.data.message);
      if (res.data.message !== "Verified") {
        history.push("/error");
      }
    });
  });

  return (
    <div className="box-form" data-aos="zoom-out" data-aos-duration="2000">
      <div className="confirm-box" data-aos="fade-left"
        data-aos-duration="3000">
        <div className="confirm">
        <h1><FormattedMessage id="Account Verified!" /></h1>
        <br />
        <br />
        <p><FormattedMessage id="Your account has been successfully verified. You my now sign in." /></p>
        <br />
        <button className="btn btn-rounded" onClick={() => history.push("/login")}>
        <FormattedMessage id="Watch Now !" />
        </button>
        </div>
      </div>
    </div>
  );
}
export default Confim;
