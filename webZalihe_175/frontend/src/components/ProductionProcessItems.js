import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ProductionProcessItems = ({ quantity, material }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoggedInAdmin = useSelector((state) => state.isLoggedInAdmin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedInAdmin && !isLoggedIn) {
      navigate(`/`);
    }
  }, []);
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
          <Typography variant="body2" color="text.secondary">
            Kolicina: {quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Material: {material?.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionProcessItems;
