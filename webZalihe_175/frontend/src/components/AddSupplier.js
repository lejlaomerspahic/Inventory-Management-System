import { InputLabel, TextField, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };
function AddMaterial() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    quantity: "",
    minQuantity: "",
    isUsed: "",
    unitOfMeasure: "",
    supplier: "",
  });

  const handeChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:8082/api/sirovine/dodaj", {
        name: inputs.name,
        price: inputs.price,
        quantity: inputs.quantity,
        minQuantity: inputs.minQuantity,
        isUsed: inputs.isUsed,
        unitOfMeasure: inputs.unitOfMeasure,
        supplier: inputs.supplier,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(() => navigate("/sirovine"))
      .then((data) => console.log(data));
  };
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
            Post material
          </Typography>
          <InputLabel sx={labelStyles}>Name</InputLabel>
          <TextField
            onChange={handeChange}
            name="name"
            value={inputs.name}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Price</InputLabel>
          <TextField
            onChange={handeChange}
            name="picURL"
            value={inputs.picURL}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Quantity</InputLabel>
          <TextField
            onChange={handeChange}
            name="quantity"
            value={inputs.quantity}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Min quantity</InputLabel>
          <TextField
            onChange={handeChange}
            name="minQuantity"
            value={inputs.minQuantity}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Is used</InputLabel>
          <TextField
            onChange={handeChange}
            name="isUsed"
            value={inputs.isUsed}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Unit of measure</InputLabel>
          <TextField
            onChange={handeChange}
            name="unitOfMeasure"
            value={inputs.unitOfMeasure}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Supplier</InputLabel>
          <TextField
            onChange={handeChange}
            name="supplier"
            value={inputs.supplier}
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

export default AddMaterial;
