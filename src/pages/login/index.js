import React, { useContext, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import http from "../../axios";
import { AuthContext } from "../_app";
import { useRouter } from "next/router";

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    http
      .post("/api/login", values)
      .then((res) => {
        setError("");
        setIsAuthenticated(true);
        router.push("/admin-dashboard");
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography variant="h2">Good to see you again</Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <TextField
              fullWidth
              error={!!error}
              name="email"
              value={values.email}
              label="Email Address"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              error={!!error}
              name="password"
              value={values.password}
              label="Password"
              type="password"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ color: "error.main" }}>{error}</Box>
    </div>
  );
};

export default Login;
