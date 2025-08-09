import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { calendarData } from '../../data/calendarData';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

const AdminGames = () => {
  const [games, setGames] = useState(calendarData.games);
  const [editingGame, setEditingGame] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (gameKey) => {
    setEditingGame(gameKey);
    setFormData({ ...games[gameKey] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setGames(prev => ({ ...prev, [editingGame]: formData }));
    setEditingGame(null);
    // En un entorno real, aquí se enviaría a la base de datos
    alert(`Juego ${editingGame} actualizado. (Simulado)`);
  };

  const handleCancel = () => {
    setEditingGame(null);
  };

  const handleDelete = (gameKey) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el juego "${games[gameKey].name}"?`)) {
      const newGames = { ...games };
      delete newGames[gameKey];
      setGames(newGames);
      // En un entorno real, aquí se enviaría a la base de datos
      alert(`Juego ${games[gameKey].name} eliminado. (Simulado)`);
    }
  };

  const handleAddGame = () => {
    const newGameKey = `newGame${Object.keys(games).length + 1}`;
    setEditingGame(newGameKey);
    setFormData({ name: '', description: '', type: 'memory' }); // Default type
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-100">Gestión de Minijuegos</h2>
      <p className="text-gray-300">Aquí puedes configurar los detalles de cada minijuego.</p>

      <motion.button
        onClick={handleAddGame}
        className="flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-sky-700 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <PlusCircle size={20} />
        Agregar Nuevo Juego
      </motion.button>

      <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Clave</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {Object.entries(games).map(([gameKey, data]) => (
              <tr key={gameKey} className="hover:bg-gray-600 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">{gameKey}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                  {editingGame === gameKey ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-gray-100 rounded-md p-2"
                    />
                  ) : (
                    data.name
                  )}
                </td>
                <td className="px-6 py-4 text-gray-200">
                  {editingGame === gameKey ? (
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-gray-100 rounded-md p-2"
                      rows="2"
                    />
                  ) : (
                    data.description
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingGame === gameKey ? (
                    <div className="flex gap-2">
                      <motion.button
                        onClick={handleSave}
                        className="text-green-400 hover:text-green-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Guardar
                      </motion.button>
                      <motion.button
                        onClick={handleCancel}
                        className="text-red-400 hover:text-red-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Cancelar
                      </motion.button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEdit(gameKey)}
                        className="text-sky-400 hover:text-sky-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(gameKey)}
                        className="text-red-400 hover:text-red-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminGames;