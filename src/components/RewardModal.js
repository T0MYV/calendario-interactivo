import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Star, Gamepad2 } from 'lucide-react';

const RewardModal = ({ 
  isOpen, 
  onClose, 
  reward, 
  day, 
  month, 
  onStartGame 
}) => {
  if (!reward) return null;

  const getIcon = () => {
    switch (reward.type) {
      case 'game':
        return <Gamepad2 className="w-8 h-8 text-sky-500" />;
      case 'special':
        return <Star className="w-8 h-8 text-amber-500" />;
      default:
        return <Gift className="w-8 h-8 text-emerald-500" />;
    }
  };

  const getTitle = () => {
    if (day === 31 && month === 8) {
      return '🎊 ¡GRAN FINAL! 🎊';
    }
    return `Día ${day} ${month > 1 ? `de ${getMonthName(month)}` : ''}`;
  };

  const getMonthName = (monthNum) => {
    const months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'];
    return months[monthNum];
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
            className="bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
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
              
              <div className="text-center">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  {getIcon()}
                </motion.div>
                
                <h2 className="text-2xl font-bold mb-2">
                  {getTitle()}
                </h2>
                
                <p className="text-white/90">
                  {reward.type === 'game' ? 'Desafío Desbloqueado' : 'Recompensa del Día'}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {reward.type === 'game' ? (
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">🎮</div>
                  <h3 className="text-xl font-bold text-gray-100">
                    {reward.content}
                  </h3>
                  <p className="text-gray-300">
                    Completa este desafío para desbloquear tu recompensa especial
                  </p>
                  <motion.button
                    onClick={() => onStartGame(reward.game)}
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-sky-600 hover:to-blue-700 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Comenzar Desafío
                  </motion.button>
                </div>
              ) : reward.type === 'special' ? (
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">🎊</div>
                  <h3 className="text-xl font-bold text-gray-100">
                    ¡Has llegado al final!
                  </h3>
                  <p className="text-gray-300">
                    Prepárate para el desafío supremo que te llevará a la recompensa final
                  </p>
                  <motion.button
                    onClick={() => onStartGame('final')}
                    className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-3 px-6 rounded-2xl font-semibold hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Comenzar Desafío Final
                  </motion.button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">
                    {reward.type === 'image' ? reward.content : '📝'}
                  </div>
                  <div className="text-gray-100 text-lg leading-relaxed">
                    {reward.content}
                  </div>
                </div>
              )}
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
  );
};

export default RewardModal;