import React, { useContext, useState } from "react";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem, Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import http from "../../axios";
import { AuthContext } from "../../pages/_app";
import Image from "next/image";

export const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { setIsAuthenticated } = useContext(AuthContext);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const res = await http.post("/api/logout");
      if (res.status === 200) {
        handleClose();
        setIsAuthenticated(false);
        await router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppBar
      position="relative"
      sx={{ background: "transparent", height: "100px", p: "0 30px" }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Grid item>
          <Button
            onClick={() => router.push("/")}
            size="large"
            sx={{ fontSize: "18px" }}
          >
            <Image alt="/public/" src="/logo.png" width={260} height={80} />
          </Button>
        </Grid>

        <Grid item container justifyContent="flex-end" xs={6}>
          {!isAuthenticated ? (
            <>
              <Grid item>
                <Button
                  onClick={() => router.push("/login")}
                  size="large"
                  sx={{ fontSize: "18px" }}
                >
                  Login
                </Button>
              </Grid>

              <Grid item>
                <Button
                  onClick={() => router.push("/register")}
                  size="large"
                  sx={{ fontSize: "18px" }}
                >
                  Register
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item>
              <Typography></Typography>
              <IconButton onClick={handleClick} size="large">
                <AccountCircleIcon sx={{ width: "30px", height: "30px" }} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            router.push("/admin-dashboard");
            handleClose();
          }}
        >
          Your Dashboard
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
