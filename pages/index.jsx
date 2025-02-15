import React from "react";
import Header from "../components/Header";
import NetworkSelector from "../components/NetworkSelector";
import Card from "../components/Card";
import WalletTable from "../components/WalletTable";
import Background from "../components/Background";
import Particles from "../components/Particles";
const safeNumber = (value, fallback = 0) =>
  typeof value === "number" ? value : fallback;

export default function Home({ totalWallets, topWallets }) {
  const [selectedNetwork, setSelectedNetwork] = React.useState("testnet4");

  // Constantes matemáticas precisas
  const TOTAL_KEYS = 2 ** 256;
  const existingWallets = safeNumber(totalWallets);

  // Cálculo direto da probabilidade
  const collisionProbability =
    existingWallets > 0 ? existingWallets / TOTAL_KEYS : 0;

  // Funções de formatação
  const formatScientific = (num) => {
    if (num === 0) return "0";
    const exp = num.toExponential(2);
    const [coefficient, exponent] = exp.split("e");
    return `${coefficient} × 10<sup>${exponent.replace("+", "")}</sup>`;
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
              <h2 className="text-3xl font-bold mb-4">
                🏦 Carteiras com Saldo Ativas
              </h2>
              <div className="mb-8">
                <p className="text-4xl text-blue-400">
                  {existingWallets.toLocaleString()}
                </p>
                <p className="mt-2 text-gray-300">
                  carteiras existentes na rede
                </p>
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
                      Probabilidade de Colisão
                    </p>
                    <p
                      className="text-2xl text-yellow-400"
                      dangerouslySetInnerHTML={{
                        __html: formatScientific(collisionProbability),
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>

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
                    <p>
                      • n = Carteiras existentes ={" "}
                      {existingWallets.toLocaleString()}
                    </p>
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
                        <br />≈ 3.15×10<sup>21</sup> combinações
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
                  <p className="text-blue-400">10²²</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">
                    Grãos de areia na Terra
                  </p>
                  <p className="text-blue-400">7.5×10¹⁸</p>
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
    const [totalRes, topRes] = await Promise.all([
      fetch(`${baseUrl}/api/v1/walletmap/totalwallets`),
      fetch(`${baseUrl}/api/v1/walletmap/topwallets`),
    ]);

    const totalData = totalRes.ok
      ? await totalRes.json()
      : handleError(new Error(totalRes.statusText));
    const topData = topRes.ok
      ? await topRes.json()
      : handleError(new Error(topRes.statusText));

    return {
      props: {
        totalWallets: Number(totalData.total_wallets) || 0,
        topWallets: topData.top_wallets || [],
      },
    };
  } catch (error) {
    return {
      props: handleError(error),
    };
  }
}
