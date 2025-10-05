import type { FC, ReactNode } from 'react';

interface ErrorDisplayProps {
  message: string;
  children?: ReactNode;
}

const ErrorDisplay: FC<ErrorDisplayProps> = ({ message, children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-600 text-lg font-semibold mb-4">{message}</div>
        {children}
      </div>
    </div>
  );
};

export default ErrorDisplay;
