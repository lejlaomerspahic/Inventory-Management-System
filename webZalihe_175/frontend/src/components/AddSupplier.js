import {
  InputLabel,
  TextField,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };
function AddSupplier() {
  const navigate = useNavigate();
  const [materialsList, setMaterialsList] = useState([{ name: "", id: "" }]);
  const [inputs, setInputs] = useState({
    name: "",
    jib: "",
    pdv: "",
    phoneNumber: "",
    contactPerson: "",
    email: "",
    dateOfStart: "",
    dateOfEnd: "",
  });

  const handeChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8082/api/dobavljaci/dodaj",
        inputs
      );
      const product = res.data;
      console.log(product);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(() => navigate("/dobavljaci"))
      .then((data) => console.log(data));
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios
        .get(`http://localhost:8082/api/sirovine`)
        .catch((err) => console.log(err));

      const data = await res.data;
      setMaterialsList(data.materials);
      return data;
    };
    fetch();
  }, []);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoggedInAdmin = useSelector((state) => state.isLoggedInAdmin);
  useEffect(() => {
    if (!isLoggedInAdmin && !isLoggedIn) {
      navigate(`/`);
    }
  }, []);

  return (
    <div>
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
            Post supplier
          </Typography>
          <InputLabel sx={labelStyles}>Name</InputLabel>
          <TextField
            onChange={handeChange}
            name="name"
            value={inputs.name}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>jib</InputLabel>
          <TextField
            onChange={handeChange}
            name="jib"
            value={inputs.jib}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>pdv</InputLabel>
          <TextField
            onChange={handeChange}
            name="pdv"
            value={inputs.pdv}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Phone Number</InputLabel>
          <TextField
            onChange={handeChange}
            name="phoneNumber"
            value={inputs.phoneNumber}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Contact person</InputLabel>
          <TextField
            onChange={handeChange}
            name="contactPerson"
            value={inputs.contactPerson}
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
          <InputLabel sx={labelStyles}>Date Of Start</InputLabel>
          <TextField
            onChange={handeChange}
            name="dateOfStart"
            value={inputs.dateOfStart}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Date Of End</InputLabel>
          <TextField
            onChange={handeChange}
            name="dateOfEnd"
            value={inputs.dateOfEnd}
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

export default AddSupplier;
