import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductionProcesses from "./ProductionProcesses";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ProductionProcess() {
  const navigate = useNavigate();
  const [proizvodniProcesi, setProizvodniProcesi] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8082/api/proizvodniProces")
      .then((res) => {
        setProizvodniProcesi(res.data.productionProcesss);
        console.log(res.data.productionProcesss);
      })
      .catch((err) => {
        console.log(err);
        setProizvodniProcesi([]);
      });
  };
  useEffect(() => {
    sendRequest();
  }, []);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoggedInAdmin = useSelector((state) => state.isLoggedInAdmin);
  useEffect(() => {
    if (!isLoggedInAdmin || !isLoggedIn) {
      navigate(`/`);
    }
  }, []);

  console.log(proizvodniProcesi);
  return (
    <div>
      <Button
        variant="contained"
        sx={{ marginTop: 3, marginLeft: 3, borderRadius: 10 }}
        color="info"
        LinkComponent={Link}
        to="/proizvodniProces/dodaj"
      >
        Dodaj proizvodni proces
      </Button>
      <Button
        variant="contained"
        sx={{ marginTop: 3, marginLeft: 3, borderRadius: 10 }}
        color="info"
        LinkComponent={Link}
        to="/proizvodniProcesStavka"
      >
        Proizvodni proces stavka
      </Button>
      {proizvodniProcesi &&
        proizvodniProcesi.map((proizvodniProces) => (
          <ProductionProcesses
            id={proizvodniProces._id}
            name={proizvodniProces.name}
            startDate={proizvodniProces.startDate}
            endDate={proizvodniProces.endDate}
            price={proizvodniProces.price}
            products={proizvodniProces.products}
            productionProcessItems={proizvodniProces.productionProcessItems}
          />
        ))}
    </div>
  );
}

export default ProductionProcess;
