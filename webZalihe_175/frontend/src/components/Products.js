import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Products = ({
  name,
  picURL,
  price,
  id,
  productionProcess,
  profitMargin,
}) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/proizvodi/${id}`);
  };

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoggedInAdmin = useSelector((state) => state.isLoggedInAdmin);
  useEffect(() => {
    if (!isLoggedIn && !isLoggedInAdmin) {
      navigate(`/`);
    }
  }, []);

  return (
    <div>
      <Card
        sx={{
          width: "30%",
          margin: "auto",
          mt: 2,
          padding: 2,
          justifyContent: "center",
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
            Name: {name}
          </Typography>
        </CardContent>
        <CardMedia component="img" height="194" image={picURL} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Price: {price} KM{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Profit margin: {profitMargin}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Production process: {productionProcess?.name}
          </Typography>
        </CardContent>
        <Box display="flex" marginLeft="auto">
          <Button
            align="center"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="info"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default Products;
