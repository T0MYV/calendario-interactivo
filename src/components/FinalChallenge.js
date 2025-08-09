import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, CheckCircle, Lock } from 'lucide-react';
import { finalChallenges } from '../data/calendarData';
import GameModal from './GameModal';
import { calendarData } from '../data/calendarData';

const FinalChallenge = ({ 
  isOpen, 
  onClose, 
  completedChallenges, 
  onChallengeComplete 
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [showFinalReward, setShowFinalReward] = useState(false);

  useEffect(() => {
    if (completedChallenges.length === finalChallenges.length) {
      setShowFinalReward(true);
    }
  }, [completedChallenges]);

  const handleChallengeClick = (challenge) => {
    if (completedChallenges.includes(challenge.id)) return;
    
    setSelectedChallenge(challenge);
    setGameModalOpen(true);
  };

  const handleGameComplete = (success) => {
    if (success && selectedChallenge) {
      onChallengeComplete(selectedChallenge.id);
    }
    setGameModalOpen(false);
    setSelectedChallenge(null);
  };

  const getGameData = (challenge) => {
    switch (challenge.type) {
      case 'memory':
        return { cards: challenge.cards };
      case 'puzzle':
        return { size: challenge.size, imageUrl: challenge.imageUrl };
      case 'quiz':
        return { questions: challenge.questions };
      default:
        return {};
    }
  };

  if (showFinalReward) {
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
              className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl max-w-2xl w-full p-8 text-white text-center"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              transition={{ type: "spring", duration: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="space-y-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div
                  className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Trophy className="w-16 h-16 text-amber-200" />
                </motion.div>

                <div>
                  <h1 className="text-5xl font-bold mb-4">
                    🎊 ¡FELICITACIONES! 🎊
                  </h1>
                  <h2 className="text-3xl font-bold mb-6">
                    ¡Has completado el Calendario Mágico!
                  </h2>
                  <p className="text-xl mb-8 leading-relaxed">
                    Has demostrado perseverancia, inteligencia y dedicación. 
                    Completaste todos los desafíos y llegaste hasta el final de esta increíble aventura.
                  </p>
                </div>

                <motion.div
                  className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Tu Recompensa Final:</h3>
                  <div className="text-6xl mb-4">🏆</div>
                  <p className="text-lg">
                    <strong>Certificado de Maestro del Calendario Mágico</strong>
                  </p>
                  <p className="mt-2 text-white/90">
                    Eres oficialmente un Campeón de Desafíos y Explorador de Recompensas
                  </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 text-4xl">
                  {['🎉', '✨', '🌟', '🎊', '🏆', '👑'].map((emoji, index) => (
                    <motion.span
                      key={index}
                      animate={{ 
                        y: [-10, 10, -10],
                        rotate: [-10, 10, -10]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>

                <motion.button
                  onClick={onClose}
                  className="bg-white text-orange-600 py-4 px-8 rounded-2xl font-bold text-xl hover:bg-white/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ¡Increíble! 🎊
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <>
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
              className="bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-8 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-t-3xl text-white">
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="w-10 h-10" />
                  </motion.div>
                  
                  <h1 className="text-4xl font-bold mb-2">
                    🎊 DESAFÍO FINAL 🎊
                  </h1>
                  <p className="text-xl text-white/90">
                    Completa los 3 desafíos supremos para obtener la recompensa final
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="p-6 bg-gray-700">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-gray-300 font-medium">Progreso:</span>
                  <div className="flex-1 max-w-md bg-gray-600 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-emerald-400 to-sky-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedChallenges.length / finalChallenges.length) * 100}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <span className="text-gray-100 font-bold">
                    {completedChallenges.length}/{finalChallenges.length}
                  </span>
                </div>
              </div>

              {/* Challenges */}
              <div className="p-8 space-y-6">
                {finalChallenges.map((challenge, index) => {
                  const isCompleted = completedChallenges.includes(challenge.id);
                  const isLocked = index > 0 && !completedChallenges.includes(finalChallenges[index - 1].id);
                  
                  return (
                    <motion.div
                      key={challenge.id}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                        isCompleted 
                          ? 'bg-emerald-900 border-emerald-700' 
                          : isLocked
                          ? 'bg-gray-700 border-gray-600 opacity-60 cursor-not-allowed'
                          : 'bg-sky-900 border-sky-700 hover:border-sky-600 hover:shadow-lg'
                      }`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => !isLocked && handleChallengeClick(challenge)}
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-emerald-500 text-white' 
                            : isLocked
                            ? 'bg-gray-500 text-white'
                            : 'bg-sky-500 text-white'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-8 h-8" />
                          ) : isLocked ? (
                            <Lock className="w-8 h-8" />
                          ) : (
                            <span className="text-2xl font-bold">{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-100 mb-1">
                            {challenge.title}
                          </h3>
                          <p className="text-gray-300">
                            {challenge.description}
                          </p>
                        </div>
                        
                        {isCompleted && (
                          <motion.div
                            className="text-emerald-400 text-2xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.5 }}
                          >
                            ✅
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-700 rounded-b-3xl">
                <motion.button
                  onClick={onClose}
                  className="w-full bg-gray-600 text-gray-200 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-500 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cerrar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Modal */}
      <GameModal
        isOpen={gameModalOpen}
        onClose={() => setGameModalOpen(false)}
        gameType={selectedChallenge?.type}
        gameData={selectedChallenge ? getGameData(selectedChallenge) : {}}
        onGameComplete={handleGameComplete}
      />
    </>
  );
};

export default FinalChallenge;