import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  InputLabel,
  TextField,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditMaterial() {
  const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };
  const [material, setMaterial] = useState({});
  const [supplierList, setSupplierList] = useState([{ name: "", id: "" }]);
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
      .get(`http://localhost:8082/api/sirovine/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data.material1);
    return data;
  };

  useEffect(() => {
    fetch().then((data) => {
      setMaterial(data.material1);
      setInputs({
        name: data.material1.name,
        price: data.material1.price,
        quantity: data.material1.quantity,
        minQuantity: data.material1.minQuantity,
        isUsed: data.material1.isUsed,
        unitOfMeasure: data.material1.unitOfMeasure,
        supplier: data.material1.supplier,
      });
    });
  }, [id]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios
        .get(`http://localhost:8082/api/dobavljaci`)
        .catch((err) => console.log(err));

      const data = await res.data;
      //console.log(data.suppliers);
      setSupplierList(data.suppliers);
      return data;
    };
    fetch();
  }, []);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:8082/api/sirovine/uredi/${id}`, {
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
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/sirovine"));
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
              value={inputs.price}
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
            <Select
              name="supplier"
              onChange={handeChange}
              value={inputs.supplier}
            >
              {supplierList.map((suppliers) => (
                <MenuItem key={suppliers._id} value={suppliers._id}>
                  {suppliers.name}
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
      )}
    </div>
  );
}
export default EditMaterial;
