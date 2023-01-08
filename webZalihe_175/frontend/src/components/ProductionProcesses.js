import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const ProductionProcess = ({ name, startDate, endDate, price }) => {
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
            Naziv: {name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Start date: {startDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            End date: {endDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {price} KM
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionProcess;