import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Loading from './components/loading/Loading';

// ----------------------------------------------------------------------



export default function Router() {

  const ProtectedRoute = ({ children }) => {
    const { currentUser, loading, error } = useContext(AuthContext);
    if (loading) {
      // Render a loading indicator while authentication is in progress
      
      return <Loading />;
    }
  
    if (error) {
      // Render an error message if there was an authentication error
      return <div>Error...</div>;
    }
  
    if (!currentUser) {
      // Redirect to the login page if the user is not authenticated
      return <Navigate to="/login" />;
    }
     // Render the children if the user is authenticated
    return children;
  };


  const routes = useRoutes([
    {
      path: '/dashboard',
      element:  <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <ProtectedRoute><DashboardAppPage /></ProtectedRoute> },
        { path: 'user', element:  <ProtectedRoute><UserPage /></ProtectedRoute>},
        { path: 'products', element: <ProtectedRoute><ProductsPage /></ProtectedRoute>},
        { path: 'blog', element: <ProtectedRoute><BlogPage /></ProtectedRoute>},
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
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
