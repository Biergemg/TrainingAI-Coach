import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Camera, BarChart3, Trophy, Settings, BookOpen } from 'lucide-react';

const menuItems = [
  { path: '/', icon: Activity, label: 'Dashboard' },
  { path: '/exercises', icon: BookOpen, label: 'Ejercicios' },
  { path: '/camera', icon: Camera, label: 'IA Camera' },
  { path: '/progress', icon: BarChart3, label: 'Progreso' },
  { path: '/achievements', icon: Trophy, label: 'Logros' },
  { path: '/settings', icon: Settings, label: 'Configuración' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-sm">
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};