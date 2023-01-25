import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "./Products";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Product() {
  const [proizvodi, setProizvodi] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8082/api/proizvodi")
      .then((res) => {
        setProizvodi(res.data.products);
      })
      .catch((err) => {
        console.log(err);
        setProizvodi([]);
      });
  };
  useEffect(() => {
    sendRequest();
  }, []);
  console.log(proizvodi);
  return (
    <div>
      <Button
        variant="contained"
        sx={{ marginTop: 3, marginLeft: 3, borderRadius: 10 }}
        color="info"
        LinkComponent={Link}
        to="/proizvodi/dodaj"
      >
        Dodaj proizvod
      </Button>
      {proizvodi &&
        proizvodi.map((proizvod) => (
          <Products
            id={proizvod._id}
            name={proizvod.name}
            picURL={proizvod.picURL}
            price={proizvod.price}
            profitMargin={proizvod.profitMargin}
            productionProcess={proizvod.productionProcess}
          />
        ))}
    </div>
  );
}

export default Product;
