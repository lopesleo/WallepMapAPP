import React, { useState, useEffect, useRef } from "react";

const ExponentProgressBar = ({ existingWallets }) => {
  const progressRef = useRef(null); // Referência para a barra de progresso
  const [width, setWidth] = useState(0); // Largura inicial da barra

  // Calcula o expoente atual com base no número de carteiras existentes.
  const exponent =
    existingWallets > 0 ? Math.floor(Math.log2(existingWallets)) : 0;

  // Calcula a porcentagem de preenchimento considerando o universo total (2^256).
  const progress = Math.min((exponent / 256) * 100, 100);

  useEffect(() => {
    const handleVisibility = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // A barra entrou na tela, então começa a animação
        setWidth(progress);
      }
    };

    // Configuração do IntersectionObserver
    const observer = new IntersectionObserver(handleVisibility, {
      threshold: 0.5, // A animação começa quando 50% do elemento estiver visível
    });

    // Começa a observar a barra de progresso
    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    // Limpeza do observer ao desmontar o componente
    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, [progress]); // Só faz a animação quando a variável `progress` muda

  return (
    <div className="w-full my-6 p-4 bg-gray-800 rounded-lg shadow-lg">
      {/* Título e Descrição */}
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-center">
          📊 Progresso das Carteiras Ativas
        </h2>
        <p className="text-sm text-gray-400">
          Este gráfico ilustra a relação entre as carteiras existentes e o
          universo total de combinações possíveis de chaves Bitcoin, que é{" "}
          <span
            className="font-semibold text-blue-400"
            dangerouslySetInnerHTML={{ __html: "2<sup>256</sup>" }}
          ></span>
          . O preenchimento da barra representa o valor atual das carteiras,
          expresso em potência de 2.
        </p>
      </div>

      {/* Barra de Progresso */}
      <div
        className="relative w-full h-8 bg-gray-700 overflow-hidden shadow-inner"
        ref={progressRef}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-sm text-white font-bold transition-all duration-1000 ease-in-out hover:shadow-lg"
          style={{ width: `${width}%` }}
          dangerouslySetInnerHTML={{ __html: `2<sup>${exponent}</sup>` }}
        ></div>
      </div>

      {/* Rótulos extremos da barra */}
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span dangerouslySetInnerHTML={{ __html: "2<sup>0</sup>" }} />
        <span dangerouslySetInnerHTML={{ __html: "2<sup>256</sup>" }} />
      </div>

      {/* Legenda do Estado Atual */}
      <div className="mt-4 text-center text-sm text-gray-400">
        <p>
          Atualmente, existem{" "}
          <span className="font-bold text-blue-400">
            {existingWallets.toLocaleString()}
          </span>{" "}
          carteiras ativas, o que corresponde aproximadamente a{" "}
          <span
            className="font-bold text-blue-400"
            dangerouslySetInnerHTML={{ __html: `2<sup>${exponent}</sup>` }}
          ></span>
          .
        </p>
      </div>
    </div>
  );
};

export default ExponentProgressBar;
