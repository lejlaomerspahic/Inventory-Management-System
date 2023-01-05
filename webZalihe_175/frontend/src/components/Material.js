import React, { useState, useEffect } from "react";
import axios from "axios";
import Materials from "./Materials";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <Button
        variant="contained"
        sx={{ marginTop: 3, marginLeft: 3, borderRadius: 10 }}
        color="info"
        LinkComponent={Link}
        to="/sirovine/dodaj"
      >
        Dodaj sirovinu
      </Button>
      <Button
        variant="contained"
        sx={{ marginTop: 3, marginLeft: 3, borderRadius: 10 }}
        color="info"
        LinkComponent={Link}
        to="/dobavljaci"
      >
        Pregledaj dobavljace
      </Button>
      {sirovine &&
        sirovine.map((sirovine) => (
          <Materials
            id={sirovine._id}
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
