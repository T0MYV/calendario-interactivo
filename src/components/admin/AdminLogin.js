import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Credenciales de prueba (en un entorno real, esto iría a un backend)
    if (username === 'admin' && password === 'admin') {
      onLogin(true);
    } else {
      setError('Credenciales incorrectas. ¿Olvidaste tu contraseña? ¡Qué despistado!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4"
    >
      <motion.div
        className="bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md border border-gray-700"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-2">Acceso de Administrador</h2>
          <p className="text-gray-400">Inicia sesión para controlar el calendario mágico.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="username"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 text-gray-100 border border-gray-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all duration-200"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 text-gray-100 border border-gray-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all duration-200"
                placeholder="admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-sky-700 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Iniciar Sesión
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;