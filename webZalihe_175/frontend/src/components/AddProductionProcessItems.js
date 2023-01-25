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
function AddProductionProcessItems() {
  const navigate = useNavigate();
  const [materialList, setMaterialList] = useState([{ name: "", id: "" }]);
  const [productionProcessList, setProductionProcessList] = useState([
    { name: "", id: "" },
  ]);
  const [inputs, setInputs] = useState({
    quantity: "",
    material: "",
    productionProcesses: "",
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
        "http://localhost:8082/api/ProizvodniProcesStavka/dodaj",
        inputs
      );
      const productionProcessItems = res.data;
      console.log(productionProcessItems);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(() => navigate("/proizvodniProces"))
      .then((data) => console.log(data));
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios
        .get(`http://localhost:8082/api/sirovine`)
        .catch((err) => console.log(err));

      const data = await res.data;
      setMaterialList(data.materials);
      return data;
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios
        .get(`http://localhost:8082/api/proizvodniProces`)
        .catch((err) => console.log(err));

      const data = await res.data;
      setProductionProcessList(data.productionProcesss);
      return data;
    };
    fetch();
  }, []);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoggedInAdmin = useSelector((state) => state.isLoggedInAdmin);
  useEffect(() => {
    if (!isLoggedInAdmin || !isLoggedIn) {
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
            Post production process item
          </Typography>
          <InputLabel sx={labelStyles}>Quantity</InputLabel>
          <TextField
            onChange={handeChange}
            name="quantity"
            value={inputs.quantity}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Material</InputLabel>
          <Select
            name="material"
            onChange={handeChange}
            value={inputs.material}
          >
            {materialList.map((material) => (
              <MenuItem key={material._id} value={material._id}>
                {material?.name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel sx={labelStyles}>Production process</InputLabel>
          <Select
            name="productionProcesses"
            onChange={handeChange}
            value={inputs.productionProcesses}
          >
            {productionProcessList.map((productionProcess) => (
              <MenuItem
                key={productionProcess._id}
                value={productionProcess._id}
              >
                {productionProcess?.name}
              </MenuItem>
            ))}
          </Select>
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

export default AddProductionProcessItems;
