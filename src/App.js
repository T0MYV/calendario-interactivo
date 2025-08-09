import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CalendarGrid from './components/CalendarGrid';
import RewardModal from './components/RewardModal';
import GameModal from './components/GameModal';
import FinalChallenge from './components/FinalChallenge';
import { calendarData } from './data/calendarData';
import { useCalendarProgress } from './hooks/useLocalStorage';

import AdminLogin from './components/admin/AdminLogin';
import AdminNav from './components/admin/AdminNav';
import AdminContent from './components/admin/AdminContent';

const CalendarPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [finalChallengeOpen, setFinalChallengeOpen] = useState(false);
  const [currentGameType, setCurrentGameType] = useState(null);

  const {
    progress,
    unlockDay,
    completeGame,
    completeFinalChallenge,
    isGameCompleted,
    isFinalChallengeCompleted
  } = useCalendarProgress();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleDayClick = (day, month) => {
    const dayKey = `${month}-${day}`;
    const reward = calendarData.rewards[day];
    
    if (!reward) return;

    setSelectedDay(day);
    setSelectedMonth(month);
    
    unlockDay(dayKey);
    
    if (day === 31 && month === 8) {
      setFinalChallengeOpen(true);
    } else {
      setRewardModalOpen(true);
    }
  };

  const handleStartGame = (gameType) => {
    if (gameType === 'final') {
      setRewardModalOpen(false);
      setFinalChallengeOpen(true);
      return;
    }

    setCurrentGameType(gameType);
    setRewardModalOpen(false);
    setGameModalOpen(true);
  };

  const handleGameComplete = (success) => {
    if (success && selectedDay && currentGameType) {
      completeGame(selectedDay, currentGameType);
    }
    setGameModalOpen(false);
    setCurrentGameType(null);
  };

  const handleFinalChallengeComplete = (challengeId) => {
    completeFinalChallenge(challengeId);
  };

  const getCurrentReward = () => {
    if (!selectedDay) return null;
    return calendarData.rewards[selectedDay];
  };

  const getCurrentGameData = () => {
    if (!currentGameType) return {};
    return calendarData.games[currentGameType] || {};
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4">
              FELIZ CUMPLEAÑOS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Feliz cumpleaños isabelita
            </p>
          </motion.div>

          {/* Progress Stats */}
          <motion.div
            className="bg-gray-700/80 backdrop-blur-xl border border-gray-600/50 rounded-3xl p-6 mb-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-sky-400">{progress.unlockedDays.length}</p>
                <p className="text-gray-300">Días Desbloqueados</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-400">{progress.completedGames.length}</p>
                <p className="text-gray-300">Juegos Completados</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400">{progress.finalChallengesCompleted.length}/3</p>
                <p className="text-gray-300">Desafíos Finales</p>
              </div>
            </div>
          </motion.div>

          {/* Calendar */}
          <CalendarGrid
            onDayClick={handleDayClick}
            unlockedDays={progress.unlockedDays}
            specialDays={calendarData.specialDays}
          />

          {/* Footer */}
          <motion.footer
            className="text-center mt-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p>Hecho por matteo</p>
            <p className="text-sm mt-2">
              <a href="/admin" className="hover:text-gray-200 transition-colors">⚙ Admin</a>
            </p>
          </motion.footer>
        </motion.div>
      </div>

      {/* Modals */}
      <RewardModal
        isOpen={rewardModalOpen}
        onClose={() => setRewardModalOpen(false)}
        reward={getCurrentReward()}
        day={selectedDay}
        month={selectedMonth}
        onStartGame={handleStartGame}
      />

      <GameModal
        isOpen={gameModalOpen}
        onClose={() => setGameModalOpen(false)}
        gameType={currentGameType}
        gameData={getCurrentGameData()}
        onGameComplete={handleGameComplete}
      />

      <FinalChallenge
        isOpen={finalChallengeOpen}
        onClose={() => setFinalChallengeOpen(false)}
        completedChallenges={progress.finalChallengesCompleted}
        onChallengeComplete={handleFinalChallengeComplete}
      />
    </div>
  );
};

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAdminPath, setCurrentAdminPath] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const handleNavigate = (path) => {
    setCurrentAdminPath(path);
    navigate(`/admin/${path}`);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <AdminNav currentPath={currentAdminPath} onNavigate={handleNavigate} onLogout={handleLogout} />
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-700">
          <AdminContent currentPath={currentAdminPath} onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/admin/*" element={<AdminPage />} /> {/* Usar /* para rutas anidadas */}
      </Routes>
    </Router>
  );
};

export default App;