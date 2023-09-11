import React, { useContext, useEffect, useRef, useState } from 'react'
import { AddFormContext } from '../../context/AddContext'
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PayPal = () => {

    const paypal = useRef();
    const [paypalData, setPaypalData] = useState({})
    const {currentUser} = useContext(AuthContext)
    const {docId} = useContext(AddFormContext)
    const nav = useNavigate();
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
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
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                const docs = doc(db,"docsData", docId)
                await updateDoc(docs, {isPaid: true})
                console.log(order);
                setPaypalData(order);
                nav('/client/viewdocs')
            },
            onError: (err) => {
                console.log(err)
            }
        })
        .render(paypal.current)
    }, [])

  return (
    <div ref={paypal}></div>
  )
}

export default PayPal