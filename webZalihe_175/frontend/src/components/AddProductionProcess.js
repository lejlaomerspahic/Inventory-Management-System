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
function AddProductionProcess() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([{ name: "", id: "" }]);
  const [productionProcessItemsList, setProductionProcessItemsList] = useState([
    { name: "", id: "" },
  ]);
  const [inputs, setInputs] = useState({
    name: "",
    startDate: "",
    endDate: "",
    productionProcessItems: "",
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
        "http://localhost:8082/api/proizvodniProces/dodaj",
        inputs
      );
      const productionProcess = res.data;
      console.log(productionProcess);
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
        .get(`http://localhost:8082/api/proizvodi`)
        .catch((err) => console.log(err));

      const data = await res.data;
      setProductList(data.products);
      console.log(data.products);
      return data;
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios
        .get(`http://localhost:8082/api/proizvodniProcesStavka`)
        .catch((err) => console.log(err));

      const data = await res.data;
      setProductionProcessItemsList(data.productionProcessItems);
      console.log(data.productionProcessItems);
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
            Post production process
          </Typography>
          <InputLabel sx={labelStyles}>Name</InputLabel>
          <TextField
            onChange={handeChange}
            name="name"
            value={inputs.name}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>Start Date</InputLabel>
          <TextField
            onChange={handeChange}
            name="startDate"
            value={inputs.startDate}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>End Date</InputLabel>
          <TextField
            onChange={handeChange}
            name="endDate"
            value={inputs.endDate}
            margin="auto"
            variant="outlined"
          ></TextField>
          <InputLabel sx={labelStyles}>
            Production process item [material]
          </InputLabel>
          <Select
            name="productionProcessItems"
            onChange={handeChange}
            value={inputs.productionProcessItems}
          >
            {productionProcessItemsList.map((productionProcessItem) => (
              <MenuItem
                key={productionProcessItem._id}
                value={productionProcessItem._id}
              >
                {productionProcessItem.material?.name}
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

export default AddProductionProcess;
