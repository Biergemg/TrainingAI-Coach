import React, { useState, useEffect } from 'react';
import { Target, Calendar, Clock, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { useTrainingStore } from '../store/trainingStore';
import { EliteDatabase } from '../lib/database';
import { ELITE_ROUTINES_BY_SPORT } from '../data/eliteRoutines';
import { ELITE_EXERCISES_COMPLETE } from '../data/eliteExercisesComplete';

interface EliteRoutineGeneratorProps {
  athleteId: string;
  sport?: string;
  position?: string;
  experience?: string;
  phvStatus?: any;
  onRoutineGenerated?: (routine: any) => void;
}

export const EliteRoutineGenerator: React.FC<EliteRoutineGeneratorProps> = ({ 
  athleteId,
  sport,
  position,
  experience,
  phvStatus,
  onRoutineGenerated 
}) => {
  const [selectedSport, setSelectedSport] = useState<string>(sport || 'general');
  const [selectedPosition, setSelectedPosition] = useState<string>(position || 'assessment');
  const [selectedLevel, setSelectedLevel] = useState<string>(experience || 'elite');
  const [duration, setDuration] = useState<number>(60);
  const [seasonPhase, setSeasonPhase] = useState<string>('in');
  const [goals, setGoals] = useState<string[]>([]);
  const [generatedRoutine, setGeneratedRoutine] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [localPhvStatus, setLocalPhvStatus] = useState<any>(phvStatus);
  
  const { currentAthlete } = useTrainingStore();
  const database = EliteDatabase.getInstance();

  const sports = [
    { value: 'soccer', label: 'Fútbol', positions: ['striker', 'midfielder', 'defender', 'goalkeeper'] },
    { value: 'basketball', label: 'Baloncesto', positions: ['guard', 'forward', 'center'] },
    { value: 'tennis', label: 'Tenis', positions: ['singles', 'doubles'] },
    { value: 'general', label: 'General', positions: ['assessment', 'recovery', 'performance'] }
  ];

  const availableGoals = [
    'Aumentar potencia explosiva',
    'Mejorar velocidad y agilidad',
    'Desarrollar fuerza máxima',
    'Optimizar técnica de movimiento',
    'Prevenir lesiones',
    'Mejorar resistencia específica',
    'Aumentar rango de movimiento',
    'Desarrollar estabilidad core'
  ];

  useEffect(() => {
    if (!phvStatus) {
      loadPHVStatus();
    }
  }, [athleteId]);

  useEffect(() => {
    if (sport) setSelectedSport(sport);
    if (position) setSelectedPosition(position);
    if (experience) setSelectedLevel(experience);
  }, [sport, position, experience]);

  const loadPHVStatus = async () => {
    try {
      const phv = await database.getCurrentPHVStatus(athleteId);
      setLocalPhvStatus(phv);
    } catch (error) {
      console.error('Error loading PHV status:', error);
    }
  };

  const generateEliteRoutine = async () => {
    setIsGenerating(true);
    
    try {
      // Obtener rutinas base del deporte seleccionado
      const sportRoutines = ELITE_ROUTINES_BY_SPORT[selectedSport] || [];
      
      // Filtrar por posición y nivel
      let suitableRoutines = sportRoutines.filter(routine => 
        routine.position === selectedPosition && routine.level === selectedLevel
      );

      // Si no hay rutinas específicas, usar rutinas generales
      if (suitableRoutines.length === 0) {
        suitableRoutines = ELITE_ROUTINES_BY_SPORT['general']?.filter(routine => 
          routine.level === selectedLevel
        ) || [];
      }

      // Adaptar rutina según PHV status
      const adaptedRoutine = adaptRoutineForPHV(suitableRoutines[0], localPhvStatus);
      
      // Personalizar según metas y duración
      const personalizedRoutine = personalizeRoutine(adaptedRoutine, goals, duration);
      
      setGeneratedRoutine(personalizedRoutine);
      
      if (onRoutineGenerated) {
        onRoutineGenerated(personalizedRoutine);
      }
      
    } catch (error) {
      console.error('Error generating elite routine:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const adaptRoutineForPHV = (routine: any, phvStatus: any) => {
    if (!phvStatus?.currentPHV?.restrictions || phvStatus.currentPHV.restrictions.length === 0) {
      return routine;
    }

    const restrictions = phvStatus.currentPHV.restrictions;
    
    // Clonar la rutina para no modificar el original
    const adaptedRoutine = JSON.parse(JSON.stringify(routine));
    
    // Filtrar ejercicios según restricciones PHV
    adaptedRoutine.phases = adaptedRoutine.phases.map((phase: any) => ({
      ...phase,
      exercises: phase.exercises.filter((exercise: any) => {
        const exerciseData = ELITE_EXERCISES_COMPLETE.find(ex => ex.id === exercise.exerciseId);
        
        // Verificar si el ejercicio es seguro según PHV
        if (!exerciseData?.phvSafe) {
          console.log(`Ejercicio ${exerciseData?.name} eliminado por restricción PHV`);
          return false;
        }
        
        // Verificar restricciones específicas
        const hasContraindication = restrictions.some((restriction: string) => 
          exerciseData?.contraindications.includes(restriction)
        );
        
        if (hasContraindication) {
          console.log(`Ejercicio ${exerciseData?.name} eliminado por contraindicación: ${restrictions}`);
          return false;
        }
        
        return true;
      })
    })).filter((phase: any) => phase.exercises.length > 0);

    // Agregar notas sobre las adaptaciones
    adaptedRoutine.phvAdaptations = {
      originalExercises: routine.phases.reduce((total: number, phase: any) => total + phase.exercises.length, 0),
      adaptedExercises: adaptedRoutine.phases.reduce((total: number, phase: any) => total + phase.exercises.length, 0),
      restrictionsApplied: restrictions,
      adaptationDate: new Date().toISOString()
    };

    return adaptedRoutine;
  };

  const personalizeRoutine = (routine: any, userGoals: string[], availableTime: number) => {
    // Ajustar duración según tiempo disponible
    const timeRatio = availableTime / routine.duration;
    
    const personalizedRoutine = {
      ...routine,
      duration: availableTime,
      phases: routine.phases.map((phase: any) => ({
        ...phase,
        duration: Math.round(phase.duration * timeRatio),
        exercises: phase.exercises.map((exercise: any) => ({
          ...exercise,
          sets: Math.max(1, Math.round(exercise.sets * timeRatio)),
          rest: Math.round(exercise.rest * timeRatio)
        }))
      })),
      userGoals: userGoals,
      personalization: {
        originalDuration: routine.duration,
        targetDuration: availableTime,
        timeRatio: timeRatio,
        goals: userGoals
      }
    };

    return personalizedRoutine;
  };

  const toggleGoal = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg text-white">
        <div className="flex items-center mb-2">
          <Target className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-bold">Generador de Rutinas Elite</h2>
        </div>
        <p className="text-purple-100">
          Crea rutinas personalizadas basadas en tu deporte, posición y objetivos
        </p>
      </div>

      {/* PHV Status Alert */}
      {localPhvStatus?.currentPHV?.restrictions && localPhvStatus.currentPHV.restrictions.length > 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="font-medium text-yellow-800">Adaptaciones PHV Activas</span>
          </div>
          <p className="text-sm text-yellow-700 mt-2">
            Tu rutina será adaptada automáticamente debido a restricciones de desarrollo.
          </p>
        </div>
      )}

      {/* Formulario */}
      <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
        {/* Deporte y Posición */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deporte
            </label>
            <select
              value={selectedSport}
              onChange={(e) => {
                setSelectedSport(e.target.value);
                setSelectedPosition('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {sports.map(sport => (
                <option key={sport.value} value={sport.value}>{sport.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posición
            </label>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={!selectedSport}
            >
              <option value="">Selecciona una posición</option>
              {sports.find(s => s.value === selectedSport)?.positions.map(position => (
                <option key={position} value={position}>
                  {position.charAt(0).toUpperCase() + position.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Nivel y Duración */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
              <option value="elite">Elite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración (minutos)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="30"
                max="120"
                step="15"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-900 w-12">{duration}min</span>
            </div>
          </div>
        </div>

        {/* Fase de Temporada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fase de Temporada
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'pre', label: 'Pre-temporada', icon: Calendar },
              { value: 'in', label: 'Temporada', icon: Calendar },
              { value: 'post', label: 'Post-temporada', icon: Calendar }
            ].map(phase => {
              const Icon = phase.icon;
              return (
                <button
                  key={phase.value}
                  onClick={() => setSeasonPhase(phase.value)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    seasonPhase === phase.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-sm font-medium">{phase.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Objetivos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Objetivos de Entrenamiento
          </label>
          <div className="grid grid-cols-2 gap-3">
            {availableGoals.map(goal => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`p-3 rounded-lg border-2 text-left transition-colors ${
                  goals.includes(goal)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <CheckCircle className={`h-4 w-4 mr-2 ${goals.includes(goal) ? 'text-purple-600' : 'text-gray-400'}`} />
                  <span className="text-sm">{goal}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Botón Generar */}
        <button
          onClick={generateEliteRoutine}
          disabled={isGenerating || !selectedPosition || goals.length === 0}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generando rutina elite...
            </>
          ) : (
            <>
              <Target className="h-4 w-4 mr-2" />
              Generar Rutina Elite
            </>
          )}
        </button>
      </div>

      {/* Rutina Generada */}
      {generatedRoutine && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Rutina Generada</h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">Elite</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Duración:</span>
                <span className="ml-2 font-medium">{generatedRoutine.duration} minutos</span>
              </div>
              <div>
                <span className="text-gray-500">Fases:</span>
                <span className="ml-2 font-medium">{generatedRoutine.phases.length}</span>
              </div>
            </div>

            {generatedRoutine.phvAdaptations && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-yellow-800">Adaptaciones PHV Aplicadas</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Ejercicios adaptados: {generatedRoutine.phvAdaptations.adaptedExercises} de {generatedRoutine.phvAdaptations.originalExercises}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {generatedRoutine.phases.map((phase: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{phase.name}</h4>
                    <span className="text-sm text-gray-500">{phase.duration} min</span>
                  </div>
                  <div className="space-y-2">
                    {phase.exercises.map((exercise: any, exIndex: number) => {
                      const exerciseData = ELITE_EXERCISES_COMPLETE.find(ex => ex.id === exercise.exerciseId);
                      return (
                        <div key={exIndex} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{exerciseData?.name || exercise.exerciseId}</span>
                          <span className="text-gray-500">{exercise.sets} × {exercise.reps}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Comenzar Rutina
            </button>
          </div>
        </div>
      )}
    </div>
  );
};