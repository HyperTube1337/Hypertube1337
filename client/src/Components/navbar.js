import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import film from "../photos/film.png";
import Languages from "./multi-language";

export default function Navbar(props) {
  const loc = useLocation();

  console.log(loc.pathname);

  return (
    <div className="navigation" data-aos="fade-right" data-aos-duration="1000">
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
          {/* <li>
            <NavLink className="text-s" to="/register">
             Register
            </NavLink>
          </li> */}
          <li>
            {loc.pathname === "/register" || loc.pathname === "/login" ? (
              ""
            ) : (
              <button className="btn btn-rounded">
                <Link className="text-sz" to="/login">
                  Sign in
                </Link>
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
