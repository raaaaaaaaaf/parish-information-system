import React, { useContext } from 'react'
import { AddFormContext } from '../../context/AddContext';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


export default function Step1Form () {
    const {formData1, setFormData1} = useContext(AddFormContext);
          // Define the handleInputChange function to update formData
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData1((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
  return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
      Deceased Information
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          id="fullName"
          name="fullName"
          value={formData1.fullName}
          onChange={handleInputChange}
          label="Full Name"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          required
          id="dod"
          name="dod"
          value={formData1.dod}
          onChange={handleInputChange}
          label="Date of Death"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="pod"
          name="pod"
          value={formData1.pod}
          onChange={handleInputChange}
          label="Place of Death"
          fullWidth
          variant="standard"
          
        />
      </Grid>
    </Grid>
  </React.Fragment>
  )
}

 