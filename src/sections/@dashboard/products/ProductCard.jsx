import PropTypes from "prop-types";
// @mui
import { Box, Card, Typography, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../../components/label";
import { ColorPreview } from "../../../components/color-utils";
import bap from "../../../assets/baptismalcert.jpg";
import bur from "../../../assets/burial.jpg";
import mar from "../../../assets/marriage.jpg";
import Iconify from "../../../components/iconify";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AddFormContext } from "../../../context/AddContext";
import Loading from "../../../components/loading/Loading";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";
// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ docs }) {
  const { id, docName, isPaid, price, docType } = docs;
  const { currentUser } = useContext(AuthContext);
  const [showPayPalButton, setShowPayPalButton] = useState(false);
  const navigate = useNavigate()

  const handlePayClick = () => {
    setShowPayPalButton(true);
  };

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {isPaid ? (
          <Label
            variant="filled"
            color={"success"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            PAID
          </Label>
        ) : (
          <Label
            variant="filled"
            color={"error"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            UNPAID
          </Label>
        )}
        {docType === "Baptismal" &&
          (isPaid ? (
            <Link to={`pdfbaptismal/${docs.id}`}>
              <StyledProductImg alt="Baptismal" src={bap} />
            </Link>
          ) : (
            <StyledProductImg alt="Baptismal" src={bap} />
          ))}
        {docType === "Burial" &&
          (isPaid ? (
            <Link to={`pdfburial/${docs.id}`}>
              <StyledProductImg alt="Burial" src={bur} />
            </Link>
          ) : (
            <StyledProductImg alt="Burial" src={bur} />
          ))}
        {docType === "Marriage" &&
          (isPaid ? (
            <Link to={`pdfmarriage/${docs.id}`}>
              <StyledProductImg alt="Marriage" src={mar} />
            </Link>
          ) : (
            <StyledProductImg alt="Marriage" src={mar} />
          ))}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {docName}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            &nbsp; ₱{fCurrency(price)}
          </Typography>
          {isPaid ? (
            <Button disabled color="inherit">
              <Iconify icon={"fluent:payment-48-regular"} />
            </Button>
          ) : (
            <Button onClick={handlePayClick} color="inherit">
              <Iconify icon={"fluent:payment-48-regular"} />
            </Button>
          )}

        </Stack>
      </Stack>
      
      {showPayPalButton && (
            <PayPalScriptProvider
              options={{
                "client-id":
                  "EM_5fPjeYEoW5izPQSAC8nJ_RoZeRwq6lzaIMd1VXIIXN5KhQHkAnG37vw_uoqxWayFEzwPqyDVddu6L",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Documents",
                            amount: {
                                currency_code: "PHP",
                                value: 120.00
                            }
                        }
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  // Capture the payment
                  const order = await actions.order.capture();
    
                  // Update the Firebase document with the payment details
                  const docRef = doc(db, 'docsData', docs.id);
                  const paypalRef = collection(db, 'docs_paypal')
                  const paypalData = {
                    order: order,
                    username: currentUser.displayName,
                    value: 120.00,
                    description: "certificates",
                    timeStamp: serverTimestamp()
                  }


                  await updateDoc(docRef, {isPaid: true})
                  await addDoc(paypalRef, paypalData)
                  navigate('/client/viewdocs')
                  console.log("Payment completed successfully", order);
                }}
              />
            </PayPalScriptProvider>
          )}
    </Card>
  );
}
