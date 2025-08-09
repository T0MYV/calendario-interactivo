import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminDays from './AdminDays';
import AdminGames from './AdminGames';
import AdminUsers from './AdminUsers';
import AdminStats from './AdminStats';
import AdminSettings from './AdminSettings';
import AdminTroll from './AdminTroll'; // Importa el nuevo componente

const AdminContent = ({ currentPath, onNavigate }) => {
  switch (currentPath) {
    case 'dashboard':
      return <AdminDashboard onNavigate={onNavigate} />;
    case 'days':
      return <AdminDays />;
    case 'games':
      return <AdminGames />;
    case 'users':
      return <AdminUsers />;
    case 'stats':
      return <AdminStats />;
    case 'settings':
      return <AdminSettings />;
    case 'troll': // Nueva ruta para el troleo
      return <AdminTroll />;
    default:
      return <AdminDashboard onNavigate={onNavigate} />;
  }
};

export default AdminContent;