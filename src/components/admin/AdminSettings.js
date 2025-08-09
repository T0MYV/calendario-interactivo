import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Unlock, CalendarDays } from 'lucide-react';

const AdminSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Estado para la fecha de inicio del calendario
  const [startDate, setStartDate] = useState(localStorage.getItem('calendarStartDate') || '2025-08-09');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (currentPassword !== 'admin') { // Simulación de verificación de contraseña actual
      setError('La contraseña actual es incorrecta. ¿Olvidaste tu propia contraseña? ¡Qué despistado!');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Las nuevas contraseñas no coinciden. ¡A ver si te concentras!');
      return;
    }

    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres. ¡No seas tan predecible!');
      return;
    }

    // En un entorno real, aquí se enviaría a la base de datos para actualizar
    setMessage('Contraseña maestra actualizada con éxito. ¡Ahora no la pierdas!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleUnlockAll = () => {
    if (window.confirm('¿Estás seguro de que quieres desbloquear todos los días del calendario? ¡Esto no tiene vuelta atrás!')) {
      // Lógica para desbloquear todos los días (simulado)
      alert('¡Todos los días del calendario han sido desbloqueados! La magia se ha ido, pero la diversión es instantánea.');
    }
  };

  const handleStartDateChange = (e) => {
    const newDate = e.target.value;
    setStartDate(newDate);
    localStorage.setItem('calendarStartDate', newDate);
    alert(`Fecha de inicio del calendario actualizada a ${newDate}. ¡El tiempo es relativo!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-100">Configuración General</h2>
      <p className="text-gray-300">Ajusta las credenciales de administrador y otras opciones globales.</p>

      {/* Cambiar Credenciales Maestras */}
      <div className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600">
        <h3 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <Key size={24} /> Cambiar Contraseña Maestra
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-gray-300 text-sm font-medium mb-2">
              Contraseña Actual
            </label>
            <input
              type="password"
              id="currentPassword"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-gray-300 text-sm font-medium mb-2">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmNewPassword" className="block text-gray-300 text-sm font-medium mb-2">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {message && <p className="text-green-400 text-sm">{message}</p>}
          <motion.button
            type="submit"
            className="bg-sky-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-sky-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Actualizar Contraseña
          </motion.button>
        </form>
      </div>

      {/* Configurar Fecha de Inicio del Calendario */}
      <div className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600">
        <h3 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <CalendarDays size={24} /> Configurar Fecha de Inicio
        </h3>
        <p className="text-gray-300 mb-4">
          Establece la fecha desde la cual el calendario comenzará a mostrar los días.
          ¡Así no tendrás que ver los días que ya pasaron y no abriste!
        </p>
        <div>
          <label htmlFor="startDate" className="block text-gray-300 text-sm font-medium mb-2">
            Fecha de Inicio (YYYY-MM-DD)
          </label>
          <input
            type="date"
            id="startDate"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
        </div>
      </div>

      {/* Desbloquear Todo */}
      <div className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600">
        <h3 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <Unlock size={24} /> Desbloquear Todo el Calendario
        </h3>
        <p className="text-gray-300 mb-4">
          Esta acción desbloqueará todas las recompensas y juegos del calendario para todos los usuarios.
          ¡Úsalo con sabiduría, o no, total, es tu calendario!
        </p>
        <motion.button
          onClick={handleUnlockAll}
          className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Desbloquear Todo
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AdminSettings;