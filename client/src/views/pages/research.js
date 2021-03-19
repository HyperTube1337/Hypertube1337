import React, { useState, useEffect } from "react";
import "../../css/research.css";
import GradeIcon from "@material-ui/icons/Grade";
import InputLabel from "@material-ui/core/InputLabel";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import { FormattedMessage } from "react-intl";
function Research() {
  const yearChange = (event) => {
    setYear(event.target.value);
  };
  const genreChange = (event) => {
    setGenre(event.target.value);
  };
  const ratingChange = (event) => {
    setRating(event.target.value);
  };
  const useStyles = makeStyles({
    margin: {
      margin: "spacing(1)",
    },
    label: {
      color: "#ffff",
      fontSize: "21px",
    },
  });
  const classes = useStyles();
  const [background, setbackground] = useState();
  const [year, setYear] = useState();
  const [genre, setGenre] = useState();
  const [rating, setRating] = useState();
  useEffect(() => {
    setbackground("https://miro.medium.com/max/7680/1*5pj4U4-L9MBmhm3rEoADqA.jpeg");
  }, []);
  console.log(year);
  return (
    <div className="research">
      <div className="filter">
        <h3>Hypertube</h3>
        <p>Welcome to the official Hypertube Website</p>
        <div className="filterResulte">
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native" className={classes.label}>
              Year
            </InputLabel>
            <NativeSelect id="demo-customized-select-native" value={year} onChange={yearChange}>
              <option aria-label="" value="" />
              <option value={2021}>2021</option>
              <option value={2020}>2020</option>
              <option value={2019}>2019</option>
              <option value={"2015-2018"}>2015-2018</option>
              <option value={"2010-2014"}>2010-2014</option>
              <option value={"2000-2009"}>2000-2009</option>
              <option value={"1990-1999"}>1990-1999</option>
              <option value={"1980-1989"}>1980-1989</option>
              <option value={"1970-1979"}>1970-1979</option>
              <option value={"1960-1900"}>1960-1900</option>
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native" className={classes.label}>
              Genre
            </InputLabel>
            <NativeSelect id="demo-customized-select-native" value={genre} onChange={genreChange}>
              <option aria-label="" value="" />
              <option value={"action"}>Action</option>
              <option value={"adventure"}>Adventure</option>
              <option value={"animation"}>Animation</option>
              <option value={"comedy"}>Comedy</option>
              <option value={"documentary"}>Documentary</option>
              <option value={"drama"}>Drama</option>
              <option value={"history"}>History</option>
              <option value={"fantasy"}>Fantasy</option>
              <option value={"musical"}>Musical</option>
              <option value={"romance"}>Romance</option>
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native" className={classes.label}>
              Rating
            </InputLabel>
            <NativeSelect id="demo-customized-select-native" value={rating} onChange={ratingChange}>
              <option aria-label="" value="" />
              <option value={"all"}>All</option>
              <option value={"9"}>+9</option>
              <option value={"8"}>+8</option>
              <option value={"7"}>+7</option>
              <option value={"6"}>+6</option>
              <option value={"5"}>+5</option>
              <option value={"4"}>+4</option>
              <option value={"3"}>+3</option>
              <option value={"2"}>+2</option>
              <option value={"1"}>+1</option>
            </NativeSelect>
          </FormControl>
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
