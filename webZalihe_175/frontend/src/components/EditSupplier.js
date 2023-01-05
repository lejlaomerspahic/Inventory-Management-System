import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputLabel, TextField, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditSupplier() {
  const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };
  const [supplier, setSupplier] = useState({});
  const id = useParams().id;
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
      .get(`http://localhost:8082/api/dobavljaci/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data.supplier1);
    return data;
  };

  useEffect(() => {
    fetch().then((data) => {
      setSupplier(data.supplier1);
      setInputs({
        name: data.supplier1.name,
        jib: data.supplier1.jib,
        pdv: data.supplier1.pdv,
        phoneNumber: data.supplier1.phoneNumber,
        contactPerson: data.supplier1.contactPerson,
        email: data.supplier1.email,
        dateOfStart: data.supplier1.dateOfStart,
        dateOfEnd: data.supplier1.dateOfEnd,
        suppliers: data.supplier1.suppliers,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:8082/api/dobavljaci/uredi/${id}`, {
        name: inputs.name,
        jib: inputs.jib,
        pdv: inputs.pdv,
        phoneNumber: inputs.phoneNumber,
        contactPerson: inputs.contactPerson,
        email: inputs.email,
        dateOfStart: inputs.dateOfStart,
        dateOfEnd: inputs.dateOfEnd,
        materials: inputs.materials,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/dobavljaci"));
  };

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
              Edit supplier
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
            <InputLabel sx={labelStyles}>Date Of Start</InputLabel>
            <TextField
              onChange={handeChange}
              name="dateOfStart"
              value={inputs.dateOfStart}
              margin="auto"
              variant="outlined"
            ></TextField>
            <InputLabel sx={labelStyles}>Materials</InputLabel>
            <TextField
              onChange={handeChange}
              name="materials"
              value={inputs.materials}
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
export default EditSupplier;
