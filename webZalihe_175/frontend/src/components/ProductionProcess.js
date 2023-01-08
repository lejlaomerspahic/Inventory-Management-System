import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductionProcesses from "./ProductionProcesses";

function ProductionProcess() {
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
  console.log(proizvodniProcesi);
  return (
    <div>
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
