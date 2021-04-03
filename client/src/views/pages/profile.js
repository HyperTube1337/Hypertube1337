import React, { useState, useEffect } from "react";
import "../../css/profile.css";
import { Edit2 } from "react-feather";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Key } from "react-feather";
import EditInfo from "./edit-info";
import EditPass from "./edit-pass";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Upload } from "react-feather";
import jimp from "jimp";
import Skeleton from "@material-ui/lab/Skeleton";
import Cookies from "universal-cookie";
import GradeIcon from "@material-ui/icons/Grade";

export default function Profile(props) {
	const [token, setToken] = useState("");
	const cookies = new Cookies();
	const { profilename } = useParams();
	const history = useHistory();
	const [visible, setvisible] = useState(0);
	const [MovieInfo, setMoiveInfo] = useState([]);
	const [pass, setpass] = useState(0);
	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		profilePic: "",
		user_from: "",
		message: "",
		Opassword: "",
		Npassword: "",
		verifyNpassword: "",
	});
	const useStyles = makeStyles({
		gradIcon: {
			color: "#e50914",
			width: "35px",
			height: "35px ",
		},
	});
	const classes = useStyles();

	function getMovie(link) {
		history.push("/movies/" + link);
	}
	useEffect(() => {
		let unmount = false;
		setToken(cookies.get("jwt"));
		axios
			.get(`http://localhost:3001/getDataByUser/${profilename}`, {
				withCredentials: true,
			})
			.then((res) => {
				if (!unmount) {
					if (
						res.data === "U failed to authenticate" ||
						res.data === "we need a token"
					) {
						// cookies.remove("jwt");
						if (token)
							cookies.set("jwt", token, {
								maxAge: -10,
								httpOnly: false,
							});

						history.push("/login");
					} else if (res.data === "no user found") history.push("/");
					else {
						console.log(res.data, "data");
						user.firstname = res?.data?.data[0]?.firstname;
						user.lastname = res?.data?.data[0]?.lastname;
						user.username = res?.data?.data[0]?.username;
						user.email =
							res.data.message === "user logged"
								? res.data.data[0].email
								: "";
						// console.log(res?.data?.data[0]?.profilePic.substr(0, 5))
						user.profilePic = res?.data?.data[0]?.profilePic
							? res?.data?.data[0]?.profilePic.substr(0, 5) ===
							  "https"
								? res.data.data[0].profilePic
								: "http://localhost:3001/images/" +
								  res?.data?.data[0]?.profilePic
							: "";
						user.user_from = res.data.data[0].user_from;
						user.message = res.data.message;
						setUser({ ...user });
					}
				}
			});
		axios
			.post(
				"http://localhost:3001/getProfileWatchedList",
				{
					username: profilename,
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				// setWatched(res.data);
				if (res) {
					var i = 0;
					while (i < res.data.length) {
						axios
							.get(
								`https://yts.mx/api/v2/list_movies.json?&query_term=${res.data[i].imdbCode}}`
							)
							.then((res) => {
								if (res.data.status === "ok") {
									console.log(res.data.data.movies);
									setMoiveInfo((old) =>
										old.concat(res.data.data.movies)
									);
								}
							});
						i++;
					}
				}
				// }
			});
		return () => {
			unmount = true;
		};
		// eslint-disable-next-line
	}, [history, profilename]);

	console.log(MovieInfo);
	const handleFile = function () {
		const content = this.result;

		const base64Data = content
			? content.replace(/^data:image\/\w+;base64,/, "")
			: "";
		const buffer = Buffer.from(base64Data, "base64");
		jimp.read(buffer, (err, rslt) => {
			if (err) {
				setUser({ ...user });
			} else {
				setUser({ ...user, profilePic: content });
				axios
					.post(
						"http://localhost:3001/editImage",
						{
							content,
						},
						{ withCredentials: true }
					)
					.then((res) => {
						if (
							res.data === "U failed to authenticate" ||
							res.data === "we need a token"
						) {
							if (token)
								cookies.set("jwt", token, {
									maxAge: -10,
									httpOnly: false,
								});
							history.push("/login");
						}
					});
			}
		});
	};

	const onDrop = (e, file) => {
		setUser({ ...user, profilePic: "K" });
		let fileData = new FileReader();
		fileData.onloadend = handleFile;
		fileData.readAsDataURL(file[0]);
		e.target.value = "";
	};

	return (
		<div className="profile" data-aos="zoom-in" data-aos-duration="2000">
			<div style={{ height: "5%" }}></div>
			<div className="profile-content">
				<div className="profile-content-right">
					<div className="picture-div">
						{user.profilePic === "K" ? (
							<Skeleton
								variant="circle"
								width={246}
								height={246}
								style={{
									backgroundColor:
										"rgba(130, 130, 130, 0.72)",
								}}
							/>
						) : (
							""
						)}
						{user.profilePic && user.profilePic !== "K" ? (
							<img
								className="Inpic"
								src={user.profilePic}
								alt={user.profilePic}
								key={user.profilePic}
							/>
						) : (
							""
						)}
						{user.message === "user logged" ? (
							<div className="upload">
								<Upload className="upload_tag" />
								<input
									className="file-upload-input"
									type="file"
									accept="image/*"
									onChange={(e) => onDrop(e, e.target.files)}
								/>
							</div>
						) : (
							<div></div>
						)}
					</div>
					{/* <div className="username-div">
						<h2>Last Watch</h2>
						<h1>{MovieInfo?.length}</h1>
					</div> */}
				</div>
				<div className="line-div"></div>
				<div className="profile-content-left">
					<div style={{ height: "5%" }}></div>
					<div
						className="validation-button edit"
						style={{
							display:
								user.message === "not the user logged"
									? "none"
									: "",
						}}
					>
						<button
							className="button-edit"
							disabled={!user.user_from ? false : true}
							onClick={() => {
								setpass(1);
								if (visible === 0) {
									setvisible(1);
								} else if (visible === 1) {
									setvisible(0);
								}
							}}
						>
							<Key />
						</button>
						<button
							className="button-edit"
							disabled={!user.user_from ? false : true}
							onClick={() => {
								setpass(0);
								if (visible === 0) {
									setvisible(1);
								} else if (visible === 1) {
									setvisible(0);
								}
							}}
						>
							<Edit2 />
						</button>
					</div>
					{pass === 0 ? (
						<EditInfo
							data={{ visible, setvisible }}
							data1={{ user, setUser }}
						/>
					) : (
						<EditPass
							data={{ visible, setvisible }}
							data1={{ user, setUser }}
						/>
					)}
				</div>
			</div>
			<div className="profile-list">
				{MovieInfo?.map((film, i) => (
					<div
						className="WatchList"
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
							<GradeIcon className={classes.gradIcon}></GradeIcon>
							<h4>{film?.rating} / 10</h4>
							<h4 className="genres">{film?.genres + " "}</h4>
							<button className="btn btn-rounded">
								<Link
									className="text-sz"
									to={"/movies/" + film?.id}
								>
									view Details
								</Link>
							</button>
							<p>{film?.title}</p>
							<h4>{film?.year}</h4>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
