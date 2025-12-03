import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/hooks/useUser';
import {
  changePasswordSchema,
  ChangePasswordFormData,
} from '@/utils/validation';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';
import { PasswordStrength } from '@/components/common/PasswordStrength';
import { getErrorMessage } from '@/api/axios';
import { useState } from 'react';

export const ChangePasswordForm = () => {
  const { changePassword, isChangingPassword, changePasswordError } = useUser();
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    setSuccessMessage('');
    changePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          setSuccessMessage('Password changed successfully!');
          reset();
          setNewPassword('');
          setTimeout(() => setSuccessMessage(''), 5000);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Change Password
        </h3>

        {successMessage && (
          <Alert type="success" className="mb-4">
            {successMessage}
          </Alert>
        )}

        {changePasswordError && (
          <Alert type="error" className="mb-4">
            <strong>Password change failed:</strong>{' '}
            {getErrorMessage(changePasswordError)}
          </Alert>
        )}

        <div className="space-y-4">
          <Input
            id="current-password"
            label="Current Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
            showPasswordToggle
            error={errors.currentPassword?.message}
            {...register('currentPassword')}
          />

          <div>
            <Input
              id="new-password"
              label="New Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              showPasswordToggle
              error={errors.newPassword?.message}
              {...register('newPassword', {
                onChange: (e) => setNewPassword(e.target.value),
              })}
            />
            <PasswordStrength password={newPassword} />
          </div>

          <Input
            id="confirm-password"
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            showPasswordToggle
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          variant="primary"
          isLoading={isChangingPassword}
          disabled={isChangingPassword}
        >
          Change Password
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset();
            setNewPassword('');
          }}
          disabled={isChangingPassword}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
