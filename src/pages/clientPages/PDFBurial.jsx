import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, pdf, Image, Font, Line } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Oswald',
        padding: 40,
      },
      top : {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        width: '40%',
      },
      author: {
        fontSize: 14,
        textAlign: "center",
        width: '20%',
      },
      footer: {
        fontSize: 8,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
      },
})

const PDFBurial = () => {
    const [docs, setDocs] = useState({});
    const {id} = useParams();

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
                  <View style={styles.top}>
                    {/* <View style={styles.leftlogo}>
                      <Image style={styles.image} src={logo}></Image>
                    </View> */}
                    <Text style={styles.title}></Text>
                    <Text style={styles.author}>{docs.docName}</Text>
                    {/* <View style={styles.rightlogo}>
                      <Image style={styles.image} src={logo}></Image>
                    </View> */}
                  
                  </View>

                    <Text style={styles.footer} fixed>~ System generated document ~</Text>
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

export default PDFBurial