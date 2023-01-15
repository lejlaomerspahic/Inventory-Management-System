import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Emploeyees from "./Employees";

function Emploeyee() {
  const [zaposlenici, setZaposlenici] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8082/api/zaposlenici")
      .then((res) => {
        setZaposlenici(res.data.employees);
      })
      .catch((err) => {
        console.log(err);
        setZaposlenici([]);
      });
  };
  useEffect(() => {
    sendRequest();
  }, []);
  console.log(zaposlenici);
  return (
    <div>
      <Button
        variant="contained"
        sx={{ marginTop: 3, marginLeft: 3, borderRadius: 10 }}
        color="info"
        LinkComponent={Link}
        to="/zaposlenici/dodaj"
      >
        Dodaj zaposlenika
      </Button>
      {zaposlenici &&
        zaposlenici.map((zaposlenik) => (
          <Emploeyees
            id={zaposlenik._id}
            firstName={zaposlenik.firstName}
            lastName={zaposlenik.lastName}
            phoneNumber={zaposlenik.phoneNumber}
            email={zaposlenik.email}
            dateOfJoin={zaposlenik.dateOfJoin}
            dateOfLeave={zaposlenik.dateOfLeave}
            user={zaposlenik.user}
          />
        ))}
    </div>
  );
}

export default Emploeyee;
