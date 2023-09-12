import React, { useContext } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { EditFormContext } from '../../context/EditContext';


export default function Step2Form () {
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
      BRIDEGROOM
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          id="fullName1"
          name="fullName1"
          value={formData2.fullName1}
          onChange={handleInputChange}
          label="Full Name"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          required
          id="father1"
          name="father1"
          value={formData2.father1}
          onChange={handleInputChange}
          label="Father's Name"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          required
          id="mother1"
          name="mother1"
          value={formData2.mother1}
          onChange={handleInputChange}
          label="Mother's Name"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="dob1"
          name="dob1"
          value={formData2.dob1}
          onChange={handleInputChange}
          label="Date of Birth"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="pob1"
          name="pob1"
          value={formData2.pob1}
          onChange={handleInputChange}
          label="Place of Birth"
          fullWidth
          variant="standard"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          id="marital1"
          name="marital1"
          value={formData2.marital1}
          onChange={handleInputChange}
          label="Marital Status"
          fullWidth
          variant="standard"
          
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          id="address1"
          name="address1"
          value={formData2.address1}
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

 