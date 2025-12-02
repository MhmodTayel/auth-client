import { SignUpForm } from '@/components/auth/SignUpForm';

export const SignUpPage = () => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
        Create Account
      </h2>
      <SignUpForm />
    </div>
  );
};
