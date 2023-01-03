import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const Materials=({name, jib, pdv,phoneNumber, contactPerson, email, dateOfStart, dateOfEnd,materials}) =>{
  return (
    <div>
        
    <Card sx={{ width: "30%", marginLeft:'20px',mt:2,padding:2,boxShadow:"10px 10px 20px #ccc", ":hover:":{
        boxShadow:"10px 10px 20px #ccc",
    }}}>
      <CardContent>
        <Typography variant="body2" color="text.primary" align='center' fontWeight="bold">
        Naziv dobavljaca: {name}
       </Typography>
       </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         Jedinstveni identifikacioni broj: {jib} KM
         PDV broj: {pdv}
         Broj telefona: {phoneNumber}
         Email adresa: {email}
         Kontakt osoba: {contactPerson}
         Datum pocetka: {dateOfStart}
        </Typography>
      </CardContent>
      
    </Card>
    </div>
  )
}

export default Materials