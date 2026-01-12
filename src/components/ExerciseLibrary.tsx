import React, { useState } from 'react';
import { Play, BookOpen, Filter, Search } from 'lucide-react';
import { useTrainingStore } from '../store/trainingStore';

export const ExerciseLibrary: React.FC = () => {
  const { exercises, setCurrentExercise } = useTrainingStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'Todos', icon: BookOpen },
    { id: 'fms', name: 'FMS', icon: Play },
    { id: 'animal_flow', name: 'Animal Flow', icon: Play },
    { id: 'calisthenics', name: 'Calistenia', icon: Play },
    { id: 'plyometrics', name: 'Plyometría', icon: Play },
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const startExercise = (exercise: any) => {
    setCurrentExercise(exercise);
    // Navegar a la cámara
    window.location.href = '/camera';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Búsqueda y Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar ejercicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de Ejercicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map(exercise => (
          <div key={exercise.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{exercise.category.replace('_', ' ')}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty}
              </span>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Músculos Objetivo:</h4>
              <div className="flex flex-wrap gap-1">
                {exercise.targetMuscles.map(muscle => (
                  <span key={muscle} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Instrucciones:</h4>
              <ol className="text-sm text-gray-600 space-y-1">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="text-blue-600 mr-2">{index + 1}.</span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => startExercise(exercise)}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="h-4 w-4 mr-2" />
                Iniciar
              </button>
              <button
                onClick={() => setSelectedExercise(exercise)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron ejercicios</h3>
          <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda</p>
        </div>
      )}

      {/* Modal de Detalles */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedExercise.name}</h2>
                  <p className="text-gray-600 capitalize">{selectedExercise.category.replace('_', ' ')}</p>
                </div>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Descripción Completa</h3>
                  <p className="text-gray-600">
                    Este ejercicio está diseñado para mejorar la técnica y fortalecer los músculos objetivo. 
                    Asegúrate de mantener la forma correcta durante toda la ejecución.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Beneficios</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Mejora la movilidad articular</li>
                    <li>Fortalece músculos estabilizadores</li>
                    <li>Corrige patrones de movimiento</li>
                    <li>Previene lesiones</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Precauciones</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Mantener la espalda recta</li>
                    <li>No forzar el rango de movimiento</li>
                    <li>Detener si hay dolor</li>
                    <li>Respirar de forma controlada</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    startExercise(selectedExercise);
                    setSelectedExercise(null);
                  }}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Comenzar Ejercicio
                </button>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};