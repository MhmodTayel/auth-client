import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/hooks/useUser';
import { updateProfileSchema, UpdateProfileFormData } from '@/utils/validation';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';
import { getErrorMessage } from '@/api/axios';
import { useState } from 'react';

export const UpdateProfileForm = () => {
  const { user, updateProfile, isUpdatingProfile, updateProfileError } =
    useUser();
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: UpdateProfileFormData) => {
    setSuccessMessage('');
    updateProfile(data, {
      onSuccess: () => {
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 5000);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Update Profile
        </h3>

        {successMessage && (
          <Alert type="success" className="mb-4">
            {successMessage}
          </Alert>
        )}

        {updateProfileError && (
          <Alert type="error" className="mb-4">
            <strong>Update failed:</strong>{' '}
            {getErrorMessage(updateProfileError)}
          </Alert>
        )}

        <div className="space-y-4">
          <Input
            id="update-name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            id="update-email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          variant="primary"
          isLoading={isUpdatingProfile}
          disabled={isUpdatingProfile}
        >
          Save Changes
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isUpdatingProfile}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};
