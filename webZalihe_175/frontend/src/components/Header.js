import React, { useState } from "react";
import { AppBar, Button, Toolbar, Box, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoggedInAdmin = useSelector((state) => state.isLoggedInAdmin);
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const handleEdit = (e) => {
    const id = localStorage.getItem("userId");
    navigate(`/user/${id}`);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 30%, rgba(0,212,255,1) 93%)",
      }}
    >
      <Toolbar>
        {(isLoggedInAdmin || isLoggedIn) && (
          <Box display="flex">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/sirovine" label="Sirovine"></Tab>
              <Tab
                LinkComponent={Link}
                to="/proizvodi/dodaj"
                label="Dodaj proizvod"
              ></Tab>
              <Tab
                LinkComponent={Link}
                to="/proizvodniProces"
                label="Pregledaj proizvodne procese"
              ></Tab>
              {isLoggedInAdmin && (
                <Tab
                  LinkComponent={Link}
                  to="/zaposlenici"
                  label="Pregledaj korisnike"
                ></Tab>
              )}
            </Tabs>
          </Box>
        )}

        {(isLoggedInAdmin || isLoggedIn) && (
          <Box display="flex" marginLeft="auto">
            <Button
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              onClick={handleEdit}
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
