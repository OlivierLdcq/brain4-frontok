import React from "react";
import "./Display.css";
const Display = ({ url, box }) => {
  return (
    <div className="Display mt-3">
      <div className="Display-box shadow rounded pmain">
        <div className="ImageCtn mt-5 ">
          <img alt="" src={url} className="w-100" id="Image" />
          {box.topRow !== undefined || box.topRow !== 0 ? (
            <div
              className="box "
              style={{
                top: box.topRow,
                left: box.leftCol,
                right: box.rightCol,
                bottom: box.bottomRow,
              }}
            ></div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

export default Display;
