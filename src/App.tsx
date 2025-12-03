import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PublicRoute } from '@/components/auth/PublicRoute';
import { Layout } from '@/components/auth/layout/Layout';
import { AuthLayout } from '@/components/auth/layout/AuthLayout';
import { SignInPage } from '@/pages/SignIn';
import { SignUpPage } from '@/pages/SignUp';
import { DashboardPage } from '@/pages/Dashboard';
import { ProfilePage } from '@/pages/Profile';
import { NotFoundPage } from '@/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with auth layout */}
        <Route element={<AuthLayout />}>
          <Route
            path={ROUTES.SIGN_IN}
            element={
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.SIGN_UP}
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
        </Route>

        {/* Protected routes with main layout */}
        <Route element={<Layout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Root redirect */}
        <Route
          path={ROUTES.HOME}
          element={<Navigate to={ROUTES.SIGN_IN} replace />}
        />

        {/* 404 catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
