import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export const useCalendarProgress = () => {
  const [progress, setProgress] = useLocalStorage('calendar_progress', {
    unlockedDays: [],
    completedGames: [],
    finalChallengesCompleted: []
  });

  const unlockDay = (day) => {
    setProgress(prev => ({
      ...prev,
      unlockedDays: [...new Set([...prev.unlockedDays, day])]
    }));
  };

  const completeGame = (day, gameType) => {
    setProgress(prev => ({
      ...prev,
      completedGames: [...new Set([...prev.completedGames, `${day}-${gameType}`])]
    }));
  };

  const completeFinalChallenge = (challengeId) => {
    setProgress(prev => ({
      ...prev,
      finalChallengesCompleted: [...new Set([...prev.finalChallengesCompleted, challengeId])]
    }));
  };

  const isGameCompleted = (day, gameType) => {
    return progress.completedGames.includes(`${day}-${gameType}`);
  };

  const isFinalChallengeCompleted = (challengeId) => {
    return progress.finalChallengesCompleted.includes(challengeId);
  };

  const resetProgress = () => {
    setProgress({
      unlockedDays: [],
      completedGames: [],
      finalChallengesCompleted: []
    });
  };

  return {
    progress,
    unlockDay,
    completeGame,
    completeFinalChallenge,
    isGameCompleted,
    isFinalChallengeCompleted,
    resetProgress
  };
};