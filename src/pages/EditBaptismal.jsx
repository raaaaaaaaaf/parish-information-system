import React, { useContext } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Step1Form from '../layouts/editBaptismal/Step1Form'
import Step2Form from '../layouts/editBaptismal/Step2Form';
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { EditFormContext } from '../context/EditContext';
import { AuthContext } from '../context/AuthContext';

const steps = ['Information', '  '];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1Form />;
    case 1:
      return <Step2Form />;

    default:
      throw new Error('Unknown step');
  }
}

export default function EditBaptismal() {
  const [activeStep, setActiveStep] = React.useState(0);
  const {currentUser, userData} = useContext(AuthContext)
  const {formData, docId} = useContext(EditFormContext);
  const nav = useNavigate();

  

  const editBaptist = async (id) => {
    try {
      const docsRef = doc(db, "docsData", id)
      const newData = {
        born: formData.born,
        childName: formData.childName,
        church: formData.church,
        dob: formData.dob,
        dobaptized: formData.dobaptized,
        parent1: formData.parent1,
        parent2: formData.parent2,
        rev: formData.rev,
        sponsor1: formData.sponsor1,
        sponsor2: formData.sponsor2,
        sponsor3: formData.sponsor3,
        sponsor4: formData.sponsor4,
        timeStamp: serverTimestamp(),

      }
      await updateDoc(docsRef, newData)

      Swal.fire(
        'Edited!',
        'Information has been edited.',
        'success'
      )
      nav('/dashboard/baptismal')

    } catch(err) {
      console.error(err)
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Edit Baptismal Certificate
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
              {activeStep === steps.length - 1 ? 
              <Button variant="contained"onClick={() => editBaptist(docId)}sx={{ mt: 3, ml: 1 }}> Edit Save </Button>
               : 
              <Button variant="contained"onClick={handleNext}sx={{ mt: 3, ml: 1 }}> Next </Button>}
                
              </Box>
            </React.Fragment>
          )}
        </Paper>
       
      </Container>
    </React.Fragment>
  );
}