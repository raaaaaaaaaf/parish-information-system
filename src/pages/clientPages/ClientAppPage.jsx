import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@dashboard/app';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/loading/Loading';
import _ from 'lodash';
import { fShortenNumber } from '../../utils/formatNumber';
function ClientAppPage () {
    const theme = useTheme();
    const [docData, setDocData] = useState(null)
    const [reqDoc , setReqDoc] = useState(null);
    const [paidDoc, setPaidDoc] = useState(null);
    const [unPaidDoc, setUnPaidDoc] = useState(null);
    const [loading, setLoading] = useState(true)
    const {currentUser} = useContext(AuthContext)
    

    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }, [])

    useEffect(() => {
      const fetchData = async () => {
        try {

          const data = [];

          const reqDoc = query(collection(db, "docsData"), where("uid", "==", currentUser.uid));
          const reqDocSnap = await getDocs(reqDoc);
          reqDocSnap.forEach((doc) => {
            data.push({
              id: doc.id,
              ...doc.data()
            });
          });

          const paidDoc = query(collection(db, "docsData"), where("isPaid", "==", true), where("uid", "==", currentUser.uid));
          const paidDocSnap = await getDocs(paidDoc);

          const unPaidDoc = query(collection(db, "docsData"), where("isPaid", "==", false), where("uid", "==", currentUser.uid));
          const unPaidDocSnap = await getDocs(unPaidDoc);

          setDocData(data);
          setReqDoc(reqDocSnap.docs.length)
          setPaidDoc(paidDocSnap.docs.length)
          setUnPaidDoc(unPaidDocSnap.docs.length)

        } catch(err) {
          console.error(err);
        }
      }
      fetchData()
    }, [])
    const sortedDocData = _.sortBy(docData, (data) => data.timeStamp.seconds).reverse();

    return (
      <>
        <Helmet>
          <title> Dashboard | Birhen Del Carmen Online Parish Information System </title>
        </Helmet>

        {loading ? (
          <Loading/>
        ) : (
          <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Client
          </Typography>
  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Requested Document" total={fShortenNumber(reqDoc) } color="warning" icon={'ant-design:android-filled'} />
            </Grid>
  
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Paid Document" total={fShortenNumber(paidDoc) } color="warning" icon={'ant-design:apple-filled'} />
            </Grid>
  
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Unpaid Document" total={fShortenNumber(unPaidDoc) } color="warning" icon={'ant-design:windows-filled'} />
            </Grid>
  {/* 
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
            </Grid> */}



            <Grid item xs={12} md={6} lg={12}>
              <AppOrderTimeline
                title="Request Timeline"
                list={sortedDocData.slice(0,5).map((data, index) => ({
                  id: `${data.id}`,
                  title: `${data.docName}`,
                  type: `order${index + 1}`,
                  time: `${new Date(data.timeStamp.seconds * 1000).toLocaleString("en-US")}`,
                }))}
              />
            </Grid>
          </Grid>
          
        </Container>
        )}
  

      </>
    );
}

export default ClientAppPage