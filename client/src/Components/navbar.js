import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import film from "../photos/film.png";
import Languages from "./multi-language";
import { FormattedMessage } from "react-intl";
export default function Navbar(props) {
  const loc = useLocation();

  console.log(loc.pathname);

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
              <Languages />
              <button className="btn btn-rounded">
                <Link className="text-sz" to="/login">
                  <FormattedMessage id="login" />
                </Link>
              </button>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}
