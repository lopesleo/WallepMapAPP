import React, { useState, useEffect, useRef } from "react";

const ExponentProgressBarOverlay = ({ activeWallets, usedWallets }) => {
  const containerRef = useRef(null);
  const [activeWidth, setActiveWidth] = useState(0);
  const [usedWidth, setUsedWidth] = useState(0);

  // Calcula o expoente para cada valor (potência de 2)
  const exponentActive =
    activeWallets > 0 ? Math.floor(Math.log2(activeWallets)) : 0;
  const exponentUsed = usedWallets > 0 ? Math.floor(Math.log2(usedWallets)) : 0;

  // Converte o expoente em porcentagem (limitada a 100%)
  const progressActive = Math.min((exponentActive / 256) * 100, 100);
  const progressUsed = Math.min((exponentUsed / 256) * 100, 100);

  useEffect(() => {
    const handleVisibility = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setActiveWidth(progressActive);
        setUsedWidth(progressUsed);
      }
    };

    const observer = new IntersectionObserver(handleVisibility, {
      threshold: 0.5,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [progressActive, progressUsed]);

  return (
    <div className="w-full my-6 p-4 bg-gray-800 rounded-lg shadow-lg">
      {/* Título e Descrição */}
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold mb-2">
          📊 Progresso das Carteiras Ativas
        </h2>
        <p className="text-sm text-gray-400">
          Este gráfico ilustra a relação entre as carteiras existentes e o total
          de combinações possíveis de chaves Bitcoin, 2<sup>256</sup>. As barras
          representam o número de carteiras em potência de 2.
          <br />A barra <span className="text-blue-400">azul</span> mostra as{" "}
          <strong>carteiras ativas</strong> (com saldo), enquanto a barra{" "}
          <span className="text-orange-400">laranja</span> mostra as{" "}
          <strong>carteiras utilizadas</strong> (já usadas, mas estão sem
          saldo). Ambas as barras são escaladas para mostrar sua proporção em
          relação ao total de combinações possíveis.
        </p>
      </div>

      {/* Container para as barras sobrepostas */}
      <div
        className="relative w-full h-8 bg-gray-700 overflow-hidden shadow-inner"
        ref={containerRef}
      >
        {/* Barra Laranja (utilizadas) - posicionada atrás */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center text-sm text-white font-bold transition-all duration-1000 ease-in-out"
          style={{ width: `${usedWidth}%`, zIndex: 1 }}
          dangerouslySetInnerHTML={{ __html: `2<sup>${exponentUsed}</sup>` }}
        ></div>

        {/* Barra Azul (ativas) - posicionada à frente */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-sm text-white font-bold transition-all duration-1000 ease-in-out"
          style={{ width: `${activeWidth}%`, zIndex: 2 }}
          dangerouslySetInnerHTML={{ __html: `2<sup>${exponentActive}</sup>` }}
        ></div>
      </div>

      {/* Rótulos extremos */}
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span dangerouslySetInnerHTML={{ __html: "2<sup>0</sup>" }} />
        <span dangerouslySetInnerHTML={{ __html: "2<sup>256</sup>" }} />
      </div>

      {/* Legenda */}
      <div className="mt-4 text-center text-sm text-gray-400">
        <p>
          Carteiras utilizadas:{" "}
          <span className="font-bold text-orange-400">
            {usedWallets.toLocaleString()}
          </span>
          , Carteiras ativas:{" "}
          <span className="font-bold text-blue-400">
            {activeWallets.toLocaleString()}
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default ExponentProgressBarOverlay;
