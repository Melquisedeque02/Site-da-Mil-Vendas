// src/admin/AdminLayout.tsx
import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Image, 
  Mail, 
  LogOut,
  Eye,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const navItems = [
    { path: '/auth/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/auth/admin/eventos', icon: <Calendar size={20} />, label: 'Eventos' },
    { path: '/auth/admin/portifolio', icon: <Image size={20} />, label: 'Portfólio' },
    { path: '/auth/admin/contactos', icon: <Mail size={20} />, label: 'Contactos' },
    { path: '/', icon: <Eye size={20} />, label: 'Ver Site' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-colors duration-500">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Admin Panel</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400">Mil Vendas</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;