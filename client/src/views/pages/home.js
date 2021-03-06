import React, { useState, useEffect } from "react";
import "../../css/home.css";
import { Link } from "react-router-dom";
import arrow from "../../photos/arrow.png";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Home() {
  const cookies = new Cookies();
  const [token, setToken] = useState("");
  const history = useHistory();

  useEffect(() => {
    setToken(cookies.get("jwt"));
    if (token) history.push("/library");
    // eslint-disable-next-line
  }, [token]);

  return (
    <div data-aos="zoom-out" data-aos-duration="2000" className="home">
      <div data-aos="fade-left" data-aos-duration="3000" className="showcase-content">
        <h1>
          <FormattedMessage id="See what's next" />
        </h1>
        <p>
          <FormattedMessage id="Watch anywhere. Cancel Anytime" />
        </p>
        <Link to="/register" className={localStorage.getItem("locale") === "fr" ? "btn btn-xl fr" : "btn btn-xl"}>
          <FormattedMessage id="Start Watching For Free" />
          <img alt="" className="btn-icon" src={arrow} />
        </Link>
      </div>
    </div>
  );
}
