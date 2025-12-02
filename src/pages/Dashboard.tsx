import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';

export const DashboardPage = () => {
  const { user, isLoading } = useUser();
  const { logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to the application
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {user && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Profile Information
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium">{user.email}</p>
              </div>
              {user.createdAt && (
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-lg font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
