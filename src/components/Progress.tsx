import React from 'react';
import { TrendingUp, Target, Award, Calendar } from 'lucide-react';
import { useTrainingStore } from '../store/trainingStore';

export const Progress: React.FC = () => {
  const { sessions, exercises, user } = useTrainingStore();

  // Datos mock para demostración
  const progressData = [
    { date: '2024-01-01', quality: 75, valgo: 2.5, repetitions: 12 },
    { date: '2024-01-03', quality: 82, valgo: 1.8, repetitions: 15 },
    { date: '2024-01-05', quality: 88, valgo: 1.2, repetitions: 18 },
    { date: '2024-01-07', quality: 91, valgo: 0.8, repetitions: 20 },
    { date: '2024-01-09', quality: 94, valgo: 0.5, repetitions: 22 },
  ];

  const achievements = [
    { id: 1, title: 'Primera Sesión Completa', description: 'Completaste tu primera sesión de entrenamiento', date: '2024-01-01', icon: '🎯' },
    { id: 2, title: 'Mejora de Técnica', description: 'Mejoraste tu calidad de movimiento en 20%', date: '2024-01-05', icon: '📈' },
    { id: 3, title: 'Valgo Corregido', description: 'Redujiste el valgo de rodilla a menos de 1°', date: '2024-01-09', icon: '✅' },
  ];

  const stats = [
    { label: 'Sesiones Completadas', value: sessions.length || 23, change: '+15%', icon: Calendar, color: 'text-blue-600' },
    { label: 'Calidad Promedio', value: '89%', change: '+12%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Valgo Promedio', value: '0.8°', change: '-68%', icon: Target, color: 'text-purple-600' },
    { label: 'Logros Desbloqueados', value: achievements.length, change: '+3', icon: Award, color: 'text-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráfico de Progreso */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolución de Calidad de Movimiento</h3>
        <div className="space-y-4">
          {progressData.map((data, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 text-sm text-gray-600">
                {new Date(data.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Calidad: {data.quality}%</span>
                  <span className="text-sm text-gray-500">Valgo: {data.valgo}°</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${data.quality}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {data.repetitions} reps
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Logros Recientes</h3>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(achievement.date).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Próximos Objetivos */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Objetivos</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-medium text-blue-900">Perfeccionar Deep Squat</h4>
              <p className="text-sm text-blue-700">Alcanzar 95% de calidad técnica</p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            <span className="text-sm text-blue-600 font-medium">89%</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <h4 className="font-medium text-green-900">Eliminar Valgo</h4>
              <p className="text-sm text-green-700">Mantener valgo bajo 0.5° por 5 sesiones</p>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">3/5</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div>
              <h4 className="font-medium text-purple-900">Aumentar Repeticiones</h4>
              <p className="text-sm text-purple-700">Realizar 25 repeticiones perfectas</p>
              <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <span className="text-sm text-purple-600 font-medium">22/25</span>
          </div>
        </div>
      </div>

      {/* Análisis Detallado */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Técnica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Ángulos Clave</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rodilla Izquierda</span>
                <span className="text-sm font-medium text-gray-900">85°</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rodilla Derecha</span>
                <span className="text-sm font-medium text-gray-900">87°</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cadera</span>
                <span className="text-sm font-medium text-gray-900">92°</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tobillo</span>
                <span className="text-sm font-medium text-gray-900">78°</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Métricas de Calidad</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Simetría</span>
                <span className="text-sm font-medium text-green-600">Excelente</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Estabilidad</span>
                <span className="text-sm font-medium text-green-600">Buena</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Control</span>
                <span className="text-sm font-medium text-yellow-600">Mejorable</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Consistencia</span>
                <span className="text-sm font-medium text-green-600">Alta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};