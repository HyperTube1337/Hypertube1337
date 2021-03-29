import React, { useState, useEffect } from "react";
import "../../css/movies.css";
import { useParams, useHistory } from "react-router-dom";
import GradeIcon from "@material-ui/icons/Grade";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Cookies from "universal-cookie";
import Moment from "react-moment";

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
    cast: [""],
    imdb_code: "",
  });
  const [videoSrc, setVideoSrc] = useState("");
  const [inputContent, setinputContent] = useState("");
  const [quality, setQuality] = useState("720p");
  const [comment, setComment] = useState([]);
  const cookies = new Cookies();
  const [token, setToken] = useState("");
  console.log(comment);
  const { id } = useParams();
  function getMovieLink() {
    const hash = movies?.torrents
      ?.filter((mov) => mov.quality === quality && (mov.type === "bluray" || mov.type === "web"))
      .map((qua) => {
        qua = qua.hash;
        return qua;
      });
    axios
      .post(
        "http://localhost:3001/stream",
        { link: hash[0] },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("walo");
      });
    axios
      .post(
        "http://localhost:3001/watchedlist",
        {
          imdb: movies.imdb_code,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
      });
    // setTimeout(setVideoSrc({ src: `http://localhost:3001/stream/${hash}/${response.headers["content-type"]}`, type: "video/mp4" }), 1000);
  }
  const handelCmnt = (e) => {
    setinputContent(e.target.value);
  };
  function insertCmnt() {
    if (inputContent.trim() === "") {
    } else {
      axios.post("http://localhost:3001/insertCmnt", { cmntCentent: inputContent, imdb_code: id }, { withCredentials: true }).then((res) => {
        if (res.data) {
          let val = {
            profilePic: res.data[0].profilePic,
            username: res.data[0].username,
            time: new Date(),
            cmntContent: inputContent,
          };
          setinputContent("");
          setComment((old) => old.concat(val));
        } else {
          console.log(res.data.err);
        }
      });
    }
  }
  useEffect(() => {
    setToken(cookies.get("jwt"));
    axios
      .get("http://localhost:3001/checkStatus", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === "ok") {
          axios.get(`https://yts.mx/api/v2/movie_details.json?&movie_id=${id}&with_images=true&with_cast=true`).then((res) => {
            console.log(res.data.data);
            if (res.data.status === "ok") {
              if (res.data.data.movie.id) {
                setMovies({
                  ...movies,
                  year: res.data.data.movie.year,
                  title: res.data.data.movie.title,
                  runtime: res.data.data.movie.runtime,
                  rating: res.data.data.movie.rating,
                  medium_cover_image: res.data.data.movie.medium_cover_image,
                  yt_trailer_code: "https://www.youtube.com/embed/" + res.data.data.movie.yt_trailer_code,
                  genres: res.data.data.movie.genres[0],
                  torrents: res.data.data.movie.torrents,
                  cast: res.data.data.movie.cast,
                  medium_screenshot_image1: res.data.data.movie.medium_screenshot_image1,
                  medium_screenshot_image2: res.data.data.movie.medium_screenshot_image2,
                  medium_screenshot_image3: res.data.data.movie.medium_screenshot_image3,
                  imdb_code: res.data.data.movie.imdb_code,
                });
              } else {
                history.push("/Error");
              }
            } else {
              axios.get(`https://yts.megaproxy.info/api/v2/list_movies.json?query_term=split`).then((res) => {
                setMovies({
                  ...movies,
                  year: res.data.data.movie.year,
                  title: res.data.data.movie.title,
                  runtime: res.data.data.movie.runtime,
                  rating: res.data.data.movie.rating,
                  medium_cover_image: res.data.data.movie.medium_cover_image,
                  yt_trailer_code: "https://www.youtube.com/embed/" + res.data.data.movie.yt_trailer_code,
                  genres: res.data.data.movie.genres[0],
                  torrents: res.data.data.movie.torrents,
                  cast: res.data.data.movie.cast,
                  medium_screenshot_image1: res.data.data.movie.medium_screenshot_image1,
                  medium_screenshot_image2: res.data.data.movie.medium_screenshot_image2,
                  medium_screenshot_image3: res.data.data.movie.medium_screenshot_image3,
                  imdb_code: res.data.data.movie.imdb_code,
                });
              });
            }
          });
          axios
            .post(
              "http://localhost:3001/getCmnt",
              {
                imdb_code: id,
              },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              setComment(res.data);
            });
        } else {
          history.push("/login");
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
            <p className="quality_P" onClick={() => setQuality("720p")}>
              720HD
            </p>
            <p className="quality_P" onClick={() => setQuality("1080p")}>
              1080HD
            </p>
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
          <div className="mini-card" style={{ backgroundImage: "url(" + movies.medium_screenshot_image1 + ")" }}></div>
          <div className="mini-card" style={{ backgroundImage: "url(" + movies.medium_screenshot_image2 + ")" }}></div>
          <div className="mini-card" style={{ backgroundImage: "url(" + movies.medium_screenshot_image3 + ")" }}></div>
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
          <div className="cast">
            <h4>Cast</h4>
            {movies?.cast?.map((cast, index) => (
              <div key={index}>
                <a href={`https://www.imdb.com/name/nm${cast.imdb_code}/`}>
                  <Avatar alt={cast?.name} src={cast?.url_small_image} className={classes.large} />
                </a>
                <p>{cast?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="play">
        <div className="moviePlayer">
          <span>Thank you for watching</span>
          <ReactPlayer controls url={[videoSrc]} />
        </div>
        <div className="comment">
          <form noValidate autoComplete="off">
            <input className="inputMsg" label="Message" variant="outlined" placeholder="add a comment" value={inputContent} onChange={handelCmnt} />
          </form>
          <Button className="buttonCmnt" variant="contained" onClick={() => insertCmnt()}>
            Post
          </Button>
          <div className="comment_Section">
            {comment?.map((cmnt, index) => (
              <div className="styleCmnt" key={index}>
                <div>
                  <h5>{cmnt?.username}</h5>
                  <Moment fromNow className="cmntTime">
                    {cmnt?.time}
                  </Moment>
                </div>
                <div>
                  <img src={cmnt?.profilePic} alt="" />
                  <p>{cmnt?.cmntContent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Movies;
