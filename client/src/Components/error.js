import React from "react";
import "../css/error.css";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export default function Error() {
  return (
    <div className="error-image" data-aos="zoom-out" data-aos-duration="2000">
      <div className="error-page">
        <div className="error-page--content" data-aos="fade-up" data-aos-duration="3000">
          <h1><FormattedMessage id="Lost your way?" /></h1>
          <div className="error-page--content--body">
            <p><FormattedMessage id="Sorry, we can't find that page. You'll find lots to explore on the home page." /></p>
            <div className="error-page--content--buttons">
              <Link to="/">
                <button className=" btn hypertube-home">
                <FormattedMessage id="Hypertube Home" />
                </button>
              </Link>
            </div>
            <div className="error-page--content--errorCode">
              <span id="">
              <FormattedMessage id="Error Code" /> <strong><FormattedMessage id="NotFound" />-404</strong>
              </span>
            </div>
          </div>
        </div>
        <span id="" className="error-page--imageSource">
        <FormattedMessage id="FROM" /> <strong>LOST IN SPACE</strong>
        </span>
      </div>
    </div>
  );
}
