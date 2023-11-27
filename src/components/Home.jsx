import React, { useEffect, useState } from "react";
import {Box,Grid,styled,Paper,Backdrop,CircularProgress,Tooltip} from "@mui/material";
import { useAppState } from "../AppStateContext";
import axios from "axios";

import TicketGroupPriority from "./GroupPriority";
import GroupStatus from "./GroupStatus";
import GroupUser from "./GroupUser";

import inProgressIcon from "../assets/progress.png";
import backlogIcon from "../assets/backlog.png";
import cancelIcon from "../assets/cancel.png";
import doneIcon from "../assets/done.png";
import todoIcon from "../assets/darkroming.png";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';



// Staus icon function
const statusIcons = {
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Canceled: cancelIcon,
};


//Prioritylabels icon function
const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};


//priorityICons
const priorityIcons = {
  4: (
    <Tooltip title={priorityLabels[4]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
      <SdCardAlertIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem",color:"orange" }}
        />
      </Paper>
    </Tooltip>
  ),
  3: (
    <Tooltip title={priorityLabels[3]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
      <SignalCellularAltIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
      </Paper>
    </Tooltip>
  ),
  2: (
    <Tooltip title={priorityLabels[2]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
      <SignalCellularAlt2BarIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
      </Paper>
    </Tooltip>
  ),
  1: (
    <Tooltip title={priorityLabels[1]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
      <SignalCellularAlt1BarIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
      </Paper>
    </Tooltip>
  ),
  0: (
    <Tooltip title={priorityLabels[0]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <MoreHorizIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
      </Paper>
    </Tooltip>
  ),
};

const priorityValues = [4, 3, 2, 1, 0];



const statusValues = ["Backlog", "Todo", "In progress", "Done", "Canceled"];

const MainContainer = styled(Grid)({
  /* ... */
});

const Home = () => {
  const { selectedOptions } = useAppState();
  const [data, setData] = useState({
    tickets: [],
    users: [],
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
        setData(response.data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
 
  const groupedTickets_status = {};
  data?.tickets?.forEach((ticket) => {
    if (!groupedTickets_status[ticket.status]) {
      groupedTickets_status[ticket.status] = [];
    }
    groupedTickets_status[ticket.status].push(ticket);
  });

  // group basis user
  const groupedTickets_user = {};
  data?.tickets?.forEach((ticket) => {
    if (!groupedTickets_user[ticket.userId]) {
      groupedTickets_user[ticket.userId] = [];
    }
    groupedTickets_user[ticket.userId].push(ticket);
  });

  // group basis priority
  const groupedTickets_priority = {};
  data?.tickets?.forEach((ticket) => {
    if (!groupedTickets_priority[ticket.priority]) {
      groupedTickets_priority[ticket.priority] = [];
    }
    groupedTickets_priority[ticket.priority].push(ticket);
  });
  //

  // sorting basis title
  const compareTitles = (a, b) => {
    return a.title.localeCompare(b.title);
  };

  if (selectedOptions.ordering === "title") {
    for (const status in groupedTickets_status) {
      groupedTickets_status[status]?.sort(compareTitles);
    }
    for (const user in groupedTickets_user) {
      groupedTickets_user[user]?.sort(compareTitles);
    }
    for (const priority in groupedTickets_priority) {
      groupedTickets_priority[priority]?.sort(compareTitles);
    }
  }
  //

  // sorting basis priority
  const comparePriority = (a, b) => {
    return a.priority - b.priority;
  };

  if (selectedOptions.ordering === "priority") {
    for (const status in groupedTickets_status) {
      groupedTickets_status[status]?.sort(comparePriority);
    }
    for (const user in groupedTickets_user) {
      groupedTickets_user[user]?.sort(comparePriority);
    }
    for (const priority in groupedTickets_priority) {
      groupedTickets_priority[priority]?.sort(comparePriority);
    }
  }
  //

  return (
    <Box
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <MainContainer container>
        <Backdrop
          open={!isDataLoaded}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {selectedOptions.grouping === "status" ? (
          <GroupStatus
            data={data}
            groupedTickets_status={groupedTickets_status}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityLabels={priorityLabels}
            statusValues={statusValues}
          />
        ) : null}

        {selectedOptions.grouping === "user" ? (
          <GroupUser
            data={data}
            groupedTickets_user={groupedTickets_user}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityValues={priorityValues}
            priorityLabels={priorityLabels}
            statusValues={statusValues}
          />
        ) : null}

        {selectedOptions.grouping === "priority" ? (
          <TicketGroupPriority
            data={data}
            groupedTickets_priority={groupedTickets_priority}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityValues={priorityValues}
            priorityLabels={priorityLabels}
            statusValues={statusValues}
          />
        ) : null}
      </MainContainer>
    </Box>
  );
};

export default Home;
