import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Target, AlertTriangle, Award } from 'lucide-react';
import { useTrainingStore } from '../store/trainingStore';
import { EliteDatabase } from '../lib/database';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface PatternAnalysis {
  athleteId: string;
}

export const PatternAnalysis: React.FC<PatternAnalysis> = ({ athleteId }) => {
  const [sessionHistory, setSessionHistory] = useState<any[]>([]);
  const [performanceTrends, setPerformanceTrends] = useState<any[]>([]);
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  
  const { sessions, currentAthlete } = useTrainingStore();
  const database = EliteDatabase.getInstance();

  useEffect(() => {
    loadAnalysisData();
  }, [athleteId, selectedTimeframe]);

  const loadAnalysisData = async () => {
    try {
      setLoading(true);
      
      // Cargar historial de sesiones
      const history = await database.getSessions(athleteId, selectedTimeframe);
      setSessionHistory(history);
      
      // Calcular tendencias de rendimiento
      const trends = calculatePerformanceTrends(history);
      setPerformanceTrends(trends);
      
      // Generar datos de comparación
      const comparison = await generateComparisonData(history, athleteId);
      setComparisonData(comparison);
      
    } catch (error) {
      console.error('Error loading analysis data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePerformanceTrends = (sessions: any[]) => {
    if (sessions.length === 0) return [];
    
    // Agrupar por fecha y calcular promedios
    const dailyData = sessions.reduce((acc: any, session: any) => {
      const date = new Date(session.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, totalQuality: 0, count: 0, painLevel: 0, fatigueLevel: 0 };
      }
      acc[date].totalQuality += session.quality;
      acc[date].painLevel += session.painLevel || 0;
      acc[date].fatigueLevel += session.fatigueLevel || 0;
      acc[date].count += 1;
      return acc;
    }, {});
    
    return Object.values(dailyData).map((day: any) => ({
      date: day.date,
      quality: Math.round(day.totalQuality / day.count),
      painLevel: Math.round(day.painLevel / day.count),
      fatigueLevel: Math.round(day.fatigueLevel / day.count),
      sessions: day.count
    })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const generateComparisonData = async (sessions: any[], athleteId: string) => {
    // Obtener datos del atleta
    const athlete = await database.getAthlete(athleteId);
    if (!athlete) return null;
    
    // Datos de comparación basados en nivel y deporte
    const eliteBenchmarks = {
      beginner: { quality: 65, consistency: 60, injuryRisk: 30 },
      intermediate: { quality: 75, consistency: 70, injuryRisk: 20 },
      advanced: { quality: 85, consistency: 80, injuryRisk: 15 },
      elite: { quality: 92, consistency: 88, injuryRisk: 10 }
    };
    
    const benchmark = eliteBenchmarks[athlete.experience as keyof typeof eliteBenchmarks] || eliteBenchmarks.beginner;
    
    // Calcular métricas del atleta
    const avgQuality = sessions.reduce((sum, s) => sum + s.quality, 0) / sessions.length || 0;
    const consistency = calculateConsistency(sessions);
    const injuryRisk = calculateInjuryRisk(sessions);
    
    return {
      athlete: {
        quality: Math.round(avgQuality),
        consistency: Math.round(consistency),
        injuryRisk: Math.round(injuryRisk)
      },
      benchmark,
      sport: athlete.sport,
      level: athlete.experience
    };
  };

  const calculateConsistency = (sessions: any[]) => {
    if (sessions.length < 3) return 0;
    
    const qualities = sessions.map(s => s.quality);
    const mean = qualities.reduce((sum, q) => sum + q, 0) / qualities.length;
    const variance = qualities.reduce((sum, q) => sum + Math.pow(q - mean, 2), 0) / qualities.length;
    const stdDev = Math.sqrt(variance);
    
    // Consistencia inversa a la desviación estándar (normalizada a 0-100)
    return Math.max(0, 100 - (stdDev * 2));
  };

  const calculateInjuryRisk = (sessions: any[]) => {
    if (sessions.length === 0) return 0;
    
    const recentSessions = sessions.slice(-10); // Últimas 10 sesiones
    const avgPain = recentSessions.reduce((sum, s) => sum + (s.painLevel || 0), 0) / recentSessions.length;
    const avgFatigue = recentSessions.reduce((sum, s) => sum + (s.fatigueLevel || 0), 0) / recentSessions.length;
    const decliningQuality = checkDecliningQuality(sessions);
    
    // Riesgo basado en dolor, fatiga y calidad decreciente
    return Math.min(100, (avgPain * 15) + (avgFatigue * 10) + (decliningQuality ? 20 : 0));
  };

  const checkDecliningQuality = (sessions: any[]) => {
    if (sessions.length < 5) return false;
    
    const recent = sessions.slice(-5);
    const qualities = recent.map(s => s.quality);
    
    // Verificar tendencia decreciente
    let decliningCount = 0;
    for (let i = 1; i < qualities.length; i++) {
      if (qualities[i] < qualities[i-1]) decliningCount++;
    }
    
    return decliningCount >= 3;
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Analizando patrones...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg text-white">
        <div className="flex items-center mb-2">
          <TrendingUp className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-bold">Análisis de Patrones Elite</h2>
        </div>
        <p className="text-purple-100">
          Análisis profundo de tu rendimiento, tendencias y comparativas
        </p>
      </div>

      {/* Selector de período */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex space-x-2">
          {(['7d', '30d', '90d', '1y'] as const).map(period => (
            <button
              key={period}
              onClick={() => setSelectedTimeframe(period)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period === '7d' ? '7 días' : period === '30d' ? '30 días' : period === '90d' ? '90 días' : '1 año'}
            </button>
          ))}
        </div>
      </div>

      {/* Tendencias de Rendimiento */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencias de Rendimiento</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="quality" stroke="#3B82F6" strokeWidth={2} name="Calidad" />
              <Line type="monotone" dataKey="painLevel" stroke="#EF4444" strokeWidth={2} name="Dolor" />
              <Line type="monotone" dataKey="fatigueLevel" stroke="#F59E0B" strokeWidth={2} name="Fatiga" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparativas Elite */}
      {comparisonData && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Comparativa vs Estándares {comparisonData.level.toUpperCase()}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-900">Calidad</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {comparisonData.athlete.quality}%
              </div>
              <div className="text-sm text-blue-700">
                vs {comparisonData.benchmark.quality}% (benchmark)
              </div>
              {getTrendIcon(comparisonData.athlete.quality, comparisonData.benchmark.quality)}
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-900">Consistencia</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {comparisonData.athlete.consistency}%
              </div>
              <div className="text-sm text-green-700">
                vs {comparisonData.benchmark.consistency}% (benchmark)
              </div>
              {getTrendIcon(comparisonData.athlete.consistency, comparisonData.benchmark.consistency)}
            </div>

            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm font-medium text-red-900">Riesgo Lesión</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {comparisonData.athlete.injuryRisk}%
              </div>
              <div className="text-sm text-red-700">
                vs {comparisonData.benchmark.injuryRisk}% (benchmark)
              </div>
              {getTrendIcon(comparisonData.athlete.injuryRisk, comparisonData.benchmark.injuryRisk)}
            </div>
          </div>

          {/* Gráfico de Radar */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={[
                { subject: 'Calidad', athlete: comparisonData.athlete.quality, benchmark: comparisonData.benchmark.quality, fullMark: 100 },
                { subject: 'Consistencia', athlete: comparisonData.athlete.consistency, benchmark: comparisonData.benchmark.consistency, fullMark: 100 },
                { subject: 'Riesgo Bajo', athlete: 100 - comparisonData.athlete.injuryRisk, benchmark: 100 - comparisonData.benchmark.injuryRisk, fullMark: 100 }
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Atleta" dataKey="athlete" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                <Radar name="Benchmark" dataKey="benchmark" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recomendaciones Basadas en Patrones */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          <Award className="h-5 w-5 inline mr-2 text-yellow-500" />
          Recomendaciones Elite
        </h3>
        
        <div className="space-y-3">
          {comparisonData?.athlete.quality < comparisonData?.benchmark.quality && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                <span className="text-yellow-800 font-medium">Enfoque en Calidad</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                Tu calidad de ejecución está por debajo del estándar {comparisonData.level}. 
                Enfócate en la técnica perfecta antes de aumentar intensidad.
              </p>
            </div>
          )}
          
          {comparisonData?.athlete.consistency < 70 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-blue-800 font-medium">Mejora la Consistencia</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Tu consistencia es baja. Intenta mantener la misma calidad en todas las repeticiones. 
                Considera reducir la intensidad temporalmente.
              </p>
            </div>
          )}
          
          {comparisonData?.athlete.injuryRisk > 25 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                <span className="text-red-800 font-medium">Riesgo de Lesión Alto</span>
              </div>
              <p className="text-red-700 text-sm mt-1">
                Tu riesgo de lesión está elevado. Prioriza ejercicios de movilidad y reducción de dolor. 
                Consulta con un profesional si el dolor persiste.
              </p>
            </div>
          )}
          
          {performanceTrends.length > 5 && performanceTrends.slice(-3).every(t => t.quality > 85) && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">¡Excelente Tendencia!</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Has mantenido alta calidad en las últimas sesiones. Estás listo para aumentar 
                progresivamente la intensidad o complejidad de los ejercicios.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};