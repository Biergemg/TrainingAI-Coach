import React, { useState, useEffect } from 'react';
import { Camera, User, TrendingUp, Target, Award, Settings, Play, Pause } from 'lucide-react';
import { CameraAI } from './CameraAI';
import { TPoseCalibration } from './TposeCalibration';
import { EliteRoutineGenerator } from './EliteRoutineGenerator';
import { PatternAnalysis } from './PatternAnalysis';
import { AutoProgression } from './AutoProgression';
import { NoCameraMode } from './NoCameraMode';
import { useTrainingStore } from '../store/trainingStore';
import { EliteDatabase } from '../lib/database';

interface EliteTrainingSystemProps {
  athleteId?: string;
}

export const EliteTrainingSystem: React.FC<EliteTrainingSystemProps> = ({ athleteId }) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'routines' | 'analysis' | 'progression' | 'settings'>('camera');
  const [calibrationComplete, setCalibrationComplete] = useState(false);
  const [useCamera, setUseCamera] = useState(true);
  const [currentAthleteId, setCurrentAthleteId] = useState<string>('');
  const [athleteData, setAthleteData] = useState<any>(null);
  const [phvStatus, setPhvStatus] = useState<any>(null);
  
  const { currentAthlete, setCurrentAthlete } = useTrainingStore();
  const database = EliteDatabase.getInstance();

  useEffect(() => {
    if (athleteId) {
      setCurrentAthleteId(athleteId);
      loadAthleteData(athleteId);
    } else {
      // Crear atleta demo si no hay ID
      createDemoAthlete();
    }
  }, [athleteId]);

  const loadAthleteData = async (id: string) => {
    try {
      const athlete = await database.getAthlete(id);
      const phv = await database.getCurrentPHVStatus(id);
      
      setAthleteData(athlete);
      setPhvStatus(phv);
      setCurrentAthlete(athlete);
      
    } catch (error) {
      console.error('Error loading athlete data:', error);
      createDemoAthlete();
    }
  };

  const createDemoAthlete = async () => {
    const demoAthlete = {
      id: 'demo-athlete-001',
      name: 'Atleta Demo Elite',
      age: 20,
      sport: 'soccer',
      position: 'striker',
      experience: 'advanced' as 'beginner' | 'intermediate' | 'advanced' | 'elite',
      height: 175,
      weight: 70,
      goals: ['mejorar potencia', 'aumentar velocidad', 'reducir lesiones'],
      injuryHistory: ['esguince tobillo leve'],
      trainingYears: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    try {
      await database.addAthlete(demoAthlete);
      setAthleteData(demoAthlete);
      setCurrentAthleteId(demoAthlete.id);
      setCurrentAthlete(demoAthlete);
    } catch (error) {
      console.error('Error creating demo athlete:', error);
    }
  };

  const handleCalibrationComplete = () => {
    setCalibrationComplete(true);
  };

  const tabs = [
    { id: 'camera', name: 'Entrenamiento IA', icon: Camera },
    { id: 'routines', name: 'Rutinas Elite', icon: Target },
    { id: 'analysis', name: 'Análisis Patrones', icon: TrendingUp },
    { id: 'progression', name: 'Progresión Auto', icon: Award },
    { id: 'settings', name: 'Configuración', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">TrainingAI Coach Elite</h1>
              </div>
            </div>
            
            {athleteData && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{athleteData.name}</p>
                  <p className="text-xs text-gray-500">{athleteData.sport} • {athleteData.experience}</p>
                </div>
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PHV Status Alert */}
        {phvStatus && phvStatus.currentPHV && phvStatus.currentPHV.restrictions.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-5 w-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">PHV</span>
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Restricciones PHV Activas
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc list-inside space-y-1">
                    {phvStatus.currentPHV.restrictions.map((restriction: string, index: number) => (
                      <li key={index}>{restriction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'camera' && (
          <div className="space-y-6">
            {!calibrationComplete && useCamera ? (
              <TPoseCalibration onCalibrationComplete={handleCalibrationComplete} onSkip={() => setCalibrationComplete(true)} />
            ) : useCamera ? (
              <CameraAI />
            ) : (
              <NoCameraMode />
            )}
            
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Modo de Entrenamiento</span>
                <button
                  onClick={() => setUseCamera(!useCamera)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    useCamera
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  {useCamera ? 'Con Cámara' : 'Sin Cámara'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'routines' && currentAthleteId && (
          <EliteRoutineGenerator
            athleteId={currentAthleteId}
            sport={athleteData?.sport}
            position={athleteData?.position}
            experience={athleteData?.experience}
            phvStatus={phvStatus}
          />
        )}

        {activeTab === 'analysis' && currentAthleteId && (
          <PatternAnalysis athleteId={currentAthleteId} />
        )}

        {activeTab === 'progression' && currentAthleteId && (
          <div className="space-y-6">
            <AutoProgression
              athleteId={currentAthleteId}
              currentExerciseId="fms_deep_squat_elite"
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuración Elite</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Modo Desarrollador</h3>
                  <p className="text-sm text-gray-500">Ver logs y métricas detalladas</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Activar
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Exportar Datos</h3>
                  <p className="text-sm text-gray-500">Descargar historial completo</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Exportar
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Reiniciar Progreso</h3>
                  <p className="text-sm text-gray-500">Borrar todos los datos (irreversible)</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Reiniciar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};