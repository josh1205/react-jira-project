import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
  }

function ProtectedRoute({ children } : ProtectedRouteProps ) {
    const navigate = useNavigate();
    const accessToken = false;
    const loading = false;

    if (accessToken) {
        return children;
    } else if (loading) {
        return <p>Loading...</p>;
    } else if (!accessToken && !loading) {
        navigate('/login');
    } else {
        return <p>Something went wrong</p>;
    }
}

export default ProtectedRoute;