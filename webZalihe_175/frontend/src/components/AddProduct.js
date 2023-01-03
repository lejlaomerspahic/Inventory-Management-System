import { InputLabel, TextField, Typography, Box } from '@mui/material'
import React from 'react'

function AddProduct() {
  return (
    <div>
      <form>
        <Box>
          <Typography>Post your product</Typography>
          <InputLabel>Name</InputLabel>
          <TextField></TextField>
          <InputLabel>picURL</InputLabel>
          <InputLabel></InputLabel>
          <InputLabel>Price</InputLabel>
          <TextField></TextField>
          <InputLabel>Profit Margin</InputLabel>
          <TextField></TextField>
          <InputLabel>ProductionProcess</InputLabel>
          <TextField></TextField>
        </Box>
      </form>
    </div>
  )
}

export default AddProduct