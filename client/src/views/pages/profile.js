import React, { useState, useEffect } from "react";
import "../../css/profile.css";
import { Edit2 } from "react-feather";
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

export default function Profile(props) {
	const [token, setToken] = useState("");
	const cookies = new Cookies();
	const { profilename } = useParams();
	const history = useHistory();
	const [visible, setvisible] = useState(0);
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
						// console.log(res.data, "data");
						user.firstname = res.data.data[0].firstname;
						user.lastname = res.data.data[0].lastname;
						user.username = res.data.data[0].username;
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
		return () => {
			unmount = true;
		};
		// eslint-disable-next-line
	}, [history, profilename]);

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
					<div className="username-div"></div>
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
			<div className="profile-list"></div>
		</div>
	);
}
