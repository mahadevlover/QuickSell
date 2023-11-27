import React from "react";
import icon from "../assets/user.jpg";
import Tooltip from "@mui/material/Tooltip";
import offlineIcon from "../assets/graycircle.png";
import onlineIcon from "../assets/userstatus.png";


const UserIcon = ({ userId, getUserAvailability }) => {
  return (
    <Tooltip
      title={getUserAvailability(userId) ? "Online" : "Offline"}
      followCursor>
      <div style={{ position: "relative" }}>
        <img
          src={icon}
          alt="icon"
          style={{ width: "16px", height: "16px", marginRight: "4px" }} />
        <img
          src={getUserAvailability(userId) ? onlineIcon : offlineIcon}
          alt={getUserAvailability(userId) ? "Online" : "Offline"}
          style={{ width: "10px", height: "10px", position: "absolute", top: "10px", left: "10px" }}
        />
      </div>
    </Tooltip>
  );
};

export default UserIcon;