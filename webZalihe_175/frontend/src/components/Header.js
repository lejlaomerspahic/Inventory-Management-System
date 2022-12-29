import React, { useState } from "react";
import { AppBar, Button, Toolbar, Box, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState(0);
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 30%, rgba(0,212,255,1) 93%)",
      }}
    >
      <Toolbar>
        {isLoggedIn && (
          <Box display="flex">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/sirovine" label="Sirovine"></Tab>
            </Tabs>
          </Box>
        )}

        {!isLoggedIn && (
          <>
            <Box display="flex" marginLeft="auto">
              <Button
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="info"
              >
                Prijavi se
              </Button>
              <Button
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="info"
              >
                Registruj se
              </Button>
            </Box>
          </>
        )}

        {isLoggedIn && (
          <Box display="flex" marginLeft="auto">
            <Button
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="info"
            >
              Promijeni šifru
            </Button>
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="info"
            >
              Odjavi se
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
