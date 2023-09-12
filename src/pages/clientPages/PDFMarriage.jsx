import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, pdf, Image, Font, Line } from '@react-pdf/renderer';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 40,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },  

    subtitle: {
      fontSize: 20,
      marginBottom: 40,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    subtitle1: {
      fontSize: 20,
      margin: 12,
      textAlign: 'justify',
      fontFamily: 'Oswald'
    },
    text: {
      margin: 8,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
      
    },
    utext: {
      margin: 8,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
      textDecoration: 'underline'
    },

    columnsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      width: '50%', // Adjust the width as needed
    },
    footer: {
      fontSize: 8,
      marginTop: 40,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
  })

const PDFMarriage = () => {
    const [docs, setDocs] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const docsRef = doc(db, "docsData", id);

        const fetchData = async () => {
            try {

                const docSnap = await getDoc(docsRef)
                if (docSnap.exists()) {
                    setDocs({...docSnap.data(), id: docSnap.id})
                } else {
                    setDocs({});
                }
            } catch(err) {
                console.error(err)
            }
        }
     fetchData()
    }, [id])

    useEffect(() => {
        // Once pregnancy data is fetched, generate and display the PDF
        const generatePDF = () => {
          const PDF = (
            <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.title}>Marriage Contract</Text>
                <Text style={styles.subtitle}>An Agreement in the making of a Marriage </Text>

                <Text style={styles.text}>This agreement made on the  <Text style={styles.utext}>   {new Date(docs.timeStamp.seconds * 1000).toLocaleDateString("en-US")}  </Text>  CE; 
                corresponding to the  <Text style={styles.utext}>  {new Date(docs.timeStamp.seconds * 1000).toLocaleDateString("en-US")}  </Text>  AH;
                Between  <Text style={styles.utext}>   {docs.fullName}    </Text>    and     <Text style={styles.utext}>   {docs.fullName1}    </Text>.</Text>
                
                <Text style={styles.subtitle1}>I. BRIDE</Text>
                <Text style={styles.text}>Full Name:      <Text style={styles.utext}>     {docs.fullName}    </Text></Text>
                <Text style={styles.text}>Father's Name:      <Text style={styles.utext}>     {docs.father}    </Text></Text>
                <Text style={styles.text}>Mother's Name:      <Text style={styles.utext}>     {docs.mother}    </Text></Text>
                <Text style={styles.text}>Date of Birth:      <Text style={styles.utext}>     {docs.dob}    </Text></Text>
                <Text style={styles.text}>Place of Birth:      <Text style={styles.utext}>     {docs.pob}    </Text></Text>
                <Text style={styles.text}>Marital Status:      <Text style={styles.utext}>     {docs.marital}    </Text></Text>
                <Text style={styles.text}>Address:      <Text style={styles.utext}>     {docs.address}    </Text></Text>

                <Text style={styles.subtitle1}>II. BRIDEGROOM</Text>
                <Text style={styles.text}>Full Name:      <Text style={styles.utext}>     {docs.fullName1}    </Text></Text>
                <Text style={styles.text}>Father's Name:      <Text style={styles.utext}>     {docs.father1}    </Text></Text>
                <Text style={styles.text}>Mother's Name:      <Text style={styles.utext}>     {docs.mother1}    </Text></Text>
                <Text style={styles.text}>Date of Birth:      <Text style={styles.utext}>     {docs.dob1}    </Text></Text>
                <Text style={styles.text}>Place of Birth:      <Text style={styles.utext}>     {docs.pob1}    </Text></Text>
                <Text style={styles.text}>Marital Status:      <Text style={styles.utext}>     {docs.marital1}    </Text></Text>
                <Text style={styles.text}>Address:      <Text style={styles.utext}>     {docs.address1}    </Text></Text>
                <Text style={styles.footer} fixed>~ System generated document ~</Text>
            </Page>
            </Document>
          );
    
          pdf(PDF).toBlob().then((blob) => {
            const url = URL.createObjectURL(blob);
            window.open(url);
          });
        };
    
        // Only generate PDF when docs data is available
        if (docs.id) {
          generatePDF();
          navigate('/client/viewdocs')
        }
      }, [docs]);
    return null;
}

export default PDFMarriage