import React from 'react';

export const NotFoundPage: React.FC = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-center text-white">
    <h1 className="mb-4 text-6xl font-bold">404</h1>
    <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
    <p className="max-w-md text-base">
      The page you are looking for does not exist or has been moved.
    </p>
  </div>
);
