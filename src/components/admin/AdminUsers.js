import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Edit, Trash2, UserCheck } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', role: 'Administrador', email: 'admin@example.com' },
    { id: 2, username: 'usuario1', role: 'Normal', email: 'user1@example.com' },
    { id: 3, username: 'usuario2', role: 'Normal', email: 'user2@example.com' },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ ...user });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUsers(prev => prev.map(user => (user.id === editingUser ? formData : user)));
    setEditingUser(null);
    // En un entorno real, aquí se enviaría a la base de datos
    alert(`Usuario ${formData.username} actualizado. (Simulado)`);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? ¡No hay vuelta atrás!')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      // En un entorno real, aquí se enviaría a la base de datos
      alert('Usuario eliminado. (Simulado)');
    }
  };

  const handleAddUser = () => {
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      username: '',
      role: 'Normal',
      email: ''
    };
    setUsers(prev => [...prev, newUser]);
    setEditingUser(newUser.id);
    setFormData(newUser);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-100">Gestión de Usuarios</h2>
      <p className="text-gray-300">Administra las cuentas de usuario, roles y permisos. ¡El poder está en tus manos!</p>

      <motion.button
        onClick={handleAddUser}
        className="flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-sky-700 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <UserPlus size={20} />
        Agregar Nuevo Usuario
      </motion.button>

      <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-600 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-gray-100 rounded-md p-2"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                  {editingUser === user.id ? (
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="bg-gray-800 text-gray-100 rounded-md p-2"
                    >
                      <option value="Administrador">Administrador</option>
                      <option value="Normal">Normal</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                  {editingUser === user.id ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-gray-100 rounded-md p-2"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingUser === user.id ? (
                    <div className="flex gap-2">
                      <motion.button
                        onClick={handleSave}
                        className="text-green-400 hover:text-green-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <UserCheck size={18} />
                      </motion.button>
                      <motion.button
                        onClick={handleCancel}
                        className="text-red-400 hover:text-red-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEdit(user)}
                        className="text-sky-400 hover:text-sky-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(user.id)}
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

export default AdminUsers;