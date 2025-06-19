import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '../../_global/component/Toast/ToastProvider';

/**
 * ProtectedRoute component that ensures user is authenticated with correct role
 * before allowing access to protected routes
 * 
 * @param {Object} props 
 * @param {React.ReactNode} props.children - The child components to render if authenticated
 * @param {string|string[]} props.allowedRoles - Role(s) allowed to access this route
 * @returns {React.ReactNode}
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { addToast } = useToast();
  const location = useLocation();
  
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // Function to check token validity
  const isTokenValid = () => {
    if (!token) return false;
    
    try {
      // Check if token is expired
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() >= exp * 1000) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };
  
  // Function to get user role
  const getUserRole = () => {
    if (!token) return null;
    
    try {
      const { role } = JSON.parse(atob(token.split('.')[1]));
      return role;
    } catch (error) {
      return null;
    }
  };
  
  // Check if token is valid and role is allowed
  const isAuthenticated = isTokenValid();
  const userRole = getUserRole();
  const hasRequiredRole = Array.isArray(allowedRoles) 
    ? allowedRoles.includes(userRole) 
    : allowedRoles === userRole;
  // Use useEffect to show toast message on unauthorized access - with rendered flag to prevent duplicate alerts
  useEffect(() => {
    // Use sessionStorage to prevent duplicate toasts during the same session
    const toastShownKey = `toast_shown_${location.pathname}`;
    const toastAlreadyShown = sessionStorage.getItem(toastShownKey);
    
    if (!toastAlreadyShown) {
      if (!isAuthenticated) {
        // Special message for admin route
        if (location.pathname.startsWith('/admin')) {
          addToast('Anda harus login sebagai admin terlebih dahulu', 'error');
        } else {
          addToast('Anda harus login terlebih dahulu', 'error');
        }
        sessionStorage.setItem(toastShownKey, 'true');
        // Clear this flag after some time (e.g., 5 seconds)
        setTimeout(() => sessionStorage.removeItem(toastShownKey), 5000);
      } else if (!hasRequiredRole) {
        if (location.pathname.startsWith('/admin')) {
          addToast('Anda tidak memiliki akses ke halaman admin', 'error');
        } else {
          addToast('Anda tidak memiliki akses ke halaman ini', 'error');
        }
        sessionStorage.setItem(toastShownKey, 'true');
        setTimeout(() => sessionStorage.removeItem(toastShownKey), 5000);
      }
    }
  }, [isAuthenticated, hasRequiredRole, addToast, location.pathname]);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // If user doesn't have the required role, redirect to their dashboard
  if (!hasRequiredRole) {
    return <Navigate to={`/${userRole}`} replace />;
  }
  
  // If authenticated and authorized, render children
  return children;
};

export default ProtectedRoute;
