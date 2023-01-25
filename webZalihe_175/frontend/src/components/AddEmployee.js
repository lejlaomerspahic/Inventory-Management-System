import { InputLabel, TextField, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };

function AddEmployee() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dateOfJoin: "",
    dateOfLeave: "",
    name: "",
    password: "",
  });

  const isLoggedInAdmin = useSelector((state) => state.isLoggedInAdmin);
  useEffect(() => {
    if (!isLoggedInAdmin) {
      navigate(`/`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const employeeRes = await axios.post(
        "http://localhost:8082/api/zaposlenici/dodaj",
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
      const employee = employeeRes.data;
      console.log(employee);
      navigate("/zaposlenici");
      // const userRes = await axios.post(
      //   "http://localhost:8082/api/user/signup",
      //   {
      //     name: inputs.name,
      //     password: inputs.password,
      //     role: "zaposlenik",
      //     employee: employee._id,
      //   }
      // );
      // const user = userRes.data;
      // console.log(employee, user);
    } catch (err) {
      console.log(err);
    }
  };

  const handeChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
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
            Post emoloyee
          </Typography>
          <InputLabel sx={labelStyles}>FirstName</InputLabel>
          <TextField
            onChange={handeChange}
            name="firstName"
            value={inputs.firstName}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>LastName</InputLabel>
          <TextField
            onChange={handeChange}
            name="lastName"
            value={inputs.lastName}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>PhoneNumber</InputLabel>
          <TextField
            onChange={handeChange}
            name="phoneNumber"
            value={inputs.phoneNumber}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Email</InputLabel>
          <TextField
            onChange={handeChange}
            name="email"
            value={inputs.email}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Date of join</InputLabel>
          <TextField
            onChange={handeChange}
            name="dateOfJoin"
            value={inputs.dateOfJoin}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Date of leave</InputLabel>
          <TextField
            onChange={handeChange}
            name="dateOfLeave"
            value={inputs.dateOfLeave}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Username</InputLabel>
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
    </div>
  );
}

export default AddEmployee;
