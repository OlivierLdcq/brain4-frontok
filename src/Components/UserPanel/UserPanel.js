import React from "react";
import "./UserPanel.css";
import profile2 from "./profile2.png";
const UserPanel = ({ user }) => {
  return (
    <div className="UserPanel mt-3">
      {" "}
      <div className="UserPanelBox shadow-lg pmain ">
        <div className="d-flex">
          <img src={profile2} className="profilePic" alt="" />
          <p className="name">{`${user.name} | Count : ${user.entries}`}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
