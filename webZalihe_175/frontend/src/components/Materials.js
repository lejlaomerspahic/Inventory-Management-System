import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Materials = ({
  name,
  quantity,
  price,
  minQuantity,
  isUsed,
  unitOfMeasure,
  supplier,
  id,
}) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/sirovine/${id}`);
  };

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoggedInAdmin = useSelector((state) => state.isLoggedInAdmin);
  useEffect(() => {
    if (!isLoggedInAdmin && !isLoggedIn) {
      navigate(`/`);
    }
  }, []);

  return (
    <div sx={{ width: "100%" }}>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Card
          sx={{
            width: "30%",
            height: "230px",
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
              Cijena proizvoda: {price} KM
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Kolicina: {quantity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Minimalna kolicina: {minQuantity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Jedinica mjere: {unitOfMeasure}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dobavljac: {supplier?.name}
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
    </div>
  );
};

export default Materials;
