import {
  Card,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppWidgetSummary } from "../sections/@dashboard/app";
import { fCurrency } from "../utils/formatNumber";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Scrollbar from "../components/scrollbar/Scrollbar";
import _ from "lodash";

const MonthlyReport = () => {
  const [balance, setBalance] = useState(0);
  const [sales, setSales] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        const dataRef = query(collection(db, "docs_paypal"));
        const dataSnap = await getDocs(dataRef);

        dataSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        const today = new Date();
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );

        const monthlyRef = query(
          collection(db, "docs_paypal"),
          where("timeStamp", ">=", firstDayOfMonth),
          where("timeStamp", "<=", today)
        );

        const monthSnap = await getDocs(monthlyRef);
        const monthDataArray = monthSnap.docs.map((doc) => doc.data());
        const monthTotal = monthDataArray.reduce(
          (acc, item) => acc + item.value,
          0
        );

        const totalSales = data.reduce((acc, item) => acc + item.value, 0);

        // Set the total balance and monthly sales to the states
        setBalance(totalSales);
        setSales(monthTotal);
        setData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const sortedDocData = _.sortBy(data, (data) => data.timeStamp.seconds).reverse();
  return (
    <>
      <Helmet>
        <title>
          Monthly Report | Birhen Del Carmen Online Parish Information System
        </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Montly Report
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary
              title="Total Balance"
              total={`₱${fCurrency(balance)}`}
              color="info"
              icon={"pepicons-pop:peso"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary
              title="Total Sales"
              total={`₱${fCurrency(sales)}`}
              color="info"
              icon={"nimbus:transfer-peso"}
            />
          </Grid>

          <Grid item xs={12}>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name:</TableCell>
                        <TableCell>Description:</TableCell>
                        <TableCell>Value:</TableCell>
                        <TableCell>Date/Time:</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {sortedDocData.map((row) => {
                        const { id, username, description, value, timeStamp } =
                          row;

                        return (
                          <TableRow key={id}>
                            <TableCell>{username}</TableCell>
                            <TableCell>{description}</TableCell>
                            <TableCell>{`₱${fCurrency(value)}`}</TableCell>
                            <TableCell>
                              {new Date(
                                timeStamp.seconds * 1000
                              ).toLocaleString("en-US")}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MonthlyReport;
