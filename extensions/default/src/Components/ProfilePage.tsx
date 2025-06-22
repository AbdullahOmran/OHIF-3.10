import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// export const ProfilePage = () => {
//   const storedUser = localStorage.getItem('user');
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   return (
//     <>
//       <div className="absolute top-4 left-4">
//         <button
//           onClick={() => window.history.back()}
//           className="flex items-center space-x-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow transition hover:bg-gray-300"
//         >
//           <svg
//             className="h-4 w-4"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//           <span>Back</span>
//         </button>
//       </div>
//       <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
//         <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl">
//           <div className="flex flex-col items-center">
//             <img
//               src={
//                 user.avatar ||
//                 `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
//               }
//               alt="Avatar"
//               className="h-28 w-28 rounded-full border-4 border-blue-500 shadow-md"
//             />
//             <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
//             <p className="text-sm text-gray-500">{user.organization}</p>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="text"
//                 value={user.email}
//                 readOnly
//                 className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 shadow-sm focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Organization</label>
//               <input
//                 type="text"
//                 value={user.organization}
//                 readOnly
//                 className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 shadow-sm focus:outline-none"
//               />
//             </div>
//           </div>

//           <div className="pt-4">
//             <button className="w-full rounded-md bg-blue-600 py-2 px-4 font-semibold text-white shadow transition hover:bg-blue-700">
//               Edit Profile
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser
    ? JSON.parse(storedUser)
    : {
        name: 'Guest User',
        email: 'guest@example.com',
        organization: 'N/A',
        avatar: '',
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
              to="/login"
              className="text-blue-400 hover:text-blue-300"
            >
              Login
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
        <div className="w-full max-w-md space-y-6 rounded-2xl bg-gray-900 p-6 shadow-2xl">
          <div className="flex flex-col items-center">
            <img
              src={
                user.avatar?.trim()
                  ? user.avatar
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=555&color=fff`
              }
              alt="Avatar"
              className="h-28 w-28 rounded-full border-4 border-blue-500 shadow-lg"
            />
            <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.organization}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Email</label>
              <input
                type="text"
                value={user.email}
                readOnly
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 shadow-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Organization</label>
              <input
                type="text"
                value={user.organization}
                readOnly
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 shadow-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <button className="w-full rounded-md bg-blue-600 py-2 px-4 font-semibold text-white shadow transition hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-4 px-4 text-center text-gray-500 sm:px-6 lg:px-8">
        <p>&copy; 2025 TherAInostics. All rights reserved.</p>
      </footer>
    </div>
  );
};
