import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, pdf, Image, Font, Line } from '@react-pdf/renderer';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import logo from "/assets/logo.png";
import logo1 from "/assets/logo1.png";

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
  top: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftlogo: {
    marginRight: 70,
  },
  rightlogo: {
    marginLeft: 70,
  },
  image: {
    width: 70, // Adjust the width as needed
    height: 70,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 1,
  },

  subtitle: {
    fontSize: 13,
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  date: {
    fontSize: 12,
    textAlign: 'justify',
    marginTop: 40,
    marginBottom: 40,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  utext: {
    margin: 12,
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

const PDFBurial = () => {
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
            <View style={styles.top}>
              <View style={styles.leftlogo}>
                <Image style={styles.image} src={logo}></Image>
              </View>
              <Text style={styles.title}>Death Certificate</Text>

              <View style={styles.rightlogo}>
                <Image style={styles.image} src={logo1}></Image>
              </View>
            </View>
                
                <Text style={styles.subtitle}>Birhen Del Carmen Online Parish Information System </Text>
                <Text style={styles.date}>Date: {new Date(docs.timeStamp.seconds * 1000).toLocaleDateString("en-US")}</Text>
                <Text style={styles.text}>This is to certify that the records show that</Text>
                <Text style={styles.text}>Mr.  /  Miss  /  Mrs.   {docs.fullName}</Text>
                <Text style={styles.text}>Died at {docs.dod}</Text>
                <Text style={styles.text}>Gender: {docs.gender}</Text>
                <Text style={styles.text}>Age: {docs.age}</Text>
                <Text style={styles.text}>Cause of Death: </Text>
                <Text style={styles.utext}>{docs.cod}</Text>
                <View style={styles.columnsContainer}>
                {/* Left Column */}
                <View style={styles.column}>
                <Text style={styles.text}>Occupation:  <Text style={styles.utext}>{docs.occupation}</Text></Text>
                </View>
                {/* Right Column */}
                <View style={styles.column}>
                <Text style={styles.text}> Marital Status:  <Text style={styles.utext}>{docs.marital}</Text></Text>
                </View>
                </View>
                <Text style={styles.text}>We are issuing this certificate on the specific request of {docs.userName} without accepting any </Text>
                <Text style={styles.text}>liability on behalf of this certificate or part of this on our organization.  </Text>
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