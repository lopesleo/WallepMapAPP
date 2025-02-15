import React from "react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-800 rounded-lg shadow-lg p-8 ${className}`}>
    {children}
  </div>
);

export default Card;
