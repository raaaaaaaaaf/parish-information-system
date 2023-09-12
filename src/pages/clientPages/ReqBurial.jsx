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
import Step1Form from '../../layouts/reqBurial/Step1Form'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { AddFormContext } from '../../context/AddContext';
import { db } from '../../firebase/firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const steps = ['Information'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1Form />;

    default:
      throw new Error('Unknown step');
  }
}

export default function ReqBurial ()  {
    const [activeStep, setActiveStep] = React.useState(0);
    const {userData, currentUser} = useContext(AuthContext)
    const {formData1} = useContext(AddFormContext)
    const nav = useNavigate();

    const docsRef = collection(db, "docsData")

    const addBurial = async () => {
        try {
            await addDoc(docsRef, {
                
                age: formData1.age,
                cod: formData1.cod,
                dod: formData1.dod,
                fullName: formData1.fullName,
                gender: formData1.gender,
                marital: formData1.marital,
                occupation: formData1.occupation,
                userName: userData.displayName,
                docName: formData1.docName,
                isPaid: formData1.isPaid,
                uid : currentUser.uid,
                price: formData1.price,
                timeStamp: serverTimestamp(),
                docType: formData1.docType,
            })

            Swal.fire(
                'Requested!',
                'Information has been requested.',
                'success'
              )
              nav('/client/viewdocs')

        } catch(err) {
            console.error(err);
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
                Request Burial Certificate
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
                  <Button variant="contained"onClick={addBurial} sx={{ mt: 3, ml: 1 }}> Request </Button>
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

