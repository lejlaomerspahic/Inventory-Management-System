import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Emploeyees = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  email,
  dateOfJoin,
  dateOfLeave,
  user,
}) => {
  const navigate = useNavigate();
  const isLoggedInAdmin = useSelector((state) => state.isLoggedInAdmin);
  useEffect(() => {
    if (!isLoggedInAdmin) {
      navigate(`/`);
    }
  }, []);

  const handleEdit = (e) => {
    navigate(`/zaposlenici/${id}`);
  };

  return (
    <div>
      <Card
        sx={{
          width: "50%",
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
            Employee: {firstName} {lastName}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Username: {user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Password: {user?.password}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: {phoneNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date Of join {dateOfJoin}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date Of leave: {dateOfLeave}
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

export default Emploeyees;
