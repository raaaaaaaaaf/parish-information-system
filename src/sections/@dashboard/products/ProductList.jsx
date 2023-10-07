import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { AddFormContext } from '../../../context/AddContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import Loading from '../../../components/loading/Loading';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ docs, ...other }) {
  const {currentUser} = useContext(AuthContext);
  const [docsList, setDocsList] = useState([])
  const {setDocId} = useContext(AddFormContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        const docsRef = query(collection(db, "docsData"), where("uid", "==", currentUser.uid))
        const docsSnap = await getDocs(docsRef)
        docsSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setDocsList(data)
        console.log(data);
      } catch(err) {
        console.error(err);
      }
    }
    fetchData()
  }, [])
  return (
    <>
    {loading ? (
      <Loading/>
    ) : (
      <Grid container spacing={3} {...other}>
      {docsList.map((docs, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <ShopProductCard docs={docs} />
        </Grid>
      ))}
    </Grid>
    )}

    </>

  );
}
