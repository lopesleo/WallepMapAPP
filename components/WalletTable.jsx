import React from "react";
import Card from "./Card";

const WalletTable = ({ topWallets, selectedNetwork, formatBTC }) => {
  const getWalletLink = (address) => {
    return selectedNetwork === "testnet4"
      ? `https://mempool.space/pt/testnet4/address/${address}`
      : `https://mempool.space/pt/address/${address}`;
  };

  return (
    <Card>
      <h2 className="text-3xl font-bold mb-2 text-center">
        Top 10 Carteiras com Maior Saldo
      </h2>
      <p className="text-sm text-gray-400 text-center mb-4">
        Clique em uma carteira para ver os detalhes no mempool.space.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-700">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Endereço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Saldo (BTC)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {topWallets.map((wallet, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
                onClick={() =>
                  window.open(getWalletLink(wallet.address), "_blank")
                }
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter")
                    window.open(getWalletLink(wallet.address), "_blank");
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {wallet.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatBTC(wallet.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default WalletTable;
