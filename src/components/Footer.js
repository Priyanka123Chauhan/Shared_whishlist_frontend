import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-100 p-4 text-center text-indigo-700 shadow-inner mt-8">
      &copy; {new Date().getFullYear()} WishNest. All rights reserved.
    </footer>
  );
};

export default Footer;
