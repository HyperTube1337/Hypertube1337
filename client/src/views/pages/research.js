import React, { useState, useEffect } from "react";
import "../../css/research.css";
import GradeIcon from "@material-ui/icons/Grade";
import InputLabel from "@material-ui/core/InputLabel";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";

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
  const sortChange = (event) => {
    setSort(event.target.value);
  };
  const useStyles = makeStyles({
    margin: {
      margin: "spacing(1)",
    },
    label: {
      color: "#ffff",
      fontSize: "21px",
    },
    radio: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      // marginTop: "90px",
    },
    progress: {
      width: "100%",
      "& > * + *": {
        marginTop: "spacing(2)",
      },
      marginBottom: "15px",
    },
  });
  const handlscroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setLoading(true);
      setPage((pre) => pre + 1);
    }
  };
  const classes = useStyles();
  const [background, setbackground] = useState();
  const [year, setYear] = useState("all");
  const [sort, setSort] = useState("genre");
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState();
  const [rating, setRating] = useState("all");
  const [movie, setMovie] = useState([""]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setbackground("https://miro.medium.com/max/7680/1*5pj4U4-L9MBmhm3rEoADqA.jpeg");
    axios.get(`https://yts.mx/api/v2/list_movies.json?sort_by=download_count&page=${page}`).then((res) => {
      if (res.data.status === "ok") {
        let mov = movie;
        setMovie(mov.concat(res.data.data.movies));
        setLoading(false);
      }
    });
  }, [page]);
  return (
    <div className="research" onScroll={handlscroll}>
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
              <option value={"all"}>All</option>
              <option value={2021}>2021</option>
              <option value={2020}>2020</option>
              <option value={2019}>2019</option>
              <option value={"2015-2018"}>2015-2018</option>
              <option value={"2010-2014"}>2010-2014</option>
              <option value={"2000-2009"}>2000-2009</option>
              <option value={"1990-1999"}>1990-1999</option>
              <option value={"1980-1989"}>1980-1989</option>
              <option value={"1970-1979"}>1970-1979</option>
              <option value={"1990-1969"}>1960-1900</option>
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native" className={classes.label}>
              Genre
            </InputLabel>
            <NativeSelect id="demo-customized-select-native" value={genre} onChange={genreChange}>
              <option aria-label="" value="" />
              <option value={"Action"}>Action</option>
              <option value={"Adventure"}>Adventure</option>
              <option value={"Adventure"}>Adventure</option>
              <option value={"Comedy"}>Comedy</option>
              <option value={"Documentary"}>Documentary</option>
              <option value={"Drama"}>Drama</option>
              <option value={"History"}>History</option>
              <option value={"Fantasy"}>Fantasy</option>
              <option value={"Musical"}>Musical</option>
              <option value={"Romance"}>Romance</option>
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
        <div className="radio">
          <FormControl component="fieldset">
            <FormLabel component="legend">Sortby</FormLabel>
            <RadioGroup aria-label="Sort" name="sortby" value={sort} onChange={sortChange} className={classes.radio}>
              <FormControlLabel value="title" control={<Radio />} label="Title" />
              <FormControlLabel value="rating" control={<Radio />} label="Rating" />
              <FormControlLabel value="genre" control={<Radio />} label="Genre" />
              <FormControlLabel value="year" control={<Radio />} label="Year" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="cards">
          {movie
            ?.filter(
              (filter) =>
                (rating === "all" ? filter.rating >= 1 : filter.rating >= rating) &&
                (year == "all" ? filter.year >= 1990 : year.length < 9 ? filter.year == year : filter.year >= year.substr(0, 4) && filter.year <= year.substr(5, 8))
            )
            .sort((a, b) => b[sort] - a[sort])
            .map((film, i) => (
              <div className="card" style={{ backgroundImage: "url(" + film.large_cover_image + ")" }} Keys="i">
                <div className="infoMovie">
                  <GradeIcon></GradeIcon>
                  <h4>{film?.rating} / 10</h4>
                  <h4 className="genres">{film?.genres + " "}</h4>
                  <button className="btn btn-rounded">
                    <Link className="text-sz">
                      <FormattedMessage id="view Details" />
                    </Link>
                  </button>
                  <p>{film?.title}</p>
                  <h4>{film?.year}</h4>
                </div>
              </div>
            ))}
          <div className={classes.progress}>{loading == true ? <LinearProgress color="secondary" /> : ""}</div>
        </div>
      </div>
    </div>
  );
}

export default Research;
