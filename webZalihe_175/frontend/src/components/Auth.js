import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:8082/api/user/${type}`, {
        name: inputs.name,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/proizvodi"))
      .then((data) => console.log(data));
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
            onChange={handleChange}
            value={inputs.name}
            placeholder="Name"
            padding={2}
            margin="normal"
            textalign="center"
          ></TextField>{" "}
          <TextField
            name="password"
            type={"password"}
            onChange={handleChange}
            value={inputs.password}
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
