import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedLayout: React.FC = () => {
  const isAuthenticated = Cookies.get('IsAuthenticated');

  console.log("IsAuthenticated Cookie:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
