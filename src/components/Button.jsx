import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { useAppState } from "../AppStateContext";

import Addonform from "./Addonform";


const Button = ({ users, status, priority }) => {
  const { selectedOptions } = useAppState();
  const [openForm, setOpenForm] = useState(false);

  const handleIconClick = () => {
    setOpenForm(true);
  };

  
  const handleFormClose = () => {
    setOpenForm(false);
  };


  return (
    <>
      <IconButton onClick={handleIconClick}>
        <AddIcon style={{ fontSize: 18 }} />
      </IconButton>
      <Addonform
        state={selectedOptions.grouping}
        open={openForm}
        onClose={handleFormClose}
        users={users}
        status={status}
        priority={priority}
      />
    </>
  );
};


export default Button;