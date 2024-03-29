import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Loading from './components/loading/Loading';
import ClientAppPage from './pages/clientPages/ClientAppPage';
import ReqBaptismal from './pages/clientPages/ReqBaptismal';
import ViewDocuments from './pages/clientPages/ViewDocuments';
import PayPal from './pages/clientPages/PayPal';
import ReqBurial from './pages/clientPages/ReqBurial';
import ReqMarriage from './pages/clientPages/ReqMarriage';
import PDFBurial from './pages/clientPages/PDFBurial';
import PDFBaptismal from './pages/clientPages/PDFBaptismal';
import { AddFormContext } from './context/AddContext';
import PDFMarriage from './pages/clientPages/PDFMarriage';
import BurialRecordPage from './pages/BurialRecordPage';
import MarriageContractPage from './pages/MarriageContactPage';
import EditBaptismal from './pages/EditBaptismal';
import MarriageContactPage from './pages/MarriageContactPage';
import EditMarriage from './pages/EditMarriage';
import EditBurial from './pages/EditBurial';
import RegisterPage from './pages/RegisterPage';
import Report from './pages/MonthlyReport';
import MonthlyReport from './pages/MonthlyReport';
import CertificateRecordPage from './pages/CertificateRecordPage';

// ----------------------------------------------------------------------


export default function Router() {

  const {currentUser, loading, userData} =useContext(AuthContext)
  

  const ProtectedRoute = ({children, requiredRole}) => {
    const [timedOut, setTimedOut] = useState(false);
  
    useEffect(() => {
      // Set a timeout to consider the loading taking too long
      const timeoutId = setTimeout(() => {
        setTimedOut(true);
      }, 2000); // 5 seconds timeout (adjust as needed)
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);
  
    if (loading) {
      if (timedOut) {
        // Redirect to login page if loading takes too long
        return <Navigate to="/login" replace />;
      } else {
        return <Loading/>
      }
    }
    if(!currentUser) {
      return <Navigate to='/login'/>
    }
    if (requiredRole && userData.role !== requiredRole) {
      if (userData.role === "Admin") {
        return <Navigate to="/dashboard" />;
      } else {
        return <Navigate to="/client" />;
      }
   // Redirect to an unauthorized page or handle as needed
    }
    return children
  }
  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '/',
      // Redirect to the login page when accessing the root URL
      element: <Navigate to="/login" replace />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <ProtectedRoute requiredRole="Admin"><Navigate to="/dashboard/app" /></ProtectedRoute>, index: true },
        { path: 'app', element: <ProtectedRoute requiredRole="Admin"><DashboardAppPage /></ProtectedRoute> },
        { path: 'user', element: <ProtectedRoute requiredRole="Admin"><UserPage /></ProtectedRoute> },
        { path: 'certificate', element: <ProtectedRoute requiredRole="Admin"><CertificateRecordPage /></ProtectedRoute> },
        { path: 'certificate/editbaptismal/:id', element: <ProtectedRoute requiredRole="Admin"><EditBaptismal /></ProtectedRoute> },
        { path: 'certificate/viewbaptismal/:id', element: <ProtectedRoute requiredRole="Admin"><PDFBaptismal /></ProtectedRoute> },
        { path: 'certificate/editburial/:id', element: <ProtectedRoute requiredRole="Admin"><EditBurial /></ProtectedRoute> },
        { path: 'certificate/viewburial/:id', element: <ProtectedRoute requiredRole="Admin"><PDFBurial /></ProtectedRoute> },
        { path: 'certificate/editmarriage/:id', element: <ProtectedRoute requiredRole="Admin"><EditMarriage /></ProtectedRoute> },
        { path: 'certificate/viewmarriage/:id', element: <ProtectedRoute requiredRole="Admin"><PDFMarriage /></ProtectedRoute> },
        { path: 'blog', element: <ProtectedRoute requiredRole="Admin"><BlogPage /></ProtectedRoute> },
        { path: 'report', element: <ProtectedRoute requiredRole="Admin"><MonthlyReport /></ProtectedRoute> },

      ],
    },
    {
      path: '/client',
      element: <DashboardLayout />,
      children: [
        { element: <ProtectedRoute  requiredRole="User"><Navigate to="/client/app" /></ProtectedRoute>, index: true },
        { path: 'app', element: <ProtectedRoute  requiredRole="User"><ClientAppPage /></ProtectedRoute> },
        { path: 'reqbaptismal', element: <ProtectedRoute  requiredRole="User"><ReqBaptismal /></ProtectedRoute> },
        { path: 'reqburial', element: <ProtectedRoute  requiredRole="User"><ReqBurial /></ProtectedRoute> },
        { path: 'reqmarriage', element: <ProtectedRoute  requiredRole="User"><ReqMarriage /></ProtectedRoute> },
        { path: 'viewdoc', element: <ProtectedRoute  requiredRole="User"><ViewDocuments /></ProtectedRoute> },
        { path: 'viewdocs', element: <ProtectedRoute  requiredRole="User"><ProductsPage /></ProtectedRoute> },
        { path: 'viewdocs/pdfbaptismal/:id', element: <ProtectedRoute  requiredRole="User"><PDFBaptismal /></ProtectedRoute> },
        { path: 'viewdocs/pdfburial/:id', element: <ProtectedRoute  requiredRole="User"><PDFBurial /></ProtectedRoute> },
        { path: 'viewdocs/pdfmarriage/:id', element: <ProtectedRoute  requiredRole="User"><PDFMarriage /></ProtectedRoute> },
        { path: 'paypal', element: <ProtectedRoute  requiredRole="User"><PayPal /></ProtectedRoute> },
       
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
