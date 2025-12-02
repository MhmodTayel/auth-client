import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { signInSchema, SignInFormData } from '@/utils/validation';
import { ROUTES } from '@/utils/constants';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';
import { getErrorMessage } from '@/api/axios';

export const SignInForm = () => {
  const { signIn, isSigningIn, signInError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: SignInFormData) => {
    signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {signInError && (
        <Alert type="error">
          <strong>Sign in failed:</strong> {getErrorMessage(signInError)}
        </Alert>
      )}

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

      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        required
        showPasswordToggle
        error={errors.password?.message}
        {...register('password')}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSigningIn}
        disabled={isSigningIn}
        className="w-full"
      >
        Sign In
      </Button>

      <div className="text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <Link
          to={ROUTES.SIGN_UP}
          className="text-blue-600 hover:text-blue-700 font-medium underline"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};
