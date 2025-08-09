import React from 'react';
import { motion } from 'framer-motion';
import CalendarDay from './CalendarDay';

const CalendarGrid = ({ onDayClick, unlockedDays, specialDays }) => {
  const today = new Date();
  const currentYear = today.getFullYear();

  const startDate = new Date(currentYear, 7, 9);
  const endDate = new Date(currentYear, 7, 31);

  const generateDays = () => {
    const days = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const isCurrentDayOrPast = currentDate <= today;

      days.push({
        day,
        month,
        year,
        unlocked: isCurrentDayOrPast,
        monthName: 'Ago'
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const days = generateDays();

  const startDayOfWeek = startDate.getDay();
  const emptyDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  return (
    <motion.div
      className="bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent mb-2">
          CALENDARIO DE AGOSTO
        </h2>
        <p className="text-gray-300 text-lg">
          Revisa diario para no perderte las recompensas
        </p>
      </motion.div>


      <div className="grid grid-cols-7 gap-1 mb-2">
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
          <div key={index} className="text-center text-gray-400 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3 md:gap-4">
        {Array.from({ length: emptyDays }).map((_, index) => (
          <div key={`empty-${index}`} className="h-12"></div>
        ))}

        {days.map((dayInfo, index) => {
          const dayKey = `${dayInfo.month}-${dayInfo.day}`;
          const isSpecial = specialDays.includes(dayInfo.day);
          const isUnlocked = dayInfo.unlocked;
          
          return (
            <CalendarDay
              key={dayKey}
              day={dayInfo.day}
              month={dayInfo.month}
              monthName={dayInfo.monthName}
              isUnlocked={isUnlocked}
              isSpecial={isSpecial}
              onClick={() => onDayClick(dayInfo.day, dayInfo.month)}
              index={index}
            />
          );
        })}
      </div>

      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg"></div>
          <span className="text-gray-300">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg"></div>
          <span className="text-gray-300">Día Especial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded-lg"></div>
          <span className="text-gray-300">Bloqueado</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalendarGrid;