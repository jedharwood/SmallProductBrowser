import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screenflex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
