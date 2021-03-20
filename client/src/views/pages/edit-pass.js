import React from 'react'
import { FormattedMessage } from "react-intl";

export default function EditPass(props) {
    // props.data.setvisible(0)
    return (
        <div className="inputs inputs-profile" data-aos="fade-up" data-aos-duration="3000">
        <FormattedMessage id="Old Password">
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
        <FormattedMessage id="New Password">
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
        <FormattedMessage id="Confirm New Password">
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
        <div
          className="validation-button"
          style={{ width: "97%", display: props.data.visible === 0 ? "none" : "inline" }}
        >
          <button className="register-button inpt-profile">
            <FormattedMessage id="Edit change" />
          </button>
        </div>
      </div>
    )
}
