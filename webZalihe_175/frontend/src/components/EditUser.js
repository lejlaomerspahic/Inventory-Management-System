import axios from "axios";
import React, { useEffect, useState } from "react";
import { InputLabel, TextField, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useSelector } from "react-redux";

function EditUser() {
  const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const id = localStorage.getItem("userId");
  console.log(id);

  const navigate = useNavigate();
  const [inputs, setInputs] = useState();
  const handeChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetch = async () => {
    const res = await axios
      .get(`http://localhost:8082/api/user/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetch().then((data) => {
      setUser(data.user1);
      setInputs({
        name: data.user1.name,
        password: data.user1.password,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:8082/api/user/uredi/${id}`, {
        name: inputs.name,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => dispatch(authActions.logout()))
      .then(() => navigate("/"));
  };

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoggedInAdmin = useSelector((state) => state.isLoggedInAdmin);
  useEffect(() => {
    if (!isLoggedInAdmin || !isLoggedIn) {
      navigate(`/`);
    }
  }, []);

  console.log(inputs);
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSumbit}>
          <Box
            maxWidth={500}
            border={1}
            display="flex"
            borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 30%, rgba(0,212,255,1) 93%)"
            flexDirection="column"
            justifyContent="center"
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={2}
            borderRadius={5}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="Blue"
              variant="h3"
              textAlign={"center"}
            >
              Edit your information
            </Typography>
            <InputLabel sx={labelStyles}>Name</InputLabel>
            <TextField
              onChange={handeChange}
              name="name"
              value={inputs.name}
              margin="auto"
              variant="outlined"
            ></TextField>
            <InputLabel sx={labelStyles}>Password</InputLabel>
            <TextField
              onChange={handeChange}
              name="password"
              value={inputs.password}
              margin="auto"
              variant="outlined"
            ></TextField>
            <Button
              sx={{ mt: 2, borderRadius: 2 }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
}
export default EditUser;
