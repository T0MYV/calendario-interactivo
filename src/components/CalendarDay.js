import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, Gift } from 'lucide-react';

const CalendarDay = ({ 
  day, 
  month, 
  monthName, 
  isUnlocked, 
  isSpecial, 
  onClick, 
  index 
}) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    if (!isUnlocked) return;
    
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      onClick();
    }, 600);
  };

  const getBackgroundGradient = () => {
    if (!isUnlocked) return 'from-gray-600 to-gray-700';
    if (isSpecial) return 'from-sky-400 to-blue-500';
    if (day === 31 && month === 8) return 'from-amber-400 via-orange-500 to-red-500';
    return 'from-emerald-400 to-green-500';
  };

  const getHoverGradient = () => {
    if (!isUnlocked) return 'hover:from-gray-700 hover:to-gray-800';
    if (isSpecial) return 'hover:from-sky-500 hover:to-blue-600';
    if (day === 31 && month === 8) return 'hover:from-amber-500 hover:via-orange-600 hover:to-red-600';
    return 'hover:from-emerald-500 hover:to-green-600';
  };

  return (
    <motion.div
      className={`relative aspect-square rounded-2xl bg-gradient-to-br ${getBackgroundGradient()} ${getHoverGradient()} shadow-lg cursor-pointer transition-all duration-300 ${
        isUnlocked ? 'hover:shadow-xl hover:scale-105' : 'cursor-not-allowed opacity-60'
      }`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotate: isShaking ? [0, -5, 5, -5, 5, 0] : 0,
        x: isShaking ? [0, -2, 2, -2, 2, 0] : 0
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.02,
        rotate: { duration: 0.6 },
        x: { duration: 0.6 }
      }}
      onClick={handleClick}
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
    >
      {/* Contenido del día */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
        {/* Número del día */}
        <motion.span 
          className="text-lg md:text-xl font-bold mb-1"
          animate={isShaking ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.6 }}
        >
          {day}
        </motion.span>
        
        {/* Mes (solo para días que no son de enero) */}
        {monthName && (
          <span className="text-xs opacity-90 font-medium">
            {monthName}
          </span>
        )}

        {/* Iconos especiales */}
        <div className="absolute top-1 right-1">
          {!isUnlocked && <Lock className="w-3 h-3 md:w-4 md:h-4" />}
          {isSpecial && isUnlocked && <Star className="w-3 h-3 md:w-4 md:h-4" />}
          {day === 31 && month === 8 && isUnlocked && (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Gift className="w-4 h-4 md:w-5 md:h-5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Efecto de brillo para días especiales */}
      {isSpecial && isUnlocked && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: [-100, 100] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Partículas para el día 31 de agosto */}
      {day === 31 && month === 8 && isUnlocked && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`
              }}
              animate={{
                y: [-5, 5, -5],
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default CalendarDay;