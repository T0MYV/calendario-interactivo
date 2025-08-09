import React from 'react';
import { motion } from 'framer-motion';
import { Home, LogOut, Skull } from 'lucide-react'; // Importa el icono Skull

const AdminNav = ({ currentPath, onNavigate, onLogout }) => {
  const navItems = [
    { name: 'Dashboard', path: 'dashboard' },
    { name: 'Días', path: 'days' },
    { name: 'Juegos', path: 'games' },
    { name: 'Usuarios', path: 'users' },
    { name: 'Estadísticas', path: 'stats' },
    { name: 'Configuración', path: 'settings' },
    { name: 'Troleo', path: 'troll', icon: Skull }, // Añade el elemento de navegación para Troleo
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-4 rounded-xl shadow-lg mb-8 flex flex-wrap justify-center gap-4"
    >
      <motion.button
        onClick={() => onNavigate('dashboard')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Home size={18} />
        Inicio
      </motion.button>

      {navItems.map((item) => (
        <motion.button
          key={item.path}
          onClick={() => onNavigate(item.path)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPath === item.path
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-gray-300 hover:bg-gray-700'
          } ${item.icon ? 'flex items-center gap-2' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.icon && <item.icon size={18} />}
          {item.name}
        </motion.button>
      ))}

      <motion.button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:bg-red-900 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogOut size={18} />
        Cerrar Sesión
      </motion.button>
    </motion.nav>
  );
};

export default AdminNav;