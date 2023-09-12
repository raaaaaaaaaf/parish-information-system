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
import { useContext } from 'react';
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

// ----------------------------------------------------------------------


export default function Router() {

  const {currentUser, loading, userData} =useContext(AuthContext)
  

  const ProtectedRoute = ({children, requiredRole}) => {
    if(loading) {
      return <Loading/>
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
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <ProtectedRoute requiredRole="Admin"><Navigate to="/dashboard/app" /></ProtectedRoute>, index: true },
        { path: 'app', element: <ProtectedRoute requiredRole="Admin"><DashboardAppPage /></ProtectedRoute> },
        { path: 'user', element: <ProtectedRoute requiredRole="Admin"><UserPage /></ProtectedRoute> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <ProtectedRoute requiredRole="Admin"><BlogPage /></ProtectedRoute> },
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
        { path: 'viewdocs', element: <ProtectedRoute  requiredRole="User"><ViewDocuments /></ProtectedRoute> },
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
