import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../../app/slices/AuthSlice";

const UserProfile = () => {
  const loggedUser = useSelector(selectUser);
  const { name, email, mobile, gender, task, createdAt, startdate, enddate } =
    loggedUser;

  return (
    <Grid
      mx="auto"
      borderRadius="10px"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "5px 5px 25px rgba(0,0,0,0.4)",
        width: { xs: "300px", md: "800px" },
        padding: "30px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="First Name"
            name="first_name"
            value={name.first}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Last Name"
            name="last_name"
            value={name.last}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={email}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Mobile"
            name="mobile"
            value={mobile}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            name="createdAt"
            value={createdAt}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <h1>Task </h1>
          <textarea style={{ width: 500, height: 200 }} value={task} disabled />
        </Grid>
        <Grid item xs={12}>
          <h3>Given Task Date</h3>
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            name="startdate"
            value={startdate}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <h3>Camplition Task Date</h3>
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            name="enddate"
            value={enddate}
            disabled
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
