import React, { Fragment } from "react";

function Popup(props) {

  return (
    <Fragment>
      <div className="overlay" onClick={props.closePopup}></div>
      <div className="popup">
        <div>
          <h3>{props.heading}</h3>
        </div>
        <p>{props.message}</p>
        <div className="popup-btn">
          <button className="btn" onClick={props.closePopup}>
            Close
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Popup;
