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
import { FormattedMessage } from "react-intl";

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
			// ["@media (max-width:780px)"]: {
			// 	flexDirection: "column",
			// },
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
	const [sortby, setSortBy] = useState("desc");
	const history = useHistory();

	useEffect(() => {
		let unmount = false;
		axios
			.get("http://localhost:3001/checkStatus", {
				withCredentials: true,
			})
			.then((response) => {
				if (!unmount) {
					if (response.data.status === "ok") {
						setLoading(true);
						if (sort === "download_count" && submit) {
							setSort("title");
							setSortBy("asc");
						}
						if (sort === "title") {
							setSortBy("asc");
						}
						if (
							sort === "rating" ||
							sort === "year" ||
							sort === "genres"
						) {
							setSortBy("desc");
						}
						const re = /^[a-zA-Z0-9\s]{3,100}$/;
						if (!re.test(String(search)) && submit) {
							history.go("/");
						}
						axios
							.get(
								`https://yts.mx/api/v2/list_movies.json?sort_by=${sort}&order_by=${sortby}&genre=${genres}&minimum_rating=${rating}&query_term=${search}&limit=50&page=${page}`
							)
							.then((res) => {
								if (res.data.status === "ok") {
									if (submit === false) {
										if (
											res.data.data.movie_count >
											movie?.length
										) {
											setMovie(
												movie?.concat(
													res.data.data.movies
												)
											);
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
										.get(
											"http://localhost:3001/getWatchedlist",
											{
												withCredentials: true,
											}
										)
										.then((res) => {
											setWatched(res.data);
										});
								} else {
									axios
										.get(
											`https://yts.megaproxy.info/api/v2/list_movies.json?sort_by=${sort}&order_by=${sortby}&genre=${genres}&minimum_rating=${rating}&query_term=${search}&limit=50&page=${page}`
										)
										.then((res) => {
											if (res.data.status === "ok") {
												if (submit === false) {
													if (
														res.data.data
															.movie_count >
														movie?.length
													) {
														setMovie(
															movie?.concat(
																res.data.data
																	.movies
															)
														);
														setLoading(false);
													} else {
														if (
															res.data.data.movies
														) {
															setMovie(
																res.data.data
																	.movies
															);
															setLoading(false);
														} else {
															setPage(1);
															setLoading(false);
														}
													}
												} else if (submit === true) {
													if (res.data.data.movies) {
														setMovie(
															res.data.data.movies
														);
													} else {
														setPage(1);
													}
													setLoading(false);
													setSubmit(false);
												}
												axios
													.get(
														"http://localhost:3001/getWatchedlist",
														{
															withCredentials: true,
														}
													)
													.then((res) => {
														setWatched(res.data);
													});
											}
										});
								}
							});
					} else {
						history.push("/login");
					}
				}
			});
		return () => {
			unmount = true;
		};
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
				<p>
					<FormattedMessage id="Welcome to the official Hypertube Website" />
				</p>
				<div className="find">
					<form
						onSubmit={(event) => {
							event.preventDefault();
						}}
					>
						<SearchIcon
							className="searchicon"
							onClick={() => setSubmit(true)}
						></SearchIcon>
						<FormattedMessage id="Find the best movies">
							{(text) => (
								<input
									type="text"
									placeholder={text}
									onChange={SearchChange}
								/>
							)}
						</FormattedMessage>
					</form>
				</div>
				<div className="filterResulte">
					<FormControl className={classes.margin}>
						<InputLabel
							htmlFor="demo-customized-select-native"
							className={classes.label}
						>
							<FormattedMessage id="Genre" />
						</InputLabel>
						<NativeSelect
							id="demo-customized-select-native"
							value={genres}
							onChange={genreChange}
						>
							<option aria-label="" value="" />
							<FormattedMessage id="All">
								{(text) => <option value={"0"}>{text}</option>}
							</FormattedMessage>
							<FormattedMessage id="Action">
								{(text) => (
									<option value={"Action"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Adventure">
								{(text) => (
									<option value={"Adventure"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Comedy">
								{(text) => (
									<option value={"Comedy"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Documentary">
								{(text) => (
									<option value={"Documentary"}>
										{text}
									</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Drama">
								{(text) => (
									<option value={"Drama"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="History">
								{(text) => (
									<option value={"History"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Fantasy">
								{(text) => (
									<option value={"Fantasy"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Musical">
								{(text) => (
									<option value={"Musical"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Romance">
								{(text) => (
									<option value={"Romance"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Animation">
								{(text) => (
									<option value={"Animation"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Crime">
								{(text) => (
									<option value={"Crime"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Film-Noir">
								{(text) => (
									<option value={"Film-Noir"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Music">
								{(text) => (
									<option value={"Music"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Sport">
								{(text) => (
									<option value={"Sport"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="War">
								{(text) => (
									<option value={"War"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Talk-Show">
								{(text) => (
									<option value={"Talk-Show"}>{text}</option>
								)}
							</FormattedMessage>
							<FormattedMessage id="Mystery">
								{(text) => (
									<option value={"Mystery"}>{text}</option>
								)}
							</FormattedMessage>
						</NativeSelect>
					</FormControl>
					<FormControl className={classes.margin}>
						<InputLabel
							htmlFor="demo-customized-select-native"
							className={classes.label}
						>
							<FormattedMessage id="rating" />
						</InputLabel>
						<NativeSelect
							id="demo-customized-select-native"
							value={rating}
							onChange={ratingChange}
						>
							<option aria-label="" value="" />
							<FormattedMessage id="All">
								{(text) => <option value={"0"}>{text}</option>}
							</FormattedMessage>
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
					<button
						className="btn btn-rounded"
						type="submit"
						onClick={() => setSubmit(true)}
					>
						<FormattedMessage id="Search" />
					</button>
				</div>
				<div className="radio">
					<FormControl component="fieldset">
						<FormLabel component="legend">
							<FormattedMessage id="Sortby" />
						</FormLabel>
						<RadioGroup
							aria-label="Sort"
							name="sortby"
							value={sort}
							onChange={sortChange}
							className={classes.radio}
						>
							<FormControlLabel
								value="title"
								control={<Radio />}
								label={<FormattedMessage id="Title" />}
							/>
							<FormControlLabel
								value="rating"
								control={<Radio />}
								label={<FormattedMessage id="rating" />}
							/>
							<FormControlLabel
								value="genres"
								control={<Radio />}
								label={<FormattedMessage id="Genre" />}
							/>
							<FormControlLabel
								value="year"
								control={<Radio />}
								label={<FormattedMessage id="Year" />}
							/>
							<FormControlLabel
								value="download_count"
								control={<Radio />}
								label={<FormattedMessage id="Popular" />}
							/>
						</RadioGroup>
					</FormControl>
				</div>
				<div className="cards">
					{movie?.map((film, i) => (
						<div
							className="card"
							style={{
								backgroundImage:
									"url(" + film?.large_cover_image + ")",
							}}
							key={i}
						>
							<div
								className="infoMovie"
								onClick={() => getMovie(film?.id)}
							>
								<GradeIcon
									className={classes.gradIcon}
								></GradeIcon>
								<h4>{film?.rating} / 10</h4>
								<h4 className="genres">{film?.genres + " "}</h4>
								<button className="btn btn-rounded">
									<Link
										className="text-sz"
										to={"/movies/" + film?.id}
									>
										<FormattedMessage id="view Details" />
									</Link>
								</button>
								<p>{film?.title}</p>
								<h4>{film?.year}</h4>
								{film?.eys ? (
									<VisibilityIcon
										className={classes.visibleIcon}
									></VisibilityIcon>
								) : (
									""
								)}
							</div>
						</div>
					))}
					<div className={classes.progress}>
						{loading === true ? (
							<LinearProgress color="secondary" />
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Research;
