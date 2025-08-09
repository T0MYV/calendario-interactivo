import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, PieChart, LineChart } from 'lucide-react';

const AdminStats = () => {
  // Datos de ejemplo para las estadísticas (en un entorno real, vendrían de la base de datos)
  const statsData = {
    totalVisits: 12345,
    uniqueVisitors: 5678,
    daysAccessed: 25,
    gamesCompleted: 150,
    deviceDistribution: [
      { name: 'Desktop', value: 60 },
      { name: 'Mobile', value: 35 },
      { name: 'Tablet', value: 5 },
    ],
    accessLog: [
      { id: 1, ip: '192.168.1.1', date: '2025-01-01', device: 'Desktop' },
      { id: 2, ip: '10.0.0.5', date: '2025-01-01', device: 'Mobile' },
      { id: 3, ip: '172.16.0.10', date: '2025-01-02', device: 'Tablet' },
      { id: 4, ip: '192.168.1.2', date: '2025-01-02', device: 'Desktop' },
      { id: 5, ip: '10.0.0.6', date: '2025-01-03', device: 'Mobile' },
    ],
    heatmapData: {
      1: 100, 2: 90, 3: 80, 4: 70, 5: 60, 6: 50, 7: 40, 8: 30, 9: 20, 10: 100,
      11: 95, 12: 85, 13: 75, 14: 65, 15: 100, 16: 90, 17: 80, 18: 70, 19: 60, 20: 100,
      21: 95, 22: 85, 23: 75, 24: 65, 25: 100, 26: 90, 27: 80, 28: 70, 29: 60, 30: 100,
      31: 120 // Día final, siempre popular
    }
  };

  const getHeatmapColor = (value) => {
    if (value > 90) return 'bg-red-500';
    if (value > 70) return 'bg-orange-500';
    if (value > 50) return 'bg-yellow-500';
    if (value > 30) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-100">Estadísticas del Calendario</h2>
      <p className="text-gray-300">Un vistazo a cómo los usuarios interactúan con tu calendario mágico. ¡Prepárate para la verdad!</p>

      {/* Resumen de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600 text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-gray-300 text-sm">Visitas Totales</p>
          <p className="text-4xl font-bold text-sky-400 mt-2">{statsData.totalVisits}</p>
        </motion.div>
        <motion.div
          className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600 text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-300 text-sm">Visitantes Únicos</p>
          <p className="text-4xl font-bold text-emerald-400 mt-2">{statsData.uniqueVisitors}</p>
        </motion.div>
        <motion.div
          className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600 text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-300 text-sm">Días Accedidos</p>
          <p className="text-4xl font-bold text-amber-400 mt-2">{statsData.daysAccessed}</p>
        </motion.div>
        <motion.div
          className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600 text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-300 text-sm">Juegos Completados</p>
          <p className="text-4xl font-bold text-purple-400 mt-2">{statsData.gamesCompleted}</p>
        </motion.div>
      </div>

      {/* Mapa de Calor de Días Accedidos */}
      <div className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600">
        <h3 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <BarChart size={24} /> Mapa de Calor de Días Accedidos
        </h3>
        <p className="text-gray-300 mb-4">¿Qué días son los más populares? ¡Descúbrelo aquí!</p>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(statsData.heatmapData).map(([day, value]) => (
            <motion.div
              key={day}
              className={`aspect-square rounded-lg flex items-center justify-center text-white font-bold ${getHeatmapColor(value)}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: parseInt(day) * 0.03 }}
              title={`Día ${day}: ${value} accesos`}
            >
              {day}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Registro de Accesos */}
      <div className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600">
        <h3 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <LineChart size={24} /> Registro de Accesos Recientes
        </h3>
        <p className="text-gray-300 mb-4">Quién, cuándo y desde dónde. ¡No se te escapa nada!</p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">IP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Dispositivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {statsData.accessLog.map((log) => (
                <tr key={log.id} className="hover:bg-gray-600 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">{log.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">{log.ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">{log.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">{log.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminStats;