import type { JSX } from 'react';

const LoadingDisplay = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-lg font-semibold">Loading...</div>
    </div>
  );
};

export default LoadingDisplay;
