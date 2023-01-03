import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Materials = ({
  name,
  quantity,
  price,
  minQuantity,
  isUsed,
  unitOfMeasure,
  supplier,
}) => {
  console.log(supplier);
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
            Naziv sirovine: {name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Cijena proizvoda: {price} KM Kolicina: {quantity}
            Minimalna kolicina: {minQuantity}
            Jedinica mjere: {unitOfMeasure}
            Dobavljac: {supplier?.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Materials;
