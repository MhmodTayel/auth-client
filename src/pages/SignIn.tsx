import { SignInForm } from '@/components/auth/SignInForm';

export const SignInPage = () => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
        Welcome Back
      </h2>
      <SignInForm />
    </div>
  );
};
