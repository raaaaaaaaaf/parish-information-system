import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
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
} from '../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import _ from 'lodash';
import Loading from '../components/loading/Loading';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [docData, setDocData] = useState(null)
  const [userAmount, setUserAmount] = useState(null);
  const [reqDocAmount, setReqDocAmount] = useState(null);
  const [paidDoc, setPaidDoc] = useState(null);
  const [unPaidDoc, setUnPaidDoc] = useState(null);
  const [loading ,setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {

        const data =[]

        const userDoc = query(collection(db, "users"), where("role", "==", "User"))
        const userSnap = await getDocs(userDoc)

        const reqDoc = query(collection(db, "docsData"))
        const reqSnap = await getDocs(reqDoc)
        reqSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data()
          });
        });

        const paidDoc = query(collection(db, "docsData"), where("isPaid", "==", true))
        const paidSnap = await getDocs(paidDoc);

        const unpaidDoc = query(collection(db, "docsData"), where("isPaid", "==", false))
        const unpaidSnap = await getDocs(unpaidDoc);

        setDocData(data);
        setUserAmount(userSnap.docs.length)
        setReqDocAmount(reqSnap.docs.length)
        setPaidDoc(paidSnap.docs.length);
        setUnPaidDoc(unpaidSnap.docs.length);
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
          Hi, Admin
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Users" total={userAmount} icon={'material-symbols:supervised-user-circle-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Requested Document" total={reqDocAmount} color="info" icon={'vaadin:records'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Paid Document" total={paidDoc} color="warning" icon={'material-symbols:paid-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Unpaid Document" total={unPaidDoc} color="error" icon={'mdi:file-document-delete-outline'} />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
              <AppOrderTimeline
                title="Recent Request Timeline"
                list={sortedDocData.slice(0,5).map((data, index) => ({
                  id: `${data.id}`,
                  title: `${data.userName} - (${data.docName})`,
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
