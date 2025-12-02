import { Navigate, useLocation } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { ROUTES } from '@/utils/constants';
import { logger } from '@/utils/logger';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = !!storage.getToken();

  if (!isAuthenticated) {
    logger.info('Unauthorized access attempt', { path: location.pathname });
    // Redirect to sign-in with return URL
    return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
