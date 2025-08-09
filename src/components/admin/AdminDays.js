import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { calendarData } from '../../data/calendarData';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

const AdminDays = () => {
  const [days, setDays] = useState(calendarData.rewards);
  const [editingDay, setEditingDay] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (day) => {
    setEditingDay(day);
    setFormData({ ...days[day] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setDays(prev => ({ ...prev, [editingDay]: formData }));
    setEditingDay(null);
    // En un entorno real, aquí se enviaría a la base de datos
    alert(`Día ${editingDay} actualizado. (Simulado)`);
  };

  const handleCancel = () => {
    setEditingDay(null);
  };

  const handleDelete = (day) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el día ${day}?`)) {
      const newDays = { ...days };
      delete newDays[day];
      setDays(newDays);
      // En un entorno real, aquí se enviaría a la base de datos
      alert(`Día ${day} eliminado. (Simulado)`);
    }
  };

  const handleAddDay = () => {
    const newDayNum = Object.keys(days).length + 1;
    setEditingDay(newDayNum);
    setFormData({ type: 'text', content: '', unlocked: false });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-100">Gestión de Días del Calendario</h2>
      <p className="text-gray-300">Aquí puedes editar el contenido de cada día del calendario.</p>

      <motion.button
        onClick={handleAddDay}
        className="flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-sky-700 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <PlusCircle size={20} />
        Agregar Nuevo Día
      </motion.button>

      <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Día</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Contenido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Desbloqueado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {Object.entries(days).map(([dayNum, data]) => (
              <tr key={dayNum} className="hover:bg-gray-600 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">{dayNum}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                  {editingDay === dayNum ? (
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="bg-gray-800 text-gray-100 rounded-md p-2"
                    >
                      <option value="text">Texto</option>
                      <option value="image">Imagen</option>
                      <option value="game">Juego</option>
                      <option value="special">Especial</option>
                    </select>
                  ) : (
                    data.type
                  )}
                </td>
                <td className="px-6 py-4 text-gray-200">
                  {editingDay === dayNum ? (
                    <input
                      type="text"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-gray-100 rounded-md p-2"
                    />
                  ) : (
                    data.content
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                  {editingDay === dayNum ? (
                    <input
                      type="checkbox"
                      name="unlocked"
                      checked={formData.unlocked}
                      onChange={(e) => setFormData(prev => ({ ...prev, unlocked: e.target.checked }))}
                      className="form-checkbox h-5 w-5 text-sky-600 rounded"
                    />
                  ) : (
                    data.unlocked ? 'Sí' : 'No'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingDay === dayNum ? (
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
                        onClick={() => handleEdit(dayNum)}
                        className="text-sky-400 hover:text-sky-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(dayNum)}
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

export default AdminDays;