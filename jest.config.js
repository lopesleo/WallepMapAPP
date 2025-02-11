const dotenv = require("dotenv");
const nextJest = require("next/jest");

// Carregando o arquivo de ambiente
const result = dotenv.config({ path: ".env.development" });
if (result.error) {
  throw new Error("Erro ao carregar .env.development");
}
console.log("Variáveis carregadas:", result.parsed);

// Configurando Next.js com Jest
const createJestConfig = nextJest({ dir: "." });

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>"],
};

module.exports = createJestConfig(customJestConfig);
