import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Gamepad2, Settings, BarChart2, Skull } from 'lucide-react'; // Importa Skull

const AdminDashboard = ({ onNavigate }) => {
  const cards = [
    { title: 'Gestión de Días', icon: Calendar, path: 'days', description: 'Administra recompensas y juegos por día.' },
    { title: 'Gestión de Juegos', icon: Gamepad2, path: 'games', description: 'Configura y edita los minijuegos.' },
    { title: 'Gestión de Usuarios', icon: Users, path: 'users', description: 'Administra las cuentas de usuario y roles.' },
    { title: 'Estadísticas', icon: BarChart2, path: 'stats', description: 'Visualiza el uso y progreso del calendario.' },
    { title: 'Configuración General', icon: Settings, path: 'settings', description: 'Ajusta las credenciales y opciones globales.' },
    { title: 'Zona de Troleo', icon: Skull, path: 'troll', description: 'Manipula los juegos para hacerlos más "interesantes".' }, // Nueva tarjeta
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-gray-100 text-center">Panel de Administración</h2>
      <p className="text-gray-300 text-center text-lg">
        Bienvenido, administrador. Aquí puedes controlar el destino de las recompensas y la diversión.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.path}
            className="bg-gray-700 rounded-2xl p-6 shadow-xl border border-gray-600 cursor-pointer hover:bg-gray-600 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(card.path)}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-sky-500 rounded-full mb-4 mx-auto">
              <card.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-100 text-center mb-2">{card.title}</h3>
            <p className="text-gray-300 text-center text-sm">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;