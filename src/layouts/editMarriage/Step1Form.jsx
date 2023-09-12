import React, { useContext } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { EditFormContext } from '../../context/EditContext';


export default function Step1Form () {
    const {formData2, setFormData2} = useContext(EditFormContext);
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
      BRIDE
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          id="fullName"
          name="fullName"
          value={formData2.fullName}
          onChange={handleInputChange}
          label="Full Name"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          required
          id="father"
          name="father"
          value={formData2.father}
          onChange={handleInputChange}
          label="Father's Name"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          required
          id="mother"
          name="mother"
          value={formData2.mother}
          onChange={handleInputChange}
          label="Mother's Name"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="dob"
          name="dob"
          value={formData2.dob}
          onChange={handleInputChange}
          label="Date of Birth"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="pob"
          name="pob"
          value={formData2.pob}
          onChange={handleInputChange}
          label="Place of Birth"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="marital"
          name="marital"
          value={formData2.marital}
          onChange={handleInputChange}
          label="Marital Status"
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

 