import React, { useState, useEffect } from "react";
import axios from "axios";
import Materials from "./Materials";

function Material() {
  const [sirovine, setSirovine] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8082/api/sirovine")
      .then((res) => {
        setSirovine(res.data.materials);
        console.log(res.data.materials);
      })
      .catch((err) => {
        console.log(err);
        setSirovine([]);
      });
  };
  useEffect(() => {
    sendRequest();
  }, []);
  console.log(sirovine);
  return (
    <div>
      {sirovine &&
        sirovine.map((sirovine) => (
          <Materials
            name={sirovine.name}
            price={sirovine.price}
            quantity={sirovine.quantity}
            minQuantity={sirovine.minQuantity}
            isUsed={sirovine.isUsed}
            unitOfMeasure={sirovine.unitOfMeasure}
            supplier={sirovine.supplier}
          />
        ))}
    </div>
  );
}

export default Material;
