
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RouteGuard = ({ children, allowedRoles }) => {
  const location = useLocation();
  const userRole = localStorage.getItem('role');

  // Check if the user's role is allowed on this route
  if (!allowedRoles.includes(userRole)) {
    // Redirect them to the home page (or any other page) if they are not allowed
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RouteGuard;
