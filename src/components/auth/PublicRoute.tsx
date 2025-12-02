import { Navigate } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { ROUTES } from '@/utils/constants';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Redirects authenticated users away from public routes (like signin/signup)
 */
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = !!storage.getToken();

  if (isAuthenticated) {
    // If already logged in, redirect to dashboard
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};
