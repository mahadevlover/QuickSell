import React from "react";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import CircleIcon from "@mui/icons-material/Circle";

const RadioCustom = ({ tag }) => {
  return (
    <Paper style={{ padding: "0.1rem 0.2rem 0.2rem 0.1rem" }}>
      <Radio
        disabled={true}
        icon={<CircleIcon style={{ fontSize: 14 }} />}
        color="default"
        size="small"
        style={{ marginRight: 4, padding: 0, marginBottom: "0.1rem" }}
      />
      <span style={{ fontSize: 12 }}>{tag}</span>
    </Paper>
  );
}

export default RadioCustom;
