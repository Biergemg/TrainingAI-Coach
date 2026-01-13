import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, RotateCcw, ArrowUp, ArrowDown } from 'lucide-react';
import { useTrainingStore } from '../store/trainingStore';
import { EliteDatabase } from '../lib/database';
import { ELITE_EXERCISES_COMPLETE } from '../data/eliteExercisesComplete';

interface AutoProgressionProps {
  athleteId: string;
  currentExerciseId?: string;
  phvStatus?: any;
}

interface ProgressionRecommendation {
  type: 'progression' | 'regression' | 'maintenance' | 'phv_restriction';
  priority: 'high' | 'medium' | 'low' | 'critical';
  title: string;
  description: string;
  currentExercise: string;
  recommendedExercise: string;
  rationale: string;
  action: 'progress' | 'regress' | 'maintain' | 'find_alternative';
  restrictions?: string[];
  icon: React.ElementType;
  color: 'green' | 'yellow' | 'red' | 'blue';
}

export const AutoProgression: React.FC<AutoProgressionProps> = ({ 
  athleteId, 
  currentExerciseId,
  phvStatus 
}) => {
  const [recommendations, setRecommendations] = useState<ProgressionRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseHistory, setExerciseHistory] = useState<any[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<ProgressionRecommendation | null>(null);
  
  const { currentAthlete } = useTrainingStore();
  const database = EliteDatabase.getInstance();

  useEffect(() => {
    if (athleteId) {
      loadExerciseHistory();
    }
  }, [athleteId, currentExerciseId]);

  useEffect(() => {
    if (exerciseHistory.length > 0) {
      generateProgressionRecommendations();
    }
  }, [exerciseHistory, phvStatus]);

  const loadExerciseHistory = async () => {
    setIsLoading(true);
    try {
      const sessions = await database.getSessionsByAthlete(athleteId);
      const exerciseData = sessions.flatMap((session: any) => 
        session.exercises?.map((ex: any) => ({
          ...ex,
          sessionDate: session.date,
          sessionId: session.id
        })) || []
      );
      setExerciseHistory(exerciseData);
    } catch (error) {
      console.error('Error loading exercise history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateProgressionRecommendations = () => {
    const currentExercise = currentExerciseId || 
      (exerciseHistory.length > 0 ? exerciseHistory[exerciseHistory.length - 1].exerciseId : null);
    
    if (!currentExercise) return;

    const recommendations = generateProgressionRecommendationsForExercise(
      currentExercise,
      exerciseHistory,
      currentAthlete?.experience || 'intermediate',
      phvStatus?.currentPHV?.restrictions || []
    );
    
    setRecommendations(recommendations);
  };

  const generateProgressionRecommendationsForExercise = (
    exerciseId: string,
    history: any[],
    level: string,
    restrictions: string[]
  ): ProgressionRecommendation[] => {
    const currentExercise = ELITE_EXERCISES_COMPLETE.find(ex => ex.id === exerciseId);
    if (!currentExercise) return [];

    const exerciseHistory = history.filter(ex => ex.exerciseId === exerciseId);
    const avgQuality = exerciseHistory.length > 0 
      ? exerciseHistory.reduce((sum, ex) => sum + (ex.quality || 80), 0) / exerciseHistory.length
      : 80;
    
    const consistency = calculateConsistency(exerciseHistory);
    const recentPerformance = exerciseHistory.slice(-3);
    const recentQuality = recentPerformance.length > 0
      ? recentPerformance.reduce((sum, ex) => sum + (ex.quality || 80), 0) / recentPerformance.length
      : 80;

    const recommendations: ProgressionRecommendation[] = [];

    // 1. CRITERIO: Calidad promedio > 85% y consistencia > 80%
    if (avgQuality >= 85 && consistency >= 80) {
      const nextProgression = findNextProgression(exerciseId);
      if (nextProgression) {
        recommendations.push({
          type: 'progression',
          priority: 'high',
          title: '🚀 LISTO PARA PROGRESAR',
          description: `Tu dominio de ${currentExercise.name} indica que estás listo para el siguiente nivel.`,
          currentExercise: currentExercise.name,
          recommendedExercise: nextProgression.name,
          rationale: `Calidad promedio: ${avgQuality.toFixed(0)}%, Consistencia: ${consistency.toFixed(0)}%`,
          action: 'progress',
          icon: ArrowUp,
          color: 'green'
        });
      }
    }

    // 2. CRITERIO: Calidad reciente < 70% o consistencia < 60%
    if (recentQuality < 70 || consistency < 60) {
      const regression = findRegression(exerciseId);
      if (regression) {
        recommendations.push({
          type: 'regression',
          priority: 'high',
          title: '📉 CONSIDERA REGRESAR',
          description: `Tu rendimiento en ${currentExercise.name} sugiere que necesitas consolidar la técnica.`,
          currentExercise: currentExercise.name,
          recommendedExercise: regression.name,
          rationale: `Calidad reciente: ${recentQuality.toFixed(0)}%, Consistencia: ${consistency.toFixed(0)}%`,
          action: 'regress',
          icon: ArrowDown,
          color: 'yellow'
        });
      }
    }

    // 3. CRITERIO: Mantener si está entre 70-85% de calidad
    if (avgQuality >= 70 && avgQuality < 85 && consistency >= 60) {
      recommendations.push({
        type: 'maintenance',
        priority: 'medium',
        title: '🎯 CONSOLIDA TU TÉCNICA',
        description: `Continúa con ${currentExercise.name} para perfeccionar el movimiento antes de progresar.`,
        currentExercise: currentExercise.name,
        recommendedExercise: currentExercise.name,
        rationale: `Calidad: ${avgQuality.toFixed(0)}% - Perfecto para consolidar patrones motorios`,
        action: 'maintain',
        icon: CheckCircle,
        color: 'blue'
      });
    }

    // 4. CRITERIO: Variaciones elite disponibles
    if (currentExercise.eliteVariations && currentExercise.eliteVariations.length > 0) {
      const randomVariation = currentExercise.eliteVariations[
        Math.floor(Math.random() * currentExercise.eliteVariations.length)
      ];
      
      recommendations.push({
        type: 'progression',
        priority: 'medium',
        title: '⭐ VARIACIÓN ELITE DISPONIBLE',
        description: `Prueba la variación elite de ${currentExercise.name}: ${randomVariation}`,
        currentExercise: currentExercise.name,
        recommendedExercise: randomVariation,
        rationale: 'Variar los estímulos previene la adaptación y mejora el rendimiento',
        action: 'progress',
        icon: TrendingUp,
        color: 'green'
      });
    }

    // 5. CRITERIO: Si hay pocos datos, sugerir ejercicios de evaluación
    if (exerciseHistory.length < 3) {
      recommendations.push({
        type: 'maintenance',
        priority: 'low',
        title: '📊 NECESITAMOS MÁS DATOS',
        description: `Completa más sesiones de ${currentExercise.name} para obtener recomendaciones precisas.`,
        currentExercise: currentExercise.name,
        recommendedExercise: currentExercise.name,
        rationale: `Solo ${exerciseHistory.length} sesiones registradas - Mínimo 3 para análisis confiable`,
        action: 'maintain',
        icon: RotateCcw,
        color: 'blue'
      });
    }

    // 6. ALERTA: Restricciones PHV
    if (restrictions.length > 0 && !currentExercise.phvSafe) {
      recommendations.unshift({
        type: 'phv_restriction',
        priority: 'critical',
        title: '⚠️ RESTRICCIÓN PHV ACTIVA',
        description: `Este ejercicio está restringido por tu estado de desarrollo.`,
        currentExercise: currentExercise.name,
        recommendedExercise: 'Buscar alternativa PHV-safe',
        rationale: `PHV activo requiere precaución especial`,
        action: 'find_alternative',
        restrictions: restrictions,
        icon: AlertTriangle,
        color: 'red'
      });
    }

    return recommendations;
  };

  const calculateConsistency = (history: any[]): number => {
    if (history.length < 2) return 100;
    
    const qualities = history.map(ex => ex.quality || 80);
    const avg = qualities.reduce((sum, q) => sum + q, 0) / qualities.length;
    const variance = qualities.reduce((sum, q) => sum + Math.pow(q - avg, 2), 0) / qualities.length;
    const stdDev = Math.sqrt(variance);
    
    // Consistencia inversa a la desviación estándar (menor desviación = mayor consistencia)
    return Math.max(0, Math.min(100, 100 - (stdDev / 2)));
  };

  const findNextProgression = (exerciseId: string) => {
    const currentExercise = ELITE_EXERCISES_COMPLETE.find(ex => ex.id === exerciseId);
    if (!currentExercise || !currentExercise.progressions || currentExercise.progressions.length === 0) {
      return null;
    }
    
    // Buscar ejercicio progresivo en la base de datos
    const nextExerciseName = currentExercise.progressions[0];
    return ELITE_EXERCISES_COMPLETE.find(ex => ex.name === nextExerciseName) || null;
  };

  const findRegression = (exerciseId: string) => {
    const currentExercise = ELITE_EXERCISES_COMPLETE.find(ex => ex.id === exerciseId);
    if (!currentExercise || !currentExercise.regressions || currentExercise.regressions.length === 0) {
      return null;
    }
    
    // Buscar ejercicio regresivo en la base de datos
    const regressionName = currentExercise.regressions[0];
    return ELITE_EXERCISES_COMPLETE.find(ex => ex.name === regressionName) || null;
  };

  const getColorClasses = (color: string, priority: string) => {
    const baseClasses = 'p-4 rounded-lg border-2 transition-all duration-200';
    
    switch (color) {
      case 'green':
        return `${baseClasses} bg-green-50 border-green-200 hover:border-green-300`;
      case 'yellow':
        return `${baseClasses} bg-yellow-50 border-yellow-200 hover:border-yellow-300`;
      case 'red':
        return `${baseClasses} bg-red-50 border-red-200 hover:border-red-300`;
      case 'blue':
      default:
        return `${baseClasses} bg-blue-50 border-blue-200 hover:border-blue-300`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (priority) {
      case 'critical':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'high':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'low':
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">Analizando tu progresión...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-white">
        <div className="flex items-center mb-2">
          <TrendingUp className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-bold">Progresión Automática Elite</h2>
        </div>
        <p className="text-blue-100">
          Análisis inteligente de tu rendimiento para optimizar tu progresión
        </p>
      </div>

      {/* Resumen de Rendimiento */}
      {exerciseHistory.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Rendimiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {exerciseHistory.length}
              </div>
              <div className="text-sm text-gray-600">Sesiones Completadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {(exerciseHistory.reduce((sum, ex) => sum + (ex.quality || 80), 0) / exerciseHistory.length).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Calidad Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {calculateConsistency(exerciseHistory).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Consistencia</div>
            </div>
          </div>
        </div>
      )}

      {/* Recomendaciones */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recomendaciones de Progresión</h3>
        
        {recommendations.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">
              Completa algunas sesiones de entrenamiento para recibir recomendaciones personalizadas.
            </p>
          </div>
        ) : (
          recommendations.map((recommendation, index) => (
            <div
              key={index}
              className={`${getColorClasses(recommendation.color, recommendation.priority)} cursor-pointer`}
              onClick={() => setSelectedRecommendation(recommendation)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <recommendation.icon className={`h-5 w-5 mt-0.5 ${
                    recommendation.color === 'green' ? 'text-green-600' :
                    recommendation.color === 'yellow' ? 'text-yellow-600' :
                    recommendation.color === 'red' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                      <span className={getPriorityBadge(recommendation.priority)}>
                        {recommendation.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{recommendation.description}</p>
                    <div className="text-xs text-gray-500">
                      <strong>Razonamiento:</strong> {recommendation.rationale}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detalle de Recomendación Seleccionada */}
      {selectedRecommendation && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Detalle de Recomendación</h3>
            <button
              onClick={() => setSelectedRecommendation(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Ejercicio Actual:</span>
                <p className="text-gray-900">{selectedRecommendation.currentExercise}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Recomendado:</span>
                <p className="text-gray-900">{selectedRecommendation.recommendedExercise}</p>
              </div>
            </div>
            
            {selectedRecommendation.restrictions && selectedRecommendation.restrictions.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-700">Restricciones PHV:</span>
                <div className="mt-1 space-y-1">
                  {selectedRecommendation.restrictions.map((restriction, index) => (
                    <div key={index} className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                      {restriction}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <span className="text-sm font-medium text-gray-700">Acción Recomendada:</span>
              <div className="mt-2">
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedRecommendation.action === 'progress'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : selectedRecommendation.action === 'regress'
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                      : selectedRecommendation.action === 'find_alternative'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {selectedRecommendation.action === 'progress' && 'Progresar'}
                  {selectedRecommendation.action === 'regress' && 'Regresar'}
                  {selectedRecommendation.action === 'find_alternative' && 'Buscar Alternativa'}
                  {selectedRecommendation.action === 'maintain' && 'Mantener'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};