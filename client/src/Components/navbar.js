import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import film from "../photos/film.png";
import Languages from "./multi-language";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Navbar(props) {
  const loc = useLocation();
  // console.log(loc.pathname);
  const [token, setToken] = useState("");
  const history = useHistory();
  const [userlogged, setuserlogged] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    axios
      .get("http://localhost:3001/getusername", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data === "U failed to authenticate" || res.data === "we need a token") {
          localStorage.removeItem("token");
          // history.push("/");
        } else {
          setuserlogged(res.data);
        }
      });
    // eslint-disable-next-line
  }, []);

  const click = () => {
    setToken("");
    if (token) localStorage.removeItem("token");
    else setToken("");
    history.push("/");
  };

  return (
    <div className="navigation" data-aos="fade-right" data-aos-duration="3000">
      <Link to="/">
        <img alt="" className="film" src={film} />
      </Link>

      <div className="brand">
        <Link className="text-s" to="/">
          Hypertube
        </Link>
      </div>

      <nav>
        <ul className="nav-list">
          {loc.pathname === "/register" || loc.pathname === "/login" ? (
            <Languages />
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <li className="li-dote">
                <Link className="text-s" to={token ? "/profile/"+ userlogged : "" }>
                  {token ? "Profile" : ""}
                </Link>
              </li>
              <Languages />
              <button className="btn btn-rounded" onClick={() => (token ? click() : "")}>
                <Link className="text-sz" to={!token ? "/login" : "/"}>
                  <FormattedMessage id={!token ? "login" : "Log out"} />
                </Link>
              </button>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}
