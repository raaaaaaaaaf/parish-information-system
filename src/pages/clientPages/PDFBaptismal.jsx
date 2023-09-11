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
    page: {
        fontFamily: 'Oswald',
        padding: 20,
    },
    certificate: {
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    recipientName: {
        fontSize: 18,
        marginTop: 20,
    },
    churchName: {
        fontSize: 25,
    },
    body: {
        justifyContent: "center",
        textDecoration: 'underline',
    },
    date: {
        fontSize: 16,
        marginBottom: 20,
    },
})

const PDFBaptismal = () => {
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
            <Page size="A4" style={styles.page}>
              <View style={styles.certificate}>
                <Text style={styles.title}>Certificate of Baptism</Text>
                <Text style={styles.recipientName}>Church of</Text>
                <Text style={styles.churchName}>{docs.church}</Text>
                <Text style={styles.recipientName}>This is to Certify</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.recipientName}>That {docs.childName}</Text>
                <Text style={styles.date}>has successfully completed the course</Text>
                <Text style={styles.date}><i>"React Development Fundamentals"</i></Text>
              </View>

              
            </Page>
          </Document>
          );
    
          pdf(PDF).toBlob().then((blob) => {
            const url = URL.createObjectURL(blob);
            window.open(url);
          });
        };
    
        // Only generate PDF when pregnancy data is available
        if (docs.id) {
          generatePDF();
          navigate('/client/viewdocs')
        }
      }, [docs]);
    return null;
}

export default PDFBaptismal