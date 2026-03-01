import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative">
        {/* Spinning circle */}
        <div className="w-16 h-16 border-4 border-gray-700 border-t-[#E8B88A] rounded-full animate-spin"></div>
        {/* Optional text */}
        <p className="text-white text-center mt-4" style={{ fontFamily: 'Inter' }}>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
