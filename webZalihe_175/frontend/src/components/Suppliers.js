import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Suppliers = ({
  name,
  jib,
  pdv,
  phoneNumber,
  contactPerson,
  email,
  dateOfStart,
  dateOfEnd,
  materials,
  id,
}) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/dobavljaci/${id}`);
  };

  return (
    <div>
      <Card
        sx={{
          width: "30%",
          marginLeft: "20px",
          mt: 2,
          padding: 2,
          boxShadow: "10px 10px 20px #ccc",
          ":hover:": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            color="text.primary"
            align="center"
            fontWeight="bold"
          >
            Naziv dobavljaca: {name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Jedinstveni identifikacioni broj: {jib}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            PDV broj: {pdv}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Broj telefona: {phoneNumber}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Email adresa: {email}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Kontakt osoba: {contactPerson}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Datum pocetka: {dateOfStart}
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: 2, borderRadius: 10 }}
            color="info"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Suppliers;
