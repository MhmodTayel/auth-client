import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

export const SignUpPage = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

      <div className="text-center text-gray-600">
        <p>Sign up form will be implemented in the next step</p>
      </div>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <Link
          to={ROUTES.SIGN_IN}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};
