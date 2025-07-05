import React from 'react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex flex-col justify-center items-center text-white px-6">
      <h1 className="text-5xl font-extrabold mb-6 animate-fadeInDown">
        Welcome to Shared Wishlist
      </h1>
      <p className="text-xl max-w-xl text-center mb-10 animate-fadeInUp delay-150">
        Create and share your wishlists with friends and family easily. Stay organized and never miss a gift idea!
      </p>
      <button className="bg-white text-purple-600 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition duration-300 animate-pulse">
        Get Started
      </button>
    </div>
  );
};

export default Landing;
