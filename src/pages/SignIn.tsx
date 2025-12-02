import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

export const SignInPage = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

      <div className="text-center text-gray-600">
        <p>Sign in form will be implemented in the next step</p>
      </div>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <Link
          to={ROUTES.SIGN_UP}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};
