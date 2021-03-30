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
import SearchIcon from "@material-ui/icons/Search";
import LinearProgress from "@material-ui/core/LinearProgress";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

function Research() {
  const genreChange = (event) => {
    setGenres(event.target.value);
  };
  const ratingChange = (event) => {
    setRating(event.target.value);
  };
  const sortChange = (event) => {
    setSort(event.target.value);
  };
  const SearchChange = (event) => {
    setSearch(event.target.value);
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
      ["@media (max-width:780px)"]: {
        flexDirection: "column",
      },
    },
    progress: {
      width: "100%",
      "& > * + *": {
        marginTop: "spacing(2)",
      },
      marginBottom: "15px",
    },
    visibleIcon: {
      color: "#ff8000",
    },
    gradIcon: {
      color: "#e50914",
      width: "35px",
      height: "35px ",
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
  const [sort, setSort] = useState("download_count");
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState("0");
  const [rating, setRating] = useState(0);
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState("");
  const [watched, setWatched] = useState([""]);
  const cookies = new Cookies();
  const [token, setToken] = useState("");
  const history = useHistory();

  useEffect(() => {
    setToken(cookies.get("jwt"));
    axios
      .get("http://localhost:3001/checkStatus", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === "ok") {
          setLoading(true);
          axios.get(`https://yts.mx/api/v2/list_movies.json?sort_by=${sort}&genre=${genres}&minimum_rating=${rating}&query_term=${search}&limit=50&page=${page}`).then((res) => {
            if (res.data.status === "ok") {
              if (submit === false) {
                if (res.data.data.movie_count > movie?.length) {
                  setMovie(movie?.concat(res.data.data.movies));
                  setLoading(false);
                } else {
                  if (res.data.data.movies) {
                    setMovie(res.data.data.movies);
                    setLoading(false);
                  } else {
                    setPage(1);
                    setLoading(false);
                  }
                }
              } else if (submit === true) {
                if (res.data.data.movies) {
                  setMovie(res.data.data.movies);
                } else {
                  setPage(1);
                }
                setLoading(false);
                setSubmit(false);
              }
              axios
                .get("http://localhost:3001/getWatchedlist", {
                  withCredentials: true,
                })
                .then((res) => {
                  setWatched(res.data);
                  // }
                });
            }
          });
        } else {
          history.push("/login");
        }
      });

    // eslint-disable-next-line
  }, [page, submit]);
  function compareArray(a, b) {
    var i = 0;
    while (i < a.length) {
      var j = 0;
      while (j < b.length) {
        if (a[i]?.imdb_code === b[j]?.imdbCode) {
          a[i].eys = 1;
          i = i + 1;
        }
        j = j + 1;
      }
      i = i + 1;
    }
  }
  function getMovie(link) {
    history.push("/movies/" + link);
  }
  compareArray(movie, watched);
  return (
    <div className="research" onScroll={handlscroll}>
      <div className="filter">
        <h3>Hypertube</h3>
        <p>Welcome to the official Hypertube Website</p>
        <div className="find">
          <form>
            <SearchIcon className="searchicon" onClick={() => setSubmit(true)}></SearchIcon>
            <input type="text" placeholder="Find the best movies" onChange={SearchChange} />
          </form>
        </div>
        <div className="filterResulte">
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native" className={classes.label}>
              Genre
            </InputLabel>
            <NativeSelect id="demo-customized-select-native" value={genres} onChange={genreChange}>
              <option aria-label="" value="" />
              <option value={"0"}>All</option>
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
              <option value={"Animation"}>Animation</option>
              <option value={"Crime"}>Crime</option>
              <option value={"Film-Noir"}>Film-Noir</option>
              <option value={"Music"}>Music</option>
              <option value={"Musical"}>Musical</option>
              <option value={"Sport"}>Sport</option>
              <option value={"War"}>War</option>
              <option value={"Talk-Show"}>Talk-Show</option>
              <option value={"Mystery"}>Mystery</option>
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native" className={classes.label}>
              Rating
            </InputLabel>
            <NativeSelect id="demo-customized-select-native" value={rating} onChange={ratingChange}>
              <option aria-label="" value="" />
              <option value={"0"}>All</option>
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
          <button className="btn btn-rounded" type="submit" onClick={() => setSubmit(true)}>
            Search
          </button>
        </div>
        <div className="radio">
          <FormControl component="fieldset">
            <FormLabel component="legend">Sortby</FormLabel>
            <RadioGroup aria-label="Sort" name="sortby" value={sort} onChange={sortChange} className={classes.radio}>
              <FormControlLabel value="title" control={<Radio />} label="Title" />
              <FormControlLabel value="rating" control={<Radio />} label="Rating" />
              <FormControlLabel value="genres" control={<Radio />} label="Genre" />
              <FormControlLabel value="year" control={<Radio />} label="Year" />
              <FormControlLabel value="download_count" control={<Radio />} label="Popular" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="cards">
          {movie?.map((film, i) => (
            <div className="card" style={{ backgroundImage: "url(" + film?.large_cover_image + ")" }} key={i}>
              <div className="infoMovie" onClick={() => getMovie(film?.id)}>
                <GradeIcon className={classes.gradIcon}></GradeIcon>
                <h4>{film?.rating} / 10</h4>
                <h4 className="genres">{film?.genres + " "}</h4>
                <button className="btn btn-rounded">
                  <Link className="text-sz" to={"/movies/" + film?.id}>
                    view Details
                  </Link>
                </button>
                <p>{film?.title}</p>
                <h4>{film?.year}</h4>
                {film?.eys ? <VisibilityIcon className={classes.visibleIcon}></VisibilityIcon> : ""}
              </div>
            </div>
          ))}
          <div className={classes.progress}>{loading === true ? <LinearProgress color="secondary" /> : ""}</div>
        </div>
      </div>
    </div>
  );
}

export default Research;
