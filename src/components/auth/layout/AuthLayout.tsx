import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {import.meta.env.VITE_APP_NAME || 'Auth Client'}
          </h1>
          <p className="text-gray-600 mt-2">Secure authentication system</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
