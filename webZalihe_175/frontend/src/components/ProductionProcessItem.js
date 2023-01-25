import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductionProcessItems from "./ProductionProcessItems";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function ProductionProcess() {
  const [proizvodniProcesStavka, setProizvodniProcesStavka] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8082/api/proizvodniProcesStavka")
      .then((res) => {
        setProizvodniProcesStavka(res.data.productionProcessItems);
        console.log(res.data.productionProcessItems);
      })
      .catch((err) => {
        console.log(err);
        setProizvodniProcesStavka([]);
      });
  };
  useEffect(() => {
    sendRequest();
  }, []);
  console.log(proizvodniProcesStavka);
  return (
    <div>
      <Button
        variant="contained"
        sx={{ marginTop: 3, marginLeft: 3, borderRadius: 10 }}
        color="info"
        LinkComponent={Link}
        to="/proizvodniProcesStavka/dodaj"
      >
        Dodaj proizvodnu proces stavku
      </Button>
      {proizvodniProcesStavka &&
        proizvodniProcesStavka.map((proizvodniProcesStavke) => (
          <ProductionProcessItems
            id={proizvodniProcesStavke._id}
            quantity={proizvodniProcesStavke.quantity}
            material={proizvodniProcesStavke.material}
            productionProcesses={proizvodniProcesStavke.productionProcesses}
          />
        ))}
    </div>
  );
}

export default ProductionProcess;
