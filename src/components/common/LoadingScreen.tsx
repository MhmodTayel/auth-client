import { Spinner } from './Spinner';

export interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({
  message = 'Loading...',
}: LoadingScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" className="mb-4" />
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
};
