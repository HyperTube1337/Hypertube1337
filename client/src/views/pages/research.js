import React, { useState, useEffect } from "react";
import "../../css/research.css";
import GradeIcon from "@material-ui/icons/Grade";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
function Research() {
  const [background, setbackground] = useState();
  // setSearchTerm(event.target.value);
  useEffect(() => {
    setbackground("https://miro.medium.com/max/7680/1*5pj4U4-L9MBmhm3rEoADqA.jpeg");
  }, []);
  return (
    <div className="research">
      <div className="filter">
        <h3>Download YTS YIFY movies: HD smallest size</h3>
        <p>
          Welcome to the official YTS.MX (.LT) website. Here you can browse and download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file
          size. YTS Movies Torrents.
        </p>
        <div className="search">
          <input type="text" placeholder="Search" onFocus={(e) => (e.target.placeholder = "")} onBlur={(e) => (e.target.placeholder = "Search")} />
        </div>
        <div className="cards">
          <div className="card" style={{ backgroundImage: "url(" + background + ")" }}>
            <div className="infoMovie">
              <GradeIcon></GradeIcon>
              <h4>8.9/10</h4>
              <h4>Action</h4>
              <button className="btn btn-rounded">
                <Link className="text-sz" to="#">
                  <FormattedMessage id="view Details" />
                </Link>
              </button>
            </div>
          </div>
          <div className="card" style={{ backgroundImage: "url(https://miro.medium.com/max/4000/1*qKUNjQ3yQixYXRSg2TnjdA.jpeg)" }}>
            <div className="infoMovie">
              <GradeIcon></GradeIcon>
              <h4>8.9/10</h4>
              <h4>Action</h4>
              <button className="btn btn-rounded">
                <Link className="text-sz" to="#">
                  <FormattedMessage id="view Details" />
                </Link>
              </button>
            </div>
          </div>
          <div className="card" style={{ backgroundImage: "url(https://miro.medium.com/max/4000/1*qKUNjQ3yQixYXRSg2TnjdA.jpeg)" }}>
            <div className="infoMovie">
              <GradeIcon></GradeIcon>
              <h4>8.9/10</h4>
              <h4>Action</h4>
              <button className="btn btn-rounded">
                <Link className="text-sz" to="#">
                  <FormattedMessage id="view Details" />
                </Link>
              </button>
            </div>
          </div>
          <div className="card" style={{ backgroundImage: "url(https://miro.medium.com/max/4000/1*qKUNjQ3yQixYXRSg2TnjdA.jpeg)" }}>
            <div className="infoMovie">
              <GradeIcon></GradeIcon>
              <h4>8.9/10</h4>
              <h4>Action</h4>
              <button className="btn btn-rounded">
                <Link className="text-sz" to="#">
                  <FormattedMessage id="view Details" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Research;
