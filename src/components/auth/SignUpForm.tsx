import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { signUpSchema, SignUpFormData } from '@/utils/validation';
import { ROUTES } from '@/utils/constants';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';
import { PasswordStrength } from '@/components/common/PasswordStrength';
import { getErrorMessage } from '@/api/axios';
import { useState } from 'react';

export const SignUpForm = () => {
  const { signUp, isSigningUp, signUpError } = useAuth();
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: SignUpFormData) => {
    signUp(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {signUpError && (
        <Alert type="error">
          <strong>Sign up failed:</strong> {getErrorMessage(signUpError)}
        </Alert>
      )}

      <Input
        id="name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        autoComplete="name"
        required
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="john@example.com"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register('email')}
      />

      <div>
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
          showPasswordToggle
          error={errors.password?.message}
          {...register('password', {
            onChange: (e) => setPassword(e.target.value),
          })}
        />
        <PasswordStrength password={password} />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSigningUp}
        disabled={isSigningUp}
        className="w-full"
      >
        Create Account
      </Button>

      <div className="text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <Link
          to={ROUTES.SIGN_IN}
          className="text-blue-600 hover:text-blue-700 font-medium underline"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
};
