import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.isAuthenticated;
  
  useEffect(() => {

    // Redirect to the home page if not authenticated
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <>{children}</>;  // Render the protected content
  }

  return null;  // Return null if navigating away
}

export default ProtectedRoute;
