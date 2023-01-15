import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputLabel, TextField, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditEmployee() {
  const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const id = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8082/api/zaposlenici/${id}`
      );
      setInputs({
        firstName: res.data.employee1.firstName,
        lastName: res.data.employee1.lastName,
        phoneNumber: res.data.employee1.phoneNumber,
        email: res.data.employee1.email,
        dateOfJoin: res.data.employee1.dateOfJoin,
        dateOfLeave: res.data.employee1.dateOfLeave,
        name: res.data.employee1.user.name,
        password: res.data.employee1.user.password,
      });
    };
    fetchData();
  }, [id]);

  const handeChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:8082/api/zaposlenici/uredi/${id}`,
      {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        phoneNumber: inputs.phoneNumber,
        email: inputs.email,
        dateOfJoin: inputs.dateOfJoin,
        dateOfLeave: inputs.dateOfLeave,
        name: inputs.name,
        password: inputs.password,
      }
    );
    navigate("/zaposlenici");
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
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
              Edit employee
            </Typography>
            <InputLabel sx={labelStyles}>firstname</InputLabel>
            <TextField
              onChange={handeChange}
              name="firstName"
              value={inputs.firstName}
              margin="auto"
              variant="outlined"
            ></TextField>
            <InputLabel sx={labelStyles}>lastName</InputLabel>
            <TextField
              onChange={handeChange}
              name="lastName"
              value={inputs.lastName}
              margin="auto"
              variant="outlined"
            ></TextField>
            <InputLabel sx={labelStyles}>phoneNumber</InputLabel>
            <TextField
              onChange={handeChange}
              name="phoneNumber"
              value={inputs.phoneNumber}
              margin="auto"
              variant="outlined"
            ></TextField>
            <InputLabel sx={labelStyles}>email</InputLabel>
            <TextField
              onChange={handeChange}
              name="email"
              value={inputs.email}
              margin="auto"
              variant="outlined"
            ></TextField>
            <InputLabel sx={labelStyles}>dateOfJoin</InputLabel>
            <TextField
              onChange={handeChange}
              name="dateOfJoin"
              value={inputs.dateOfJoin}
              margin="auto"
              variant="outlined"
            ></TextField>
            <InputLabel sx={labelStyles}>dateOfLeave</InputLabel>
            <TextField
              onChange={handeChange}
              name="dateOfLeave"
              value={inputs.dateOfLeave}
              margin="auto"
              variant="outlined"
            ></TextField>
            <InputLabel sx={labelStyles}>username</InputLabel>
            <TextField
              onChange={handeChange}
              name="name"
              value={inputs.name}
              margin="auto"
              variant="outlined"
            ></TextField>
            <InputLabel sx={labelStyles}>password</InputLabel>
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
export default EditEmployee;
