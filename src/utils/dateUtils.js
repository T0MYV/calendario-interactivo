export const getCurrentDate = () => {
  return new Date();
};

export const isDateUnlocked = (day) => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;

  if (currentMonth === 1) {
    return day <= currentDay;
  }

  if (currentMonth >= 2) {
    return true;
  }

  return false;
};

export const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

export const formatDate = (date) => {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getProgressPercentage = (unlockedDays, totalDays) => {
  return Math.round((unlockedDays / totalDays) * 100);
};