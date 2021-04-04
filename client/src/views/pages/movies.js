import React, { useState, useEffect } from "react";
import "../../css/movies.css";
import { useParams, useHistory, Link } from "react-router-dom";
import GradeIcon from "@material-ui/icons/Grade";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Moment from "react-moment";
import noUser from "../../photos/noUser.png";
import LinearProgress from "@material-ui/core/LinearProgress";
import { FormattedMessage } from "react-intl";
import isNumber from "../../tools/isNumber";
import "moment/locale/fr";

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
  progress: {
    width: "100%",
    "& > * + *": {
      marginTop: "spacing(2)",
    },
    marginBottom: "15px",
  },
});
function Movies() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
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
    discrp: "",
  });
  const [videoSrc, setVideoSrc] = useState("");
  const [inputContent, setinputContent] = useState("");
  const [quality, setQuality] = useState("720p");
  const [comment, setComment] = useState([]);
  const [language, setLanguage] = useState("en");
  const [subtitle, setsubtitle] = useState({
    en: "",
    ar: "",
    fr: "",
  });
  const { id } = useParams();
  function getMovieLink() {
    const hash = movies?.torrents
      ?.filter(
        (mov) =>
          mov.quality === quality &&
          (mov.type === "bluray" || mov.type === "web")
      )
      .map((qua) => {
        qua = qua.hash;
        return qua;
      });
    axios
      .post(
        "http://localhost:3001/streampPlayer",
        { link: hash[0], imdb_code: movies.imdb_code },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.path) {
          setVideoSrc({
            src: `http://localhost:3001/stream/${response.data.path}`,
            type: "video/mp4",
          });
        } else if (response.data.down === "download") {
          setVideoSrc({
            src: `http://localhost:3001/stream/${hash[0]}/${movies.imdb_code}`,
            type: "video/mp4",
          });
        }
        axios
          .post(
            "http://localhost:3001/getSubtitles",
            {
              imdb_code: movies.imdb_code,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            if (res.data.ar === "not found") {
              setsubtitle({
                ...subtitle,
                en: `http://localhost:3001/subtitles/${movies.imdb_code}en.vtt`,
                fr: `http://localhost:3001/subtitles/${movies.imdb_code}fr.vtt`,
              });
            } else if (res.data.status === "ok") {
              setsubtitle({
                ...subtitle,
                en: `http://localhost:3001/subtitles/${movies.imdb_code}en.vtt`,
                ar: `http://localhost:3001/subtitles/${movies.imdb_code}ar.vtt`,
                fr: `http://localhost:3001/subtitles/${movies.imdb_code}fr.vtt`,
              });
            }
          });
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
      .then((response) => {});
  }
  const handelCmnt = (e) => {
    setinputContent(e.target.value);
  };
  function insertCmnt() {
    const re = /^[a-zA-Z0-9\s]{3,100}$/;
    if (inputContent.trim() === "") {
      setinputContent("");
    } else if (!re.test(String(inputContent))) {
      setinputContent("");
    } else {
      axios
        .post(
          "http://localhost:3001/insertCmnt",
          { cmntCentent: inputContent, imdb_code: id },
          { withCredentials: true }
        )
        .then((res) => {
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
          }
        });
    }
  }
  useEffect(() => {
    setLanguage(localStorage.getItem("locale"));
    setLoading(true);
    if (isNumber(id)) {
      axios
        .get("http://localhost:3001/checkStatus", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.status === "ok") {
            axios
              .get(
                `https://yts.mx/api/v2/movie_details.json?&movie_id=${id}&with_images=true&with_cast=true`
              )
              .then((res) => {
                if (res.data.status === "ok") {
                  // console.log(res.data.data.movie);
                  if (res.data.data.movie.id) {
                    setMovies({
                      ...movies,
                      year: res.data.data.movie.year,
                      title: res.data.data.movie.title,
                      runtime: res.data.data.movie.runtime,
                      rating: res.data.data.movie.rating,
                      medium_cover_image:
                        res.data.data.movie.medium_cover_image,
                      yt_trailer_code:
                        "https://www.youtube.com/embed/" +
                        res.data.data.movie.yt_trailer_code,
                      genres: res.data.data.movie.genres[0],
                      torrents: res.data.data.movie.torrents,
                      cast: res.data.data.movie.cast,
                      medium_screenshot_image1:
                        res.data.data.movie.medium_screenshot_image1,
                      medium_screenshot_image2:
                        res.data.data.movie.medium_screenshot_image2,
                      medium_screenshot_image3:
                        res.data.data.movie.medium_screenshot_image3,
                      imdb_code: res.data.data.movie.imdb_code,
                      discrp: res.data.data.movie.description_intro,
                    });
                    setLoading(false);
                  } else {
                    history.push("/Error");
                  }
                } else {
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
    } else {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="movies">
      <div className={classes.progress}>
        {loading === true ? <LinearProgress color="secondary" /> : ""}
      </div>
      <div className="trailer">
        <div
          className="movieCover"
          style={{
            backgroundImage: "url(" + movies?.medium_cover_image + ")",
          }}
        ></div>
        <div className="movieInfo">
          <h3>{movies?.title}</h3>
          <h4>{movies?.year}</h4>
          <h4>{movies.genres}</h4>
          <div className="quality">
            <p>
              <FormattedMessage id="Quality:" />
            </p>
            <p className="quality_P" onClick={() => setQuality("720p")}>
              720HD
            </p>
            <p className="quality_P" onClick={() => setQuality("1080p")}>
              1080HD
            </p>
          </div>
          <div className="imdbRating">
            <p>
              <FormattedMessage id="rating" />
              &nbsp;:
            </p>
            <div>
              <h5>{movies?.rating}</h5>
              <GradeIcon className={classes.rating}></GradeIcon>
            </div>
          </div>
          <div className="time">
            <p>
              <FormattedMessage id="Time :" />
            </p>
            <div>
              <h5>{movies?.runtime} min</h5>
            </div>
          </div>
          {/* <div className="time">
            <p>Description :</p>
            <div>
              <h5>{movies?.description_full}</h5>
            </div>
          </div> */}
        </div>
        <div className="suggestion">
          <div
            className="mini-card"
            style={{
              backgroundImage: "url(" + movies.medium_screenshot_image1 + ")",
            }}
          ></div>
          <div
            className="mini-card"
            style={{
              backgroundImage: "url(" + movies.medium_screenshot_image2 + ")",
            }}
          ></div>
          <div
            className="mini-card"
            style={{
              backgroundImage: "url(" + movies.medium_screenshot_image3 + ")",
            }}
          ></div>
        </div>
      </div>
      <button className="btn btn-rounded" onClick={() => getMovieLink()}>
        <FormattedMessage id="Watch Now !" />
      </button>
      <div className="miniTrailer">
        <div className="trailerPlayer">
          <h4>Description</h4>
          <div className="time">
            <p>{movies?.discrp}</p>
          </div>
        </div>
        <div className="personality">
          <div className="cast">
            <h4>
              <FormattedMessage id="Cast" />
            </h4>
            {movies?.cast?.map((cast, index) => (
              <div key={index}>
                <a href={`https://www.imdb.com/name/nm${cast.imdb_code}/`}>
                  <Avatar
                    alt={cast?.name}
                    src={cast?.url_small_image}
                    className={classes.large}
                  />
                </a>
                <p>{cast?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="play">
        <div className="moviePlayer">
          <span>
            <FormattedMessage id="Thank you for watching" />
          </span>
          <br />
          <br />
          <ReactPlayer
            style={{ margin: "0 auto" }}
            controls
            config={{
              file: {
                attributes: {
                  crossOrigin: "use-credentials",
                },
                tracks: [
                  {
                    kind: "subtitles",
                    src: `${subtitle.en}`,
                    srcLang: "en",
                    default: language === "en",
                  },
                  {
                    kind: "subtitles",
                    src: `${subtitle.ar}`,
                    srcLang: "ar",
                  },
                  {
                    kind: "subtitles",
                    src: `${subtitle.fr}`,
                    srcLang: "fr",
                    default: language === "fr",
                  },
                ],
              },
            }}
            url={[videoSrc]}
          />
        </div>
        <div className="comment">
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            autoComplete="off"
          >
            <FormattedMessage id="add a comment">
              {(text) => (
                <input
                  className="inputMsg"
                  label="Message"
                  variant="outlined"
                  placeholder={text}
                  value={inputContent}
                  onChange={handelCmnt}
                />
              )}
            </FormattedMessage>
          </form>
          <Button
            className="buttonCmnt"
            variant="contained"
            onClick={() => insertCmnt()}
          >
            <FormattedMessage id="Post" />
          </Button>
          <div className="comment_Section">
            {comment?.map((cmnt, index) => (
              <div className="styleCmnt" key={index}>
                <div>
                  <Link to={`/profile/${cmnt?.username}`}>
                    <h5>{cmnt?.username}</h5>
                  </Link>
                  <Moment
                    fromNow
                    className="cmntTime"
                    locale={localStorage.getItem("locale")}
                  >
                    {cmnt?.time}
                  </Moment>
                </div>
                <div>
                  <img
                    src={
                      cmnt?.profilePic
                        ? cmnt?.profilePic.substr(0, 5) === "https"
                          ? cmnt?.profilePic
                          : "http://localhost:3001/images/" + cmnt?.profilePic
                        : noUser
                    }
                    alt=""
                  />
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
