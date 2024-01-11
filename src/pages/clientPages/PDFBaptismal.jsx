import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, pdf, Image, Font, Line } from '@react-pdf/renderer';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import logo from '/assets/logo.png'
import logo1 from '/assets/logo1.png'

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
  church: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  baptized: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  acc: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  columnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '50%', // Adjust the width as needed
  },
  utext: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: 'black',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Times-Roman',
    textDecoration: 'underline',
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
            <Page size="A4" style={styles.body}>
            <View style={styles.top}>
              <View style={styles.leftlogo}>
                <Image style={styles.image} src={logo}></Image>
              </View>
              <Text style={styles.title}>Certificate of Baptism</Text>

              <View style={styles.rightlogo}>
                <Image style={styles.image} src={logo1}></Image>
              </View>
            </View>
                
                <Text style={styles.author}>Church of</Text>
                <Text style={styles.church}>{docs.church}</Text>
                <Text style={styles.subtitle}>This is to Certify</Text>

                <Text style={styles.text}>That    
                    <Text style={styles.name}>                                        {docs.fullName}                                          </Text>,
                </Text>
                <Text style={styles.text}>Child of  <Text style={styles.name}>                                  Mrs.{docs.parent1}                                  </Text>,</Text>
                <Text style={styles.text}>and <Text style={styles.name}>                                  Mr.{docs.parent2}                                  </Text>,</Text>
                <Text style={styles.text}>Born in <Text style={styles.name}>                                 {docs.born}                                    </Text>,
                </Text>
                <Text style={styles.text}>on the day of <Text style={styles.name}>                                {docs.dob}                                           </Text>,</Text>
                <Text style={styles.text}>was <Text style={styles.baptized}>                                 BAPTIZED </Text></Text>
                
                <Text style={styles.text}>on the day  of <Text style={styles.name}>                                {docs.dobaptized}                                           </Text>, </Text>
                <Text style={styles.acc}>According to the  Rite of the Roman Catholic Church</Text>
                <Text style={styles.text}> by the Rev <Text style={styles.name}>                                Fr.{docs.rev}                                </Text>,</Text>
                <Text style={styles.text}>The Sponsors being: </Text>
                
                <View style={styles.columnsContainer}>
                {/* Left Column */}
                <View style={styles.column}>
                    <Text style={styles.utext}>Mrs/Mrs. {docs.sponsor1}</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.utext}>Mrs/Mrs {docs.sponsor2}</Text>
                    <View style={styles.line}></View>
                </View>
                {/* Right Column */}
                <View style={styles.column}>
                    <Text style={styles.utext}>Mrs/Mrs {docs.sponsor3}</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.utext}>Mrs/Mrs {docs.sponsor4}</Text>
                    <View style={styles.line}></View>
                </View>
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