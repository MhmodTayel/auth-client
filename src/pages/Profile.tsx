import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/common/Spinner';
import { Alert } from '@/components/common/Alert';
import { Button } from '@/components/common/Button';
import { UpdateProfileForm } from '@/components/auth/UpdateProfileForm';
import { ChangePasswordForm } from '@/components/auth/ChangePasswordForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

export const ProfilePage = () => {
  const { user, isLoading, isError, error } = useUser();
  const { logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert type="error">
          <strong>Error loading profile:</strong>{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={ROUTES.DASHBOARD}>
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        </div>
        <Button onClick={logout} variant="danger" size="sm">
          Logout
        </Button>
      </div>

      <div className="space-y-6">
        {/* Update Profile Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <UpdateProfileForm />
        </div>

        {/* Change Password Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ChangePasswordForm />
        </div>

        {/* Account Information */}
        {user?.createdAt && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Account Information
            </h3>
            <p className="text-gray-600">
              <strong>Member since:</strong>{' '}
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
