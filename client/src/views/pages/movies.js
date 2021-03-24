import React, { useState, useEffect } from "react";
import "../../css/movies.css";
import { Link, useParams, useHistory } from "react-router-dom";
import GradeIcon from "@material-ui/icons/Grade";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
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
  play: {
    position: "absolute",
    width: "84px",
    height: "96px",
    cursor: "pointre",
  },
});
// background-image: url("https://yts.mx/assets/images/movies/cherry_2021/large-cover.jpg");
const back = "https://yts.mx/assets/images/movies/black_panther_2018/large-cover.jpg";
function Movies() {
  const classes = useStyles();
  const history = useHistory();
  const [movies, setMovies] = useState({
    year: "",
    title: "",
    runtime: "",
    rating: "",
    medium_cover_image: "",
    yt_trailer_code: "",
    genres: "",
    torrents: [""],
  });
  const [videoSrc, setVideoSrc] = useState("");

  const { imdbcode } = useParams();
  function getMovieLink() {
    const hash = movies?.torrents
      ?.filter((mov) => mov.quality === "720p" && mov.type === "bluray")
      .map((qua) => {
        qua = qua.hash;
        return qua;
      });
    axios.post("http://localhost:3001/stream", { link: hash }).then((response) => {
      if (response) {
        setTimeout(setVideoSrc({ src: `http://localhost:3001/stream/${hash}/${response.headers["content-type"]}`, type: "video/mp4" }), 1000);
      }
    });
  }
  console.log(videoSrc);
  useEffect(() => {
    axios.get(`https://yts.mx/api/v2/list_movies.json?&query_term=${imdbcode}`).then((res) => {
      if (res.data.status === "ok") {
        if (res.data.data.movie_count > 0) {
          setMovies({
            ...movies,
            year: res.data.data.movies[0].year,
            title: res.data.data.movies[0].title,
            runtime: res.data.data.movies[0].runtime,
            rating: res.data.data.movies[0].rating,
            medium_cover_image: res.data.data.movies[0].medium_cover_image,
            yt_trailer_code: "https://www.youtube.com/embed/" + res.data.data.movies[0].yt_trailer_code,
            genres: res.data.data.movies[0].genres[0],
            torrents: res.data.data.movies[0].torrents,
          });
          console.log(res.data.data);
        } else {
          history.push("/Error");
        }
      }
    });
  }, []);
  return (
    <div className="movies">
      <div className="trailer">
        <div className="movieCover" style={{ backgroundImage: "url(" + movies?.medium_cover_image + ")" }}></div>
        <div className="movieInfo">
          <h3>{movies?.title}</h3>
          <h4>{movies?.year}</h4>
          <h4>{movies.genres}</h4>
          <div className="quality">
            <p>Quality:</p>
            <Link to="/library">720HD</Link>
            <Link to="/library">1080HD</Link>
          </div>
          <div className="imdbRating">
            <p>Rating :</p>
            <div>
              <h5>{movies?.rating}</h5>
              <GradeIcon className={classes.rating}></GradeIcon>
            </div>
          </div>
          <div className="time">
            <p>Time :</p>
            <div>
              <h5>{movies?.runtime} min</h5>
            </div>
          </div>
        </div>
        <div className="suggestion">
          <div className="mini-card" style={{ backgroundImage: "url(" + back + ")" }}>
            <Link to="/library"></Link>
          </div>
          <div className="mini-card" style={{ backgroundImage: "url(" + back + ")" }}>
            <Link to="/library"></Link>
          </div>
          <div className="mini-card" style={{ backgroundImage: "url(" + back + ")" }}>
            <Link to="/library"></Link>
          </div>
          <div className="mini-card" style={{ backgroundImage: "url(" + back + ")" }}>
            <Link to="/library"></Link>
          </div>
        </div>
      </div>
      <button className="btn btn-rounded" onClick={() => getMovieLink()}>
        Watch Now
      </button>
      <div className="miniTrailer">
        <div className="trailerPlayer">
          <h4>Trailer</h4>
          <ReactPlayer controls url={movies.yt_trailer_code} />
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
      <div className="play">
        <span>Thank you for watching</span>
        <ReactPlayer controls url={[videoSrc]} />
      </div>
    </div>
  );
}
export default Movies;
