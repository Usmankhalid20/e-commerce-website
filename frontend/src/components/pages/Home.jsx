import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to <span className="text-indigo-600">RoleApp</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            A platform designed for different user roles with customized experiences.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {/* Admin Card */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">Admin</h3>
                <p className="mt-3 text-base text-gray-500">
                  Full access to all features, user management, and system configuration.
                </p>
              </div>
              <div className="mt-6">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Admin Login
                </button>
              </div>
            </div>
          </div>

          {/* Manager Card */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600 mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">Manager</h3>
                <p className="mt-3 text-base text-gray-500">
                  Team management, reporting, and limited administrative capabilities.
                </p>
              </div>
              <div className="mt-6">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                  Manager Login
                </button>
              </div>
            </div>
          </div>

          {/* User Card */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">User</h3>
                <p className="mt-3 text-base text-gray-500">
                  Standard access with personal dashboard and basic functionality.
                </p>
              </div>
              <div className="mt-6">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  User Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;