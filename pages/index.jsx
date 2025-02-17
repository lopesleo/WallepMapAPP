import React, { use } from "react";
import Header from "../components/Header";
import NetworkSelector from "../components/NetworkSelector";
import Card from "../components/Card";
import WalletTable from "../components/WalletTable";
import Background from "../components/Background";
import Particles from "../components/Particles";
import ExponentProgressBar from "../components/ExponentProgressBar";
const safeNumber = (value, fallback = 0) =>
  Number.isFinite(value) ? value : fallback;

export default function Home({ activeWallets, topWallets, usedWallets }) {
  const [selectedNetwork, setSelectedNetwork] = React.useState("testnet4");

  // Constantes matemáticas precisas
  const TOTAL_KEYS = 2 ** 256;
  const existWalletWithBalance = safeNumber(activeWallets);
  const usedWalletsCount = safeNumber(usedWallets);
  console.log("existWalletWithBalance", existWalletWithBalance);
  console.log("usedWalletsCount", usedWalletsCount);
  // Cálculo direto da probabilidade
  const collisionProbability =
    existWalletWithBalance > 0 ? existWalletWithBalance / TOTAL_KEYS : 0;
  const collisionProbabilityWithUsed =
    usedWalletsCount > 0 ? usedWalletsCount / TOTAL_KEYS : 0;
  // Funções de formatação
  const formatScientific = (num) => {
    if (num === 0) return "0";
    const exponent = Math.floor(Math.log2(num));
    return `2 <sup>${Math.abs(exponent)} </sup> `; // Utiliza Math.abs para garantir que o expoente seja sempre positivo
  };
  const convertToPowerOfTwo = (num) => {
    if (num <= 0) return "0";
    const exponent = Math.floor(Math.log2(num));
    return `2 <sup>${exponent}</sup>`;
  };

  const getProbabilityContext = (num) => {
    if (num < 1e-77)
      return "Mais raro que encontrar 1 átomo específico no universo observável";
    if (num < 1e-50) return "Equivalente a ganhar na loteria 100x consecutivas";
    if (num < 1e-30)
      return "Comparável a acertar um alvo de 1mm na Lua da Terra";
    return "Probabilidade insignificante na prática";
  };

  return (
    <div className="relative min-h-screen text-white py-12 px-4">
      <Background />
      <Particles />
      <div className="container mx-auto relative z-10">
        <Header />
        <NetworkSelector
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
        />

        {selectedNetwork === "testnet4" ? (
          <>
            {/* Seção de Carteiras com Saldo */}
            <Card className="mb-12 text-center">
              <div className="flex flex-col md:flex-row md:justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">
                    🏦 Carteiras com Saldo Ativas
                  </h2>
                  <p className="text-4xl text-blue-400">
                    {(existWalletWithBalance ?? 0).toLocaleString()}
                  </p>
                  <p className="mt-2 text-gray-300">
                    carteiras com saldo existentes na rede
                  </p>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">
                    📈 Carteiras já utilizadas Utilizadas
                  </h2>

                  <p className="text-2xl text-blue-400">
                    {(usedWalletsCount ?? 0).toLocaleString()}
                  </p>
                  <p className="mt-2 text-gray-300">
                    Todas as carteiras existentes na rede (que ja foram
                    utilizadas)
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">
                  📊 Estatísticas de Segurança
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">
                      Total de Combinações
                    </p>
                    <p
                      className="text-2xl text-green-400"
                      dangerouslySetInnerHTML={{
                        __html: formatScientific(TOTAL_KEYS),
                      }}
                    />
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">
                      Probabilidade de Colisão com uma carteira existente com
                      saldo
                    </p>
                    <p
                      className="text-2xl text-yellow-400"
                      dangerouslySetInnerHTML={{
                        __html: formatScientific(collisionProbability),
                      }}
                    />
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">
                      Probabilidade de Colisão com uma carteira existente já
                      utilizada
                    </p>
                    <p
                      className="text-2xl text-yellow-400"
                      dangerouslySetInnerHTML={{
                        __html: formatScientific(collisionProbabilityWithUsed),
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
            {/* Seção de Progresso Exponencial */}
            <ExponentProgressBar
              activeWallets={existWalletWithBalance}
              usedWallets={usedWalletsCount}
            />
            {/* Seção de Explicação Técnica */}
            <Card className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">
                🔐 Por que é seguro?
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">
                    🧮 Fórmula de Probabilidade
                  </h3>
                  <code className="text-lg bg-black p-3 rounded block mb-4 text-center">
                    P = n / N
                  </code>
                  <div className="text-gray-300 space-y-2">
                    <p>
                      <strong>Onde:</strong>
                    </p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `• n = Carteiras existentes = ${existWalletWithBalance.toLocaleString()} ( ≈ ${convertToPowerOfTwo(existWalletWithBalance)} )`,
                      }}
                    />

                    <p>
                      • N = Combinações possíveis = 2<sup>256</sup>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">
                    🌌 Contexto Prático
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-yellow-400 text-center">
                        {getProbabilityContext(collisionProbability)}
                      </p>
                    </div>
                    <div className="text-gray-300 text-sm">
                      <p>Mesmo se todas as pessoas na Terra gerassem:</p>
                      <p className="text-center">
                        <span className="text-blue-400">
                          1 milhão de carteiras/segundo
                        </span>
                        <br />
                        por 100 anos, cobriríamos apenas
                        <br />≈{" "}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: formatScientific(3.15 * Math.pow(10, 21)),
                          }}
                        />
                        combinações
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            {/* Seção de Comparação Cósmica */}
            <Card className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">
                🌌 Perspectiva Cósmica
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">
                    Estrelas no universo
                  </p>
                  <p className="text-blue-400">
                    2 <sup>73</sup>
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">
                    Grãos de areia na Terra
                  </p>
                  <p className="text-blue-400">
                    2 <sup>63</sup>
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Chaves Bitcoin</p>
                  <p
                    className="text-green-400"
                    dangerouslySetInnerHTML={{
                      __html: formatScientific(TOTAL_KEYS),
                    }}
                  />
                </div>
              </div>
            </Card>
            {/* Tabela de Carteiras (mantida da versão anterior) */}
            <WalletTable
              topWallets={topWallets || []}
              selectedNetwork={selectedNetwork}
              formatBTC={(balance) => (
                <span>
                  <span className="font-bold">
                    {safeNumber(balance).toLocaleString()}
                  </span>
                  <span className="text-blue-400"> BTC</span>
                </span>
              )}
            />
          </>
        ) : (
          <Card className="mt-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Mainnet em Desenvolvimento
            </h2>
            <p className="text-lg text-gray-300">
              A rede principal está em fase final de implementação. Utilize a
              Testnet4 para análise.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const handleError = (error) => {
    console.error("Erro na API:", error);
    return { total_wallets: 0, top_wallets: [] };
  };

  try {
    const [totalRes, topRes, usedRes] = await Promise.all([
      fetch(`${baseUrl}/api/v1/wallets/active`),
      fetch(`${baseUrl}/api/v1/wallets/top`),
      fetch(`${baseUrl}/api/v1/wallets/used`),
    ]);

    const activeData = totalRes.ok
      ? await totalRes.json()
      : handleError(new Error(totalRes.statusText));
    const topData = topRes.ok
      ? await topRes.json()
      : handleError(new Error(topRes.statusText));
    const usedData = usedRes.ok
      ? await usedRes.json()
      : handleError(new Error(usedRes.statusText));
    return {
      props: {
        activeWallets: Number(activeData.total_actives) || 0,
        topWallets: topData.top_wallets || [],
        usedWallets: usedData.total_used || 0,
      },
    };
  } catch (error) {
    return {
      props: handleError(error),
    };
  }
}
