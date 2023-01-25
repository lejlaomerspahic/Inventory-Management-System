import React, { useState, useEffect } from "react";
import axios from "axios";
import Suppliers from "./Suppliers";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Supplier() {
  const [dobavljaci, setDobavljaci] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8082/api/dobavljaci")
      .then((res) => {
        setDobavljaci(res.data.suppliers);
      })
      .catch((err) => {
        console.log(err);
        setDobavljaci([]);
      });
  };
  useEffect(() => {
    sendRequest();
  }, []);
  console.log(dobavljaci);
  return (
    <div>
      <Button
        variant="contained"
        sx={{ marginTop: 3, marginLeft: 3, borderRadius: 10 }}
        color="info"
        LinkComponent={Link}
        to="/dobavljaci/dodaj"
      >
        Dodaj dobavljaca
      </Button>
      {dobavljaci &&
        dobavljaci.map((dobavljaci) => (
          <Suppliers
            id={dobavljaci._id}
            name={dobavljaci.name}
            jib={dobavljaci.jib}
            pdv={dobavljaci.pdv}
            phoneNumber={dobavljaci.phoneNumber}
            contactPerson={dobavljaci.contactPerson}
            email={dobavljaci.email}
            dateOfStart={dobavljaci.dateOfStart}
            dateOfEnd={dobavljaci.dateOfEnd}
            materials={dobavljaci.materials}
          />
        ))}
    </div>
  );
}

export default Supplier;
