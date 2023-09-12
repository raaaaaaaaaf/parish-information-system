import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  {AuthContextProvider}  from './context/AuthContext.jsx'
import { AddFormProvider } from './context/AddContext.jsx'
import { EditFormProvider } from './context/EditContext.jsx'






ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
   <AddFormProvider>
    <EditFormProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </EditFormProvider>
   </AddFormProvider>
  </AuthContextProvider>
)
