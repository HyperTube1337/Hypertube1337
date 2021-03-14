import React from 'react'
import { FormattedMessage } from "react-intl";

export default function Fgpass() {
    return (
        <div className="login" data-aos="zoom-out-right" data-aos-duration="2000">
      <div className="login-content" data-aos="zoom-out-right" data-aos-duration="3000" delay="50">
        <div>
          <h1>
            <FormattedMessage id="login" />
          </h1>
        </div>

        <div className="inputs">
          <FormattedMessage id="Username">
            {(text) => (
              <input
                className="inpt"
                type="text"
                placeholder={text}
                // value={user.username}
                // style={{ borderBottomColor: userErrors.errusername }}
                // onChange={(e) => {
                //   user.username = e.target.value;
                //   setUser({ ...user });
                // }}
              />
            )}
          </FormattedMessage>

          <div className="validation-button">
            <button className="login-button">
              <FormattedMessage id="login" />
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
