import React, { useContext, useState } from 'react'
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
import Swal from 'sweetalert2';
import Step1Form from '../../layouts/reqMarriage/Step1Form';
import { AuthContext } from '../../context/AuthContext';
import { AddFormContext } from '../../context/AddContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';



const steps = ['Couple Information'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1Form />;

    default:
      throw new Error('Unknown step');
  }
}

export default function ReqMarriage () {
    const [activeStep, setActiveStep] = useState(0);
    const {currentUser, userData} = useContext(AuthContext);
    const {formData2} = useContext(AddFormContext)
    const nav = useNavigate();

    const docsRef = collection(db, "docsData")

    const addMarriage = async () => {
        try {
            await addDoc(docsRef, {
                address: formData2.address,
                dom: formData2.dom,
                husband: formData2.husband,
                pom: formData2.pom,
                wife: formData2.wife,
                docName: formData2.docName,
                isPaid: formData2.isPaid,
                userName: userData.displayName,
                uid : currentUser.uid,
                price: formData2.price,
                timeStamp: serverTimestamp(),
                docType: "Marriage",
            })

            Swal.fire(
                'Requested!',
                'Information has been requested.',
                'success'
              )
              nav('/client/viewdocs')

        } catch(err) {
            conslore.error(err)
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
                  <Button variant="contained" onClick={addMarriage} sx={{ mt: 3, ml: 1 }}> Request </Button>
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

