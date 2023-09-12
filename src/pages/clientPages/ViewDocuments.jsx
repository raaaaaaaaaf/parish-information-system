
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { filter } from 'lodash';
import Label from '../../components/label/Label';
import { fCurrency } from '../../utils/formatNumber';
import PayPal from './PayPal';
import { Link } from 'react-router-dom';
import { AddFormContext } from '../../context/AddContext';
import bap from '../../assets/baptismalcert.jpg'
import bur from '../../assets/burial.jpg'
import mar from '../../assets/marriage.jpg'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ViewDocuments() {
    const {currentUser} = useContext(AuthContext)
    const [docsList, setDocsList] = useState([])
    const {docId, setDocId} = useContext(AddFormContext)

    useEffect(() => {
        const fetchData = async () => {
          try {

            const data = [];
            
            const docsRef = query(collection(db, "docsData"), where("uid", "==", currentUser.uid));
            const docsSnap = await getDocs(docsRef);
            docsSnap.forEach((doc) => {
              // doc.data() returns the document's data
              data.push({
                id: doc.id,
                ...doc.data()
              });
            });
    
            // Set the data in the state
            setDocsList(data);
            console.log(data)
          } catch (err) {
            console.error(err);
          }
        }
    
        fetchData();
      }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {docsList.map((docs, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
            
                <Box sx={{ position: 'relative' }}>
                {docs.isPaid ? (
                    <Label
                    variant="filled"
                    color={'success'}
                    sx={{
                    zIndex: 9,
                    top: 16,
                    right: 16,
                    position: 'absolute',
                    textTransform: 'uppercase',
                    }}
                    >
                        PAID
                    </Label>
                ) : (
                    <Label
                    variant="filled"
                    color={'error'}
                    sx={{
                    zIndex: 9,
                    top: 16,
                    right: 16,
                    position: 'absolute',
                    textTransform: 'uppercase',
                    }}
                    >
                        UNPAID
                    </Label>
                )}
                  {docs.docType === "Baptismal" && (
                    
                  <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image={bap}
                />
                  )}

                  {docs.docType === "Burial" && (
                    
                    <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={bur}
                  />
                    )}

                  {docs.docType === "Marriage" && (
                    
                    <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={mar}
                  />
                    )}

                </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {docs.docName}
                    </Typography>
                    <Typography>
                    ₱{docs.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {docs.isPaid ? (
                        <>
                        {docs.docType === "Baptismal" && (
                          <Link to={`pdfbaptismal/${docs.id}`}>
                            <Button size="small">View Baptismal</Button>
                          </Link>
                        )}
                        {docs.docType === "Burial" && (
                          <Link to={`pdfburial/${docs.id}`}>
                            <Button size="small">View Burial</Button>
                          </Link>
                        )}
                        {docs.docType === "Marriage" && (
                          <Link to={`pdfmarriage/${docs.id}`}>
                            <Button size="small">View Marriage</Button>
                          </Link>
                        )}
  
                        <Button size="small" disabled>PAID</Button>
                        </>
   
                    ) : (
                        <>
                        <Button size="small" disabled>View</Button>
                        <Link to={'/client/paypal'}>
                        <Button size="small" onClick={() => {setDocId(docs.id)}}>PAY</Button>
                        </Link>
                        </>
                        
                    )}
                    
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}