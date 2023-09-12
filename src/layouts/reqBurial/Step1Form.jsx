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
      <Grid item xs={12} >
        <TextField
          required
          id="gender"
          name="gender"
          value={formData1.gender}
          onChange={handleInputChange}
          label="Gender"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          required
          id="age"
          name="age"
          value={formData1.age}
          onChange={handleInputChange}
          label="Age"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="cod"
          name="cod"
          value={formData1.cod}
          onChange={handleInputChange}
          label="Cause of Death"
          fullWidth
          variant="standard"
          
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="occupation"
          name="occupation"
          value={formData1.occupation}
          onChange={handleInputChange}
          label="Occupation"
          fullWidth
          variant="standard"
          
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="marital"
          name="marital"
          value={formData1.marital}
          onChange={handleInputChange}
          label="Marital Status"
          fullWidth
          variant="standard"
          
        />
      </Grid>
    </Grid>
  </React.Fragment>
  )
}

 