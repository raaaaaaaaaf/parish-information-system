import { createContext, useState } from "react";


export const EditFormContext = createContext();

export function EditFormProvider ({children}) {
    const [docId, setDocId] = useState("");
    const [formData, setFormData] = useState({
    // Step1
        born: "",
        childName: "",
        church: "",
        dob: "",
        dobaptized: "",
        parent1: "",
        parent2: "",
        rev: "",
        sponsor1: "",
        sponsor2: "",
        sponsor3: "",
        sponsor4: "",
        isPaid: false,
        price: 120,
        docName: "Baptismal Certificate",
    })
    const [formData1, setFormData1] = useState({
        age: "",
        cod: "",
        dod: "",
        fullName: "",
        gender: "",
        marital: "",
        occupation: "",

        docName: "Burial Certificate",
        docType: "Burial",
        isPaid: false,
        price: 120,
        
    })

    const [formData2, setFormData2] = useState({
        fullName: "",
        father: "",
        mother: "",
        dob: "",
        pob: "",
        marital: "",
        address: "",

        fullName1: "",
        father1: "",
        mother1: "",
        dob1: "",
        pob1: "",
        marital1: "",
        address1: "",

        isPaid: false,
        price: 120,
        docName: "Marriage Certificate",
    })
    return (
        <EditFormContext.Provider value={{docId, setDocId,formData, setFormData, formData1, setFormData1, formData2, setFormData2}}>
            {children}
        </EditFormContext.Provider>
    )
}