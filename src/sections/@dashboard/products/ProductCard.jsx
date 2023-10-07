import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import bap from '../../../assets/baptismalcert.jpg'
import bur from '../../../assets/burial.jpg'
import mar from '../../../assets/marriage.jpg'
import Iconify from '../../../components/iconify';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AddFormContext } from '../../../context/AddContext';
import Loading from '../../../components/loading/Loading';
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ docs }) {
  const {id, docName, isPaid, price, docType } = docs;
  const {setDocId} = useContext(AddFormContext)


  return (

      <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {isPaid ? (
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
          >PAID
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
        {docType === 'Baptismal' && (
          isPaid ? (
            <Link to={`pdfbaptismal/${docs.id}`}>
            <StyledProductImg alt='Baptismal' src={bap} />  
            </Link>
          ) : (
            <StyledProductImg alt='Baptismal' src={bap} />  
          )

        )}
        {docType === 'Burial' && (
          isPaid ? (
            <Link to={`pdfburial/${docs.id}`}>
            <StyledProductImg alt='Burial' src={bur} />
            </Link>
          ) : (
            <StyledProductImg alt='Burial' src={bur} />
          )

        )}
        {docType === 'Marriage' && (
          isPaid ? (
            <Link to={`pdfmarriage/${docs.id}`}>
            <StyledProductImg alt='Marriage' src={mar} />
            </Link>
          ) : (
            <StyledProductImg alt='Marriage' src={mar} />
          )
        )}
        
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {docName}
          </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            &nbsp;
            ₱{fCurrency(price)}
          </Typography>
          {isPaid ? (
            <Button disabled color="inherit">
            <Iconify icon={'fluent:payment-48-regular'}/>
            </Button>
          ) : (
            <Link to={'/client/paypal'} style={{ textDecoration: 'none', color: 'black'}}>
            <Button onClick={() => {setDocId(id)}} color="inherit">
            <Iconify icon={'fluent:payment-48-regular'}/>
            </Button>
            </Link>
          )}


          

        </Stack>
      </Stack>
    </Card>

  );
}
