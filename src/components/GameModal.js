import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Trophy, AlertCircle } from 'lucide-react';
import MemoryGame from './games/MemoryGame';
import PuzzleGame from './games/PuzzleGame';
import QuizGame from './games/QuizGame';

const GameModal = ({ 
  isOpen, 
  onClose, 
  gameType, 
  gameData, 
  onGameComplete 
}) => {
  const [gameState, setGameState] = useState('playing');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setGameState('playing');
      setAttempts(0);
    }
  }, [isOpen, gameType]);

  const handleGameWin = () => {
    setGameState('won');
    onGameComplete(true);
  };

  const handleGameLose = () => {
    setGameState('lost');
    setAttempts(prev => prev + 1);
  };

  const resetGame = () => {
    setGameState('playing');
  };

  const renderGame = () => {
    const gameProps = {
      onWin: handleGameWin,
      onLose: handleGameLose,
      isActive: gameState === 'playing'
    };

    switch (gameType) {
      case 'memory':
        return <MemoryGame {...gameProps} cards={gameData?.cards} />;
      case 'puzzle':
        return <PuzzleGame {...gameProps} size={gameData?.size || 3} imageUrl={gameData?.imageUrl} />;
      case 'quiz':
        return <QuizGame {...gameProps} questions={gameData?.questions} />;
      default:
        return <div>Juego no encontrado</div>;
    }
  };

  const getGameTitle = () => {
    switch (gameType) {
      case 'memory':
        return 'Juego de Memoria';
      case 'puzzle':
        return 'Rompecabezas Deslizante';
      case 'quiz':
        return 'Quiz de Conocimiento';
      default:
        return 'Juego';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-br from-sky-500 to-blue-600 rounded-t-3xl text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {getGameTitle()}
                  </h2>
                  <p className="text-white/90">
                    Intentos: {attempts}
                  </p>
                </div>
                
                {gameState === 'playing' && (
                  <button
                    onClick={resetGame}
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Game Content */}
            <div className="p-6">
              {gameState === 'won' ? (
                <motion.div
                  className="text-center space-y-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-3xl font-bold text-emerald-400 mb-2">
                      ¡Felicitaciones!
                    </h3>
                    <p className="text-gray-300 text-lg">
                      Has completado el desafío exitosamente
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Intentos realizados: {attempts + 1}
                    </p>
                  </div>

                  <motion.button
                    onClick={onClose}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-8 rounded-2xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reclamar Recompensa
                  </motion.button>
                </motion.div>
              ) : gameState === 'lost' ? (
                <motion.div
                  className="text-center space-y-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-12 h-12 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-red-400 mb-2">
                      ¡Inténtalo de nuevo!
                    </h3>
                    <p className="text-gray-300">
                      No te preocupes, puedes intentarlo las veces que necesites
                    </p>
                  </div>

                  <motion.button
                    onClick={resetGame}
                    className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 px-8 rounded-2xl font-semibold hover:from-sky-600 hover:to-blue-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Intentar Nuevamente
                  </motion.button>
                </motion.div>
              ) : (
                renderGame()
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameModal;