export interface PHVCalculation {
  age: number;
  height: number;
  sittingHeight: number;
  legLength: number;
  weight: number;
  armSpan: number;
  date: string;
  previousMeasurements?: PHVCalculation[];
}

export interface PHVResult {
  status: 'pre' | 'active' | 'post' | 'unknown';
  velocity: number; // cm/year
  peakVelocityAge: number;
  yearsFromPeak: number;
  growthRate: number; // cm/month
  bioBand: 'red' | 'yellow' | 'green';
  restrictions: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  nextAssessmentDate: string;
}

export class PHVCalculator {
  // Umbrales basados en investigación de PHV
  private static readonly BOYS_PEAK_AGE = 13.5; // años
  private static readonly GIRLS_PEAK_AGE = 11.5; // años
  private static readonly PEAK_VELOCITY_BOYS = 9.5; // cm/año
  private static readonly PEAK_VELOCITY_GIRLS = 8.3; // cm/año
  
  // Umbrales de riesgo
  private static readonly HIGH_RISK_VELOCITY = 6.0; // cm/año
  private static readonly CRITICAL_GROWTH_RATE = 0.5; // cm/mes
  private static readonly ACTIVE_PHV_RANGE = 1.5; // años desde pico

  static calculate(data: PHVCalculation): PHVResult {
    const age = data.age;
    const currentHeight = data.height;
    const sittingHeight = data.sittingHeight;
    const legLength = data.legLength;
    const weight = data.weight;
    const armSpan = data.armSpan;
    
    // Calcular edad de pico esperada basada en proporciones
    const estimatedPeakAge = this.estimatePeakAge(data);
    
    // Calcular velocidad de crecimiento
    const growthVelocity = this.calculateGrowthVelocity(data);
    
    // Calcular tasa de crecimiento mensual
    const monthlyGrowthRate = this.calculateMonthlyGrowthRate(data);
    
    // Determinar estado PHV
    const status = this.determinePHVStatus(age, estimatedPeakAge, growthVelocity);
    
    // Calcular años desde/desde el pico
    const yearsFromPeak = age - estimatedPeakAge;
    
    // Determinar banda de riesgo
    const bioBand = this.determineBioBand(status, growthVelocity, monthlyGrowthRate);
    
    // Generar restricciones y recomendaciones
    const restrictions = this.generateRestrictions(status, growthVelocity, monthlyGrowthRate);
    const recommendations = this.generateRecommendations(status, bioBand, data);
    
    // Determinar nivel de riesgo
    const riskLevel = this.determineRiskLevel(status, growthVelocity, monthlyGrowthRate);
    
    // Calcular próxima fecha de evaluación
    const nextAssessmentDate = this.calculateNextAssessment(status, monthlyGrowthRate);

    return {
      status,
      velocity: growthVelocity,
      peakVelocityAge: estimatedPeakAge,
      yearsFromPeak,
      growthRate: monthlyGrowthRate,
      bioBand,
      restrictions,
      recommendations,
      riskLevel,
      nextAssessmentDate
    };
  }

  private static estimatePeakAge(data: PHVCalculation): number {
    // Método de Mirwald et al. (2002) - Fórmula de predicción PHV
    const { age, sittingHeight, legLength, height } = data;
    
    // Calcular proporciones madurativas
    const legLengthRatio = legLength / height;
    const sittingHeightRatio = sittingHeight / height;
    
    // Estimación basada en proporciones corporales
    let estimatedAge;
    
    if (age < 10) {
      // Pre-pubertad - usar proporciones sentado/pierna
      if (legLengthRatio > 0.52) {
        estimatedAge = this.BOYS_PEAK_AGE - 2.5; // Tardío
      } else if (legLengthRatio < 0.48) {
        estimatedAge = this.BOYS_PEAK_AGE + 1.5; // Temprano
      } else {
        estimatedAge = this.BOYS_PEAK_AGE; // Promedio
      }
    } else {
      // Durante pubertad - usar velocidad actual
      if (data.previousMeasurements && data.previousMeasurements.length >= 2) {
        const velocity = this.calculateHistoricalVelocity(data);
        estimatedAge = this.refinePeakAgeWithVelocity(age, velocity);
      } else {
        estimatedAge = age > 12 ? this.BOYS_PEAK_AGE : this.GIRLS_PEAK_AGE;
      }
    }
    
    return Math.round(estimatedAge * 10) / 10;
  }

  private static calculateGrowthVelocity(data: PHVCalculation): number {
    if (!data.previousMeasurements || data.previousMeasurements.length < 2) {
      return 0; // No hay datos históricos
    }
    
    const recentMeasurements = data.previousMeasurements
      .filter(m => {
        const measurementDate = new Date(m.date);
        const currentDate = new Date(data.date);
        const monthsDiff = (currentDate.getTime() - measurementDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
        return monthsDiff <= 12; // Último año
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (recentMeasurements.length < 2) return 0;
    
    const latest = recentMeasurements[0];
    const oldest = recentMeasurements[recentMeasurements.length - 1];
    
    const heightDiff = data.height - oldest.height;
    const timeDiffYears = (new Date(data.date).getTime() - new Date(oldest.date).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    
    return heightDiff / timeDiffYears;
  }

  private static calculateMonthlyGrowthRate(data: PHVCalculation): number {
    if (!data.previousMeasurements || data.previousMeasurements.length === 0) {
      return 0;
    }
    
    const latestMeasurement = data.previousMeasurements[0];
    const monthsDiff = (new Date(data.date).getTime() - new Date(latestMeasurement.date).getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (monthsDiff === 0) return 0;
    
    return (data.height - latestMeasurement.height) / monthsDiff;
  }

  private static calculateHistoricalVelocity(data: PHVCalculation): number {
    if (!data.previousMeasurements || data.previousMeasurements.length < 3) {
      return 0;
    }
    
    const measurements = [...data.previousMeasurements, data]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Calcular velocidad promedio con regresión lineal
    const n = measurements.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    measurements.forEach((m, i) => {
      const x = (new Date(m.date).getTime() - new Date(measurements[0].date).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      const y = m.height;
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumX2 += x * x;
    });
    
    const velocity = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return velocity;
  }

  private static refinePeakAgeWithVelocity(currentAge: number, velocity: number): number {
    // Ajustar edad de pico basada en velocidad actual
    const expectedVelocity = currentAge < 12 ? this.PEAK_VELOCITY_GIRLS : this.PEAK_VELOCITY_BOYS;
    
    if (velocity > expectedVelocity * 0.8) {
      // Alta velocidad - probablemente cerca del pico
      return currentAge;
    } else if (velocity > expectedVelocity * 0.4) {
      // Velocidad moderada - en fase de aceleración
      return currentAge + (velocity > expectedVelocity * 0.6 ? 0.5 : 1.0);
    } else {
      // Baja velocidad - lejos del pico
      return currentAge + 2.0;
    }
  }

  private static determinePHVStatus(age: number, peakAge: number, velocity: number): 'pre' | 'active' | 'post' | 'unknown' {
    const yearsFromPeak = age - peakAge;
    
    if (yearsFromPeak < -this.ACTIVE_PHV_RANGE) {
      return 'pre';
    } else if (Math.abs(yearsFromPeak) <= this.ACTIVE_PHV_RANGE) {
      return 'active';
    } else if (yearsFromPeak > this.ACTIVE_PHV_RANGE) {
      return 'post';
    }
    
    return 'unknown';
  }

  private static determineBioBand(
    status: 'pre' | 'active' | 'post' | 'unknown',
    velocity: number,
    monthlyGrowthRate: number
  ): 'red' | 'yellow' | 'green' {
    if (status === 'active' && monthlyGrowthRate >= this.CRITICAL_GROWTH_RATE) {
      return 'red';
    }
    
    if (status === 'active' && velocity >= this.HIGH_RISK_VELOCITY) {
      return 'yellow';
    }
    
    if (status === 'active' || monthlyGrowthRate >= this.CRITICAL_GROWTH_RATE * 0.7) {
      return 'yellow';
    }
    
    return 'green';
  }

  private static generateRestrictions(
    status: 'pre' | 'active' | 'post' | 'unknown',
    velocity: number,
    monthlyGrowthRate: number
  ): string[] {
    const restrictions: string[] = [];
    
    if (status === 'active' || monthlyGrowthRate >= this.CRITICAL_GROWTH_RATE) {
      restrictions.push('🚫 Pliometría de alta intensidad prohibida');
      restrictions.push('🚫 Sprints máximos completos prohibidos');
      restrictions.push('🚫 Saltos profundos (>30cm) prohibidos');
      restrictions.push('🚫 Nordic curls prohibidos');
      restrictions.push('🚫 Cargas máximas (>85% 1RM) prohibidas');
    }
    
    if (monthlyGrowthRate >= this.CRITICAL_GROWTH_RATE * 0.7) {
      restrictions.push('⚠️ Reducir volumen de entrenamiento 30%');
      restrictions.push('⚠️ Evitar ejercicios de gran amplitud');
      restrictions.push('⚠️ Incrementar descanso entre sesiones');
    }
    
    if (velocity >= this.HIGH_RISK_VELOCITY) {
      restrictions.push('⚠️ Monitorear dolor en rodillas/talones');
      restrictions.push('⚠️ Evaluar técnica diariamente');
      restrictions.push('⚠️ Reducir intensidad progresiva');
    }
    
    return restrictions;
  }

  private static generateRecommendations(
    status: 'pre' | 'active' | 'post' | 'unknown',
    bioBand: 'red' | 'yellow' | 'green',
    data: PHVCalculation
  ): string[] {
    const recommendations: string[] = [];
    
    if (status === 'active') {
      recommendations.push('📊 Medir estatura mensualmente');
      recommendations.push('📝 Registrar dolor en rodillas/talones');
      recommendations.push('🧘‍♂️ Enfocarse en movilidad y control');
      recommendations.push('💪 Mantener fuerza isométrica');
      recommendations.push('🏃‍♂️ Trabajar técnica de carrera submáxima');
    }
    
    if (bioBand === 'red') {
      recommendations.push('🚨 Consultar con médico deportivo');
      recommendations.push('🔄 Re-evaluar cada 2 semanas');
      recommendations.push('📉 Reducir carga de entrenamiento 50%');
      recommendations.push('🧊 Aplicar recuperación activa');
    } else if (bioBand === 'yellow') {
      recommendations.push('⚠️ Monitorear síntomas semanalmente');
      recommendations.push('📈 Progresión gradual de intensidad');
      recommendations.push('🎯 Enfocarse en calidad sobre cantidad');
    } else {
      recommendations.push('✅ Entrenamiento normal permitido');
      recommendations.push('📊 Seguir plan de progresión');
      recommendations.push('🏆 Preparar para fase de desarrollo');
    }
    
    // Recomendaciones específicas por deporte
    if (data.height && data.weight) {
      const bmi = data.weight / Math.pow(data.height / 100, 2);
      if (bmi < 18.5) {
        recommendations.push('🍎 Incrementar apoyo nutricional');
      } else if (bmi > 25) {
        recommendations.push('⚖️ Monitorear composición corporal');
      }
    }
    
    return recommendations;
  }

  private static determineRiskLevel(
    status: 'pre' | 'active' | 'post' | 'unknown',
    velocity: number,
    monthlyGrowthRate: number
  ): 'low' | 'medium' | 'high' | 'critical' {
    if (monthlyGrowthRate >= this.CRITICAL_GROWTH_RATE) {
      return 'critical';
    }
    
    if (status === 'active' && velocity >= this.HIGH_RISK_VELOCITY) {
      return 'high';
    }
    
    if (status === 'active' || monthlyGrowthRate >= this.CRITICAL_GROWTH_RATE * 0.7) {
      return 'medium';
    }
    
    return 'low';
  }

  private static calculateNextAssessment(
    status: 'pre' | 'active' | 'post' | 'unknown',
    monthlyGrowthRate: number
  ): string {
    if (status === 'active' || monthlyGrowthRate >= this.CRITICAL_GROWTH_RATE * 0.5) {
      // Crecimiento activo - medir mensualmente
      const nextDate = new Date();
      nextDate.setMonth(nextDate.getMonth() + 1);
      return nextDate.toISOString().split('T')[0];
    }
    
    if (status === 'pre' || status === 'post') {
      // Fases estables - medir trimestralmente
      const nextDate = new Date();
      nextDate.setMonth(nextDate.getMonth() + 3);
      return nextDate.toISOString().split('T')[0];
    }
    
    // Caso desconocido - medir en 6 semanas
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 42);
    return nextDate.toISOString().split('T')[0];
  }

  // Métodos auxiliares para cálculos específicos
  static isExerciseAllowed(
    exerciseType: string,
    intensity: 'low' | 'medium' | 'high' | 'max',
    phvResult: PHVResult
  ): boolean {
    if (phvResult.bioBand === 'red') {
      // Lista negra de ejercicios en banda roja
      const forbiddenExercises = [
        'plyometrics', 'sprint', 'jump', 'nordic', 'max_strength',
        'olympic_lifting', 'depth_jump', 'bounding', 'hill_sprint'
      ];
      
      if (forbiddenExercises.some(forbidden => 
        exerciseType.toLowerCase().includes(forbidden)
      )) {
        return false;
      }
      
      if (intensity === 'high' || intensity === 'max') {
        return false;
      }
    }
    
    if (phvResult.bioBand === 'yellow' && intensity === 'max') {
      return false;
    }
    
    return true;
  }

  static getTrainingModifications(phvResult: PHVResult): {
    volumeReduction: number;
    intensityCap: 'low' | 'medium' | 'high' | 'max';
    restIncrease: number;
    frequencyReduction: number;
  } {
    switch (phvResult.bioBand) {
      case 'red':
        return {
          volumeReduction: 50,
          intensityCap: 'medium',
          restIncrease: 100,
          frequencyReduction: 30
        };
      
      case 'yellow':
        return {
          volumeReduction: 25,
          intensityCap: 'high',
          restIncrease: 50,
          frequencyReduction: 15
        };
      
      case 'green':
      default:
        return {
          volumeReduction: 0,
          intensityCap: 'max',
          restIncrease: 0,
          frequencyReduction: 0
        };
    }
  }
}