import React, { useState } from 'react';
import { Play, Square, Camera, Settings, AlertTriangle } from 'lucide-react';
import { PoseDetector } from './PoseDetector';
import { useTrainingStore } from '../store/trainingStore';

export const CameraAI: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);
  const [currentExercise, setCurrentExercise] = useState('Deep Squat');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);
  
  const { detectionMetrics, updateDetectionMetrics } = useTrainingStore();

  const startDetection = () => {
    setIsActive(true);
    setAlerts([]);
  };

  const stopDetection = () => {
    setIsActive(false);
  };

  const handlePoseDetected = (results: any) => {
    setDetectionCount(prev => prev + 1);
    
    // Simular análisis de valgo
    const mockValgo = Math.random() * 10 - 5; // -5° a +5°
    const mockQuality = Math.max(0, 100 - Math.abs(mockValgo) * 10);
    
    updateDetectionMetrics({
      valgoAngle: mockValgo,
      kneeAngle: 85 + Math.random() * 10,
      hipAngle: 90 + Math.random() * 5,
      quality: mockQuality
    });

    // Generar alertas basadas en el análisis
    const newAlerts: string[] = [];
    if (Math.abs(mockValgo) > 3) {
      newAlerts.push(`⚠️ Valgo detectado: ${mockValgo.toFixed(1)}°`);
    }
    if (mockQuality < 80) {
      newAlerts.push(`📉 Calidad baja: ${mockQuality.toFixed(0)}%`);
    }
    setAlerts(newAlerts);
  };

  const exercises = [
    'Deep Squat',
    'Pistol Squat',
    'Nordic Curl',
    'Animal Flow - Crab',
    'Animal Flow - Ape',
    'Copenhagen Plank'
  ];

  return (
    <div className="space-y-6">
      {/* Panel de Control */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Control de Entrenamiento</h3>
          <div className="flex items-center space-x-2">
            <select
              value={currentExercise}
              onChange={(e) => setCurrentExercise(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              disabled={isActive}
            >
              {exercises.map(exercise => (
                <option key={exercise} value={exercise}>{exercise}</option>
              ))}
            </select>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Alertas */}
        {alerts.length > 0 && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="font-medium text-yellow-800">Alertas de Técnica</span>
            </div>
            <ul className="space-y-1">
              {alerts.map((alert, index) => (
                <li key={index} className="text-sm text-yellow-700">{alert}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={startDetection}
            disabled={isActive}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Play className="h-4 w-4 mr-2" />
            Iniciar Detección
          </button>
          <button
            onClick={stopDetection}
            disabled={!isActive}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            <Square className="h-4 w-4 mr-2" />
            Detener
          </button>
          <button
            onClick={() => setDetectionCount(0)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Camera className="h-4 w-4 mr-2" />
            Reiniciar Contador
          </button>
        </div>
      </div>

      {/* Detector de Poses */}
      <PoseDetector 
        isActive={isActive} 
        onPoseDetected={handlePoseDetected}
      />

      {/* Panel de Métricas */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de {currentExercise}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {detectionMetrics.kneeAngle.toFixed(0)}°
            </div>
            <div className="text-sm text-green-700">Ánglo Rodilla</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {detectionMetrics.valgoAngle.toFixed(1)}°
            </div>
            <div className="text-sm text-yellow-700">Valgo</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {detectionMetrics.quality.toFixed(0)}%
            </div>
            <div className="text-sm text-blue-700">Calidad</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {detectionCount}
            </div>
            <div className="text-sm text-purple-700">Detecciones</div>
          </div>
        </div>
      </div>

      {/* Configuración Avanzada */}
      {showAdvanced && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de IA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sensibilidad de Valgo
              </label>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="3"
                className="w-full"
              />
              <span className="text-xs text-gray-500">Umbral: 3°</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frecuencia de Captura
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="30">30 FPS</option>
                <option value="15">15 FPS</option>
                <option value="5">5 FPS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modo de Análisis
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="realtime">Tiempo Real</option>
                <option value="frame">Por Frame</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notificaciones
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Valgo severo</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Fatiga técnica</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};