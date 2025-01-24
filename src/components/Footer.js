import React from "react";

const Footer = () => (
  <footer className="p-4 bg-blue-600 text-white text-center">
    Last Updated: {new Date().toLocaleTimeString()}
  </footer>
);

export default Footer;
