import React, { useState, useEffect } from "react";
import "../../css/movies.css";
import { Link } from "react-router-dom";
import GradeIcon from "@material-ui/icons/Grade";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  rating: {
    color: "#e50914",
  },
  large: {
    width: "spacing(7)",
    height: "spacing(7)",
  },
});
// background-image: url("https://yts.mx/assets/images/movies/cherry_2021/large-cover.jpg");
const background = "https://yts.mx/assets/images/movies/cherry_2021/large-cover.jpg";
const back = "https://yts.mx/assets/images/movies/black_panther_2018/large-cover.jpg";
function Movies() {
  const classes = useStyles();
  const [movies, setMovies] = useState("");
  const [imdbrating, setImdbrating] = useState(4.5);
  useEffect(() => {}, []);
  return (
    <div className="movies">
      <div className="trailer">
        <div className="movieCover" style={{ backgroundImage: "url(" + background + ")" }}></div>
        <div className="movieInfo">
          <h3>Cherry</h3>
          <h4>2021</h4>
          <h4>Drama</h4>
          <div className="quality">
            <p>Quality:</p>
            <Link>720HD</Link>
            <Link>1080HD</Link>
          </div>
          <div className="imdbRating">
            <p>Rating :</p>
            <div>
              <h5>6.6</h5>
              <GradeIcon className={classes.rating}></GradeIcon>
            </div>
          </div>
          <div className="time">
            <p>Time :</p>
            <div>
              <h5>137 min</h5>
            </div>
          </div>
        </div>
        <div className="suggestion">
          <div className="mini-card" style={{ backgroundImage: "url(" + back + ")" }}>
            <Link></Link>
          </div>
          <div className="mini-card" style={{ backgroundImage: "url(" + back + ")" }}>
            <Link></Link>
          </div>
          <div className="mini-card" style={{ backgroundImage: "url(" + back + ")" }}>
            <Link></Link>
          </div>
          <div className="mini-card" style={{ backgroundImage: "url(" + back + ")" }}>
            <Link></Link>
          </div>
        </div>
      </div>
      <button className="btn btn-rounded">Watch Movie</button>
      <div className="miniTrailer">
        <div className="trailerPlayer">
          <h4>Trailer</h4>
          <ReactPlayer controls url="https://www.youtube.com/embed/H5bH6O0bErk?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3" />
        </div>
        <div className="personality">
          <div className="Director">
            <h4>Director</h4>
            <div>
              <Avatar alt="Remy Sharp" src="https://img.yts.mx/assets/images/actors/thumb/nm0751577.jpg" className={classes.large} />
              <p>Anthony Russo</p>
            </div>
          </div>
          <div className="cast">
            <h4>Cast</h4>
            <div>
              <Avatar alt="Remy Sharp" src="https://img.yts.mx/assets/images/actors/thumb/nm0915458.jpg" className={classes.large} />
              <p>Damon Wayans</p>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="https://img.yts.mx/assets/images/actors/thumb/nm0915458.jpg" className={classes.large} />
              <p>Damon Wayans</p>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="https://img.yts.mx/assets/images/actors/thumb/nm0915458.jpg" className={classes.large} />
              <p>Damon Wayans</p>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="https://img.yts.mx/assets/images/actors/thumb/nm0915458.jpg" className={classes.large} />
              <p>Damon Wayans</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Movies;
