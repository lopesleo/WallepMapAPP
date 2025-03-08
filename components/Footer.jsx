import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-6 mt-16">
      <div className="container mx-auto text-center">
        <p className="text-3xl text-white mb-4">Feito por Leonardo Lopes</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/lopesleo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white hover:text-gray-300 transition-colors duration-300 transform hover:scale-105"
          >
            <FaGithub size={32} />
          </a>
          <a
            href="https://www.linkedin.com/in/leonardolopesalmeida/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white hover:text-gray-300 transition-colors duration-300 transform hover:scale-105"
          >
            <FaLinkedin size={32} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
