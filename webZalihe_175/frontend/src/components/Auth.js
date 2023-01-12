import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    const credentials = {
      name,
      password,
    };
    e.preventDefault();
    await axios
      .post("http://localhost:8082/api/user/login", credentials)
      .then((response) => {
        if (response.data.user.role === "admin") {
          navigate("/sirovine");
          dispatch(authActions.login());
        } else if (response.data.user.role === "zaposlenik") {
          navigate("/proizvodi");
          dispatch(authActions.login());
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography padding={2} textAlign="center" fontWeight="bold">
            Login
          </Typography>
          <TextField
            name="name"
            type={"name"}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            padding={2}
            margin="normal"
            textalign="center"
          ></TextField>{" "}
          <TextField
            name="password"
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            padding={2}
            margin="normal"
            textalign="center"
          ></TextField>{" "}
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 2 }}
            color="info"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Auth;
