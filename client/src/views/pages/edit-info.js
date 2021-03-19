import React from "react";
import { FormattedMessage } from "react-intl";

export default function EditInfo(props) {
    // props.data.setvisible(0)
  return (
    <div className="inputs inputs-profile">
      <FormattedMessage id="First name">
        {(text) => (
          <input
            disabled={props.data.visible === 0 ? true : false}
            style={
              props.data.visible === 0
                ? { backgroundColor: "rgba(240, 240, 240, 0.2)", border: "none" }
                : { backgroundColor: "" }
            }
            className="inpt inpt-profile"
            type="text"
            placeholder={text}
            //   value={user.firstname}
            //   style={{ borderBottomColor: userErrors.errfirstname }}
            //   onChange={(e) => {
            //     user.firstname = e.target.value;
            //     setUser({ ...user });
            //   }}
          />
        )}
      </FormattedMessage>
      <FormattedMessage id="Last name">
        {(text) => (
          <input
            disabled={props.data.visible === 0 ? true : false}
            style={
              props.data.visible === 0
                ? { backgroundColor: "rgba(240, 240, 240, 0.2)", border: "none" }
                : { backgroundColor: "" }
            }
            className="inpt inpt-profile"
            type="text"
            placeholder={text}
            //   value={user.lastname}
            //   style={{ borderBottomColor: userErrors.errlastname }}
            //   onChange={(e) => {
            //     user.lastname = e.target.value;
            //     setUser({ ...user });
            //   }}
          />
        )}
      </FormattedMessage>
      <FormattedMessage id="Username">
        {(text) => (
          <input
            disabled={props.data.visible === 0 ? true : false}
            style={
              props.data.visible === 0
                ? { backgroundColor: "rgba(240, 240, 240, 0.2)", border: "none" }
                : { backgroundColor: "" }
            }
            className="inpt inpt-profile"
            type="text"
            placeholder={text}
            //   value={user.username}
            //   style={{ borderBottomColor: userErrors.errusername }}
            //   onChange={(e) => {
            //     user.username = e.target.value;
            //     setUser({ ...user });
            //   }}
          />
        )}
      </FormattedMessage>
      <input
        disabled={props.data.visible === 0 ? true : false}
        style={
          props.data.visible === 0
            ? { backgroundColor: "rgba(240, 240, 240, 0.2)", border: "none" }
            : { backgroundColor: "" }
        }
        className="inpt inpt-profile"
        type="email"
        placeholder="Email"
        //   value={user.email}
        //   style={{ borderBottomColor: userErrors.erremail }}
        //   onChange={(e) => {
        //     user.email = e.target.value;
        //     setUser({ ...user });
        //   }}
      />
      <div
        className="validation-button"
        style={{ width: "97%", display: props.data.visible === 0 ? "none" : "inline" }}
      >
        <button className="register-button inpt-profile">
          <FormattedMessage id="Edit change" />
        </button>
      </div>
    </div>
  );
}
