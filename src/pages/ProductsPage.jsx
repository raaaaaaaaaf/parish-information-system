import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Requested Documents | Birhen Del Carmen Online Parish Information System </title>
      </Helmet>
    
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Requested Documents
        </Typography>
        <ProductList products={PRODUCTS} />
      </Container>
    </>
  );
}
