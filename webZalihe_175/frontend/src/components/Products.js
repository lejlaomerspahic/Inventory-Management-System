import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Products=({name,picURL,price}) =>{
  return (
    <div>
        
    <Card sx={{ width: "30%", marginLeft:'20px',mt:2,padding:2,boxShadow:"10px 10px 20px #ccc", ":hover:":{
        boxShadow:"10px 10px 20px #ccc",
    }}}>
      <CardContent>
        <Typography variant="body2" color="text.primary" align='center' fontWeight="bold">
        Naziv proizvoda: {name}
       </Typography>
       </CardContent>

      <CardMedia
        component="img"
        height="194"
        image={picURL}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         Cijena proizvoda: {price} KM
        </Typography>
      </CardContent>
      
    </Card>
    </div>
  )
}

export default Products