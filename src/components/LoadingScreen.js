import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const motivationalMessages = [
    "esta cargando esperate",
    "esta cargando esperate...",
    "Que esta cargando chingao",
    "REGRESAME MIS BRAINROTS",
    "Ya casi carga bro"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % motivationalMessages.length);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-10">
        {/* Logo/Título - Más grande y bold */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1 className="text-6xl font-bold text-sky-400 mb-3 tracking-tight">
            CARGANDO
          </h1>
          <div className="w-48 h-1.5 mx-auto bg-amber-500/80 mt-3 rounded-full"></div>
        </motion.div>

        {/* Spinner llamativo */}
        <div className="relative w-40 h-40 mx-auto">
          <motion.div
            className="absolute inset-0 border-4 border-sky-500/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-3 border-4 border-t-amber-400 border-r-sky-400 border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: -720 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-6 border-4 border-t-transparent border-r-transparent border-b-amber-500 border-l-sky-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-10 flex items-center justify-center">
            <motion.span
              className="text-4xl text-amber-400"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✦
            </motion.span>
          </div>
        </div>

        {/* Barra de progreso impactante */}
        <div className="w-96 mx-auto">
          <div className="bg-black border-2 border-amber-700 rounded-full h-3 overflow-hidden shadow-lg">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 to-amber-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.p
            className="text-amber-300 text-xl font-bold mt-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {progress}%
          </motion.p>
        </div>

        {/* Mensajes con más personalidad */}
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
          className="h-10"
        >
          <p className="text-amber-200 text-2xl font-bold tracking-wide">
            {motivationalMessages[messageIndex]}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;