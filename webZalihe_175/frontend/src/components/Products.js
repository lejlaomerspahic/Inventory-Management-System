import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
const Products = ({ name, picURL, price, id }) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`proizvodi/${id}`);
  };
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
        <Box display="flex" marginLeft="auto">
          <Button
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="info"
            onClick={handleEdit}
          >
            <IconButton>
              <EditIcon></EditIcon>
            </IconButton>
            Edit
          </Button>
        </Box>
        <CardContent>
          <Typography
            variant="body2"
            color="text.primary"
            align="center"
            fontWeight="bold"
          >
            Naziv proizvoda: {name}
          </Typography>
        </CardContent>

        <CardMedia component="img" height="194" image={picURL} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Cijena proizvoda: {price} KM
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
