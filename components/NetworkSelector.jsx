import React from "react";

const NetworkSelector = ({ selectedNetwork, setSelectedNetwork }) => (
  <div className="flex justify-center space-x-4 mb-8">
    <button
      onClick={() => setSelectedNetwork("testnet4")}
      className={`px-4 py-2 rounded transition duration-300 ${
        selectedNetwork === "testnet4"
          ? "bg-blue-500"
          : "bg-gray-700 hover:bg-gray-600"
      }`}
    >
      Testnet4
    </button>
    <button
      onClick={() => setSelectedNetwork("mainnet")}
      className={`px-4 py-2 rounded transition duration-300 ${
        selectedNetwork === "mainnet"
          ? "bg-blue-500"
          : "bg-gray-700 hover:bg-gray-600"
      }`}
    >
      Mainnet
    </button>
  </div>
);

export default NetworkSelector;
