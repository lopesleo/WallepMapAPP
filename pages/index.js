import React, { useState } from "react";

export default function Home({ totalWallets, topWallets }) {
  // Estado para armazenar a rede selecionada (padrão: Testnet4)
  const [selectedNetwork, setSelectedNetwork] = useState("testnet4");

  // Função para formatar o saldo (BTC) destacando a parte decimal
  const formatBTC = (balance) => {
    const [integerPart, decimalPart] = balance.toString().split(".");
    return (
      <span>
        <span className="font-bold">{integerPart}</span>
        {decimalPart && <span className="text-blue-400">.{decimalPart}</span>}
      </span>
    );
  };

  // Cálculos dinâmicos para a probabilidade de colisão
  const r = 1e9; // Hashes por segundo (1 GHz)
  const T_year = 3.15576e7; // Segundos em um ano
  // Espaço total de chaves para SHA-256 (aproximado)
  const N_approx = 1.15792e77;
  // Número de novas chaves geradas em 1 ano:
  const n_year = r * T_year; // ≈3.15576e16

  // 1. Probabilidade de colisão entre as novas chaves geradas em 1 ano:
  const collisionProbabilityNew = (n_year * n_year) / (2 * N_approx);

  // 2. Tempo para 50% de chance de colisão entre uma nova chave e uma carteira existente:
  // Se já existem totalWallets chaves, resolve: exp(-totalWallets * r * t / N) = 0.5
  // => t = (N * ln2) / (totalWallets * r)
  
  let t_collision_existing_years = 0;
  if (totalWallets > 0) {
    const t_collision_existing_seconds =
      (N_approx * Math.log(2)) / (totalWallets * r);
    t_collision_existing_years = t_collision_existing_seconds / T_year;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        {/* Cabeçalho */}
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight">
            BitCollision Wallet Map
          </h1>
          <p className="text-lg text-gray-300">
            Uma abordagem educativa para entender colisões de hash em carteiras
            Bitcoin.
          </p>
        </header>

        {/* Seletor de Rede */}
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

        {/* Conteúdo Condicional */}
        {selectedNetwork === "testnet4" ? (
          <>
            {/* Card com Total de Carteiras */}
            <section className="mb-12">
              <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center transform transition duration-500 hover:scale-105">
                <h2 className="text-3xl font-bold mb-4">
                  Total de Carteiras com Saldo &gt; 0
                </h2>
                <p className="text-4xl font-semibold text-blue-400">
                  {totalWallets.toLocaleString()}
                </p>
              </div>
            </section>

            {/* Card com Probabilidade de Colisão */}
            <section className="mb-12">
              <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center transform transition duration-500 hover:scale-105">
                <h2 className="text-3xl font-bold mb-4">
                  Probabilidade de Colisão de Hash
                </h2>
                <div className="space-y-4 text-xl">
                  <p>
                    <span className="font-semibold">
                      Colisão entre novas chaves (1 ano):
                    </span>{" "}
                    <span className="text-blue-400">
                      {collisionProbabilityNew.toExponential(2)}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                      50% de chance com carteira existente:
                    </span>{" "}
                    <span className="text-blue-400">
                      {t_collision_existing_years.toExponential(2)} anos
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* Card com Top 10 Carteiras */}
            <section>
              <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Top 10 Carteiras com Maior Saldo
                </h2>
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
                          className="hover:bg-gray-700 transition-colors duration-300"
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
              </div>
            </section>
          </>
        ) : (
          // Caso a rede selecionada seja Mainnet
          <section className="mt-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center transform transition duration-500 hover:scale-105">
              <h2 className="text-3xl font-bold mb-4">
                Mainnet em Desenvolvimento
              </h2>
              <p className="text-lg text-gray-300">
                A Mainnet ainda está em desenvolvimento. Por favor, selecione
                Testnet4 para visualizar os dados.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Buscar o total de carteiras com saldo > 0 (para Testnet4)
    const totalRes = await fetch(
      "http://localhost:3000/api/v1/walletmap/totalwallets",
    );
    if (!totalRes.ok) {
      throw new Error("Erro ao buscar total de carteiras");
    }
    const totalData = await totalRes.json();

    // Buscar o top 10 carteiras com maior saldo (para Testnet4)
    const topRes = await fetch(
      "http://localhost:3000/api/v1/walletmap/topwallets",
    );
    if (!topRes.ok) {
      throw new Error("Erro ao buscar top carteiras");
    }
    const topData = await topRes.json();

    return {
      props: {
        totalWallets: totalData.total_wallets || 0,
        topWallets: topData.top_wallets || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        totalWallets: 0,
        topWallets: [],
      },
    };
  }
}
