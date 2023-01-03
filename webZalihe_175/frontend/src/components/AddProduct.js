import { InputLabel, TextField, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };
function AddProduct() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    picURL: "",
    price: "",
    profitMargin: "",
    productionProcess: "",
  });

  const handeChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:8082/api/proizvodi/dodaj", {
        name: inputs.name,
        picURL: inputs.picURL,
        price: inputs.price,
        profitMargin: inputs.profitMargin,
        productionProcess: inputs.productionProcess,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(() => navigate("/proizvodi"))
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
            Post your product
          </Typography>
          <InputLabel sx={labelStyles}>Name</InputLabel>
          <TextField
            onChange={handeChange}
            name="name"
            value={inputs.name}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>picURL</InputLabel>
          <TextField
            onChange={handeChange}
            name="picURL"
            value={inputs.picURL}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Price</InputLabel>
          <TextField
            onChange={handeChange}
            name="price"
            value={inputs.price}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Profit Margin</InputLabel>
          <TextField
            onChange={handeChange}
            name="profitMargin"
            value={inputs.profitMargin}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>ProductionProcess</InputLabel>
          <TextField
            onChange={handeChange}
            name="productionProcess"
            value={inputs.productionProcess}
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

export default AddProduct;
