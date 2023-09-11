import React, { useContext } from 'react'
import { AddFormContext } from '../../context/AddContext';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


export default function Step1Form () {
    const {formData2, setFormData2} = useContext(AddFormContext);
          // Define the handleInputChange function to update formData
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData2((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
  return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
      Couple's Information
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          id="husband"
          name="husband"
          value={formData2.husband}
          onChange={handleInputChange}
          label="Husband"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          required
          id="wife"
          name="wife"
          value={formData2.wife}
          onChange={handleInputChange}
          label="Wife"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="dom"
          name="dom"
          value={formData2.dom}
          onChange={handleInputChange}
          label="Date of Marriage"
          fullWidth
          variant="standard"
          
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="pom"
          name="pom"
          value={formData2.pom}
          onChange={handleInputChange}
          label="Place of Marriage"
          fullWidth
          variant="standard"
          
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address"
          name="address"
          value={formData2.address}
          onChange={handleInputChange}
          label="Complete Address"
          fullWidth
          variant="standard"
          
        />
      </Grid>
    </Grid>
  </React.Fragment>
  )
}

 