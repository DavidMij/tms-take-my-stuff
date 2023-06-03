import React, { useContext, useState } from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import http from "../../axios";
import { useRouter } from "next/router";
import { AuthContext } from "../_app";

export const Register = () => {
  const [state, setState] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await http.post("/api/register", state);
      if (res.data.success) {
        setIsAuthenticated(true);
        await router.push("/");
      }
    } catch (e) {
      console.error(e);
      setError(e.response.data.message);
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Typography variant="h2" align="center">
        We want to meet you
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <TextField
              label="Full Name"
              name="fullname"
              value={state.fullname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={state.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={state.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box align="center" sx={{ color: "error.main" }}>{error} </Box>
    </div>
  );
};

export default Register;
