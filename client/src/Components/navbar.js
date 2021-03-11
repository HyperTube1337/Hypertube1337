import React from 'react'
import { NavLink, Link } from "react-router-dom";
import "../css/navbar.css";
import film from "../photos/film.png";

export default function Navbar() {
    return (
        <div className="navigation" data-aos="fade-right" data-aos-duration="1000">
      <Link to="/">
        <img alt="" className="film" src={film}/>
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
           <button className="btn btn-rounded" >
           <Link className="text-sz" to="/login">
                Sign in
                </Link>
                </button>
          </li>
        </ul>
      </nav>
    </div>
    )
}
