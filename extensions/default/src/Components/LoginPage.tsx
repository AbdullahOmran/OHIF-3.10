import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Implement authentication
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="w-full border-b border-gray-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold">TherAInostics</h1>
          <nav className="space-x-4">
            <Link
              to="/home"
              className="text-blue-400 hover:text-blue-300"
            >
              Home
            </Link>
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300"
            >
              Signup
            </Link>
            <Link
              to="/study-list"
              className="text-blue-400 hover:text-blue-300"
            >
              Study List
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold">Log in to TherAInostics</h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Access AI-driven prostate cancer treatment insights
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label
                  htmlFor="email"
                  className="sr-only"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  // required
                  className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="sr-only"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  // required
                  className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Log in
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-400">
            Dont have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              {' '}
              Sign up
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-4 px-4 text-center text-gray-400 sm:px-6 lg:px-8">
        <p>&copy; 2025 TherAInostics. All rights reserved.</p>
      </footer>
    </div>
  );
};
