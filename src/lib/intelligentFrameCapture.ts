export interface PoseLandmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
  name: string;
}

export interface PoseResults {
  landmarks: PoseLandmark[];
  timestamp: number;
}

export interface FrameAnalysis {
  timestamp: number;
  frame: ImageData;
  landmarks: PoseLandmark[];
  quality: number;
  phase: 'setup' | 'eccentric' | 'transition' | 'concentric' | 'completion';
  keyPoints: {
    jointAngles: { [key: string]: number };
    symmetry: number;
    stability: number;
    velocity: number;
  };
  recommendations: string[];
  shouldCapture: boolean;
  captureReason: string;
}

export class IntelligentFrameCapture {
  private frameHistory: FrameAnalysis[] = [];
  private captureThreshold = 0.75;
  private maxFrames = 10;
  private currentExercise = '';
  private phaseDetector: PhaseDetector;
  private qualityAnalyzer: QualityAnalyzer;
  private recommendationEngine: RecommendationEngine;

  constructor(exerciseType: string) {
    this.currentExercise = exerciseType;
    this.phaseDetector = new PhaseDetector();
    this.qualityAnalyzer = new QualityAnalyzer();
    this.recommendationEngine = new RecommendationEngine();
  }

  analyzeFrame(poseResults: PoseResults, videoFrame: ImageData): FrameAnalysis {
    const timestamp = Date.now();
    
    // Detectar fase del movimiento
    const phase = this.phaseDetector.detectPhase(poseResults, this.currentExercise);
    
    // Analizar calidad del movimiento
    const quality = this.qualityAnalyzer.analyzeQuality(poseResults, this.currentExercise, phase);
    
    // Calcular puntos clave
    const keyPoints = this.calculateKeyPoints(poseResults, phase);
    
    // Generar recomendaciones
    const recommendations = this.recommendationEngine.generateRecommendations(
      quality,
      keyPoints,
      this.frameHistory
    );

    // Decidir si capturar este frame
    const { shouldCapture, captureReason } = this.shouldCaptureFrame({
      quality,
      phase,
      keyPoints,
      recommendations,
      timestamp
    });

    const analysis: FrameAnalysis = {
      timestamp,
      frame: videoFrame,
      landmarks: poseResults.landmarks,
      quality,
      phase,
      keyPoints,
      recommendations,
      shouldCapture,
      captureReason
    };

    // Actualizar historial
    this.updateFrameHistory(analysis);

    return analysis;
  }

  private calculateKeyPoints(poseResults: PoseResults, phase: string): FrameAnalysis['keyPoints'] {
    const landmarks = poseResults.landmarks;
    
    // Calcular ángulos de articulaciones clave
    const jointAngles = this.calculateJointAngles(landmarks);
    
    // Analizar simetría
    const symmetry = this.analyzeSymmetry(landmarks);
    
    // Evaluar estabilidad
    const stability = this.analyzeStability(landmarks);
    
    // Calcular velocidad del movimiento
    const velocity = this.calculateVelocity(landmarks);

    return {
      jointAngles,
      symmetry,
      stability,
      velocity
    };
  }

  private calculateJointAngles(landmarks: PoseLandmark[]): { [key: string]: number } {
    const angles: { [key: string]: number } = {};

    // Ángulos clave para diferentes ejercicios
    if (this.currentExercise.includes('squat')) {
      angles.kneeAngle = this.calculateAngle(
        landmarks[24], // cadera derecha
        landmarks[26], // rodilla derecha
        landmarks[28]  // tobillo derecho
      );
      angles.hipAngle = this.calculateAngle(
        landmarks[12], // hombro
        landmarks[24], // cadera
        landmarks[26]  // rodilla
      );
      angles.backAngle = this.calculateAngle(
        landmarks[12], // hombro
        landmarks[24], // cadera
        landmarks[32]  // punto medio de los pies
      );
    }

    if (this.currentExercise.includes('push') || this.currentExercise.includes('plank')) {
      angles.elbowAngle = this.calculateAngle(
        landmarks[12], // hombro
        landmarks[14], // codo
        landmarks[16]  // muñeca
      );
      angles.shoulderAngle = this.calculateAngle(
        landmarks[24], // cadera
        landmarks[12], // hombro
        landmarks[14]  // codo
      );
    }

    // Detección de valgo/caballo
    angles.kneeValgus = this.calculateKneeValgus(landmarks);
    
    return angles;
  }

  private calculateAngle(a: PoseLandmark, b: PoseLandmark, c: PoseLandmark): number {
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const bc = { x: c.x - b.x, y: c.y - b.y };
    
    const dotProduct = ab.x * bc.x + ab.y * bc.y;
    const magnitudeAB = Math.sqrt(ab.x * ab.x + ab.y * ab.y);
    const magnitudeBC = Math.sqrt(bc.x * bc.x + bc.y * bc.y);
    
    const cosAngle = dotProduct / (magnitudeAB * magnitudeBC);
    const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
    
    return Math.round(angle);
  }

  private calculateKneeValgus(landmarks: PoseLandmark[]): number {
    // Calcular desviación de rodilla respecto a línea cadera-tobillo
    const hip = landmarks[24];
    const knee = landmarks[26];
    const ankle = landmarks[28];
    
    // Línea ideal cadera-tobillo
    const idealLine = { 
      x: ankle.x - hip.x, 
      y: ankle.y - hip.y 
    };
    
    // Posición actual de rodilla
    const kneePosition = { 
      x: knee.x - hip.x, 
      y: knee.y - hip.y 
    };
    
    // Calcular desviación perpendicular
    const valgus = Math.abs(
      (kneePosition.x * idealLine.y - kneePosition.y * idealLine.x) /
      Math.sqrt(idealLine.x * idealLine.x + idealLine.y * idealLine.y)
    );
    
    return valgus * 100; // Convertir a porcentaje
  }

  private analyzeSymmetry(landmarks: PoseLandmark[]): number {
    // Comparar posiciones izquierda vs derecha
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    
    // Calcular diferencias
    const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
    const hipDiff = Math.abs(leftHip.y - rightHip.y);
    
    // Simetría como porcentaje (100% = perfectamente simétrico)
    const maxAllowedDiff = 0.05; // 5% de diferencia permitida
    const symmetry = Math.max(0, 100 - (shoulderDiff + hipDiff) / maxAllowedDiff * 100);
    
    return Math.round(symmetry);
  }

  private analyzeStability(landmarks: PoseLandmark[]): number {
    if (this.frameHistory.length === 0) return 100;
    
    // Calcular movimiento de puntos clave entre frames
    const previousFrame = this.frameHistory[this.frameHistory.length - 1];
    const currentFrame = landmarks;
    
    // Puntos clave para estabilidad
    const keyPoints = [0, 11, 12, 23, 24]; // nariz, hombros, caderas
    
    let totalMovement = 0;
    keyPoints.forEach(pointIndex => {
      const prevPoint = previousFrame.landmarks[pointIndex];
      const currPoint = currentFrame[pointIndex];
      
      const movement = Math.sqrt(
        Math.pow(currPoint.x - prevPoint.x, 2) + 
        Math.pow(currPoint.y - prevPoint.y, 2)
      );
      
      totalMovement += movement;
    });
    
    // Estabilidad inversamente proporcional al movimiento
    const avgMovement = totalMovement / keyPoints.length;
    const stability = Math.max(0, 100 - avgMovement * 1000);
    
    return Math.round(stability);
  }

  private calculateVelocity(landmarks: PoseLandmark[]): number {
    if (this.frameHistory.length < 2) return 0;
    
    // Calcular velocidad de movimiento principal
    const previousFrame = this.frameHistory[this.frameHistory.length - 2];
    const currentFrame = this.frameHistory[this.frameHistory.length - 1];
    
    // Usar punto central (cadera) para velocidad general
    const prevHip = previousFrame.landmarks[24];
    const currHip = landmarks[24];
    
    const distance = Math.sqrt(
      Math.pow(currHip.x - prevHip.x, 2) + 
      Math.pow(currHip.y - prevHip.y, 2)
    );
    
    const timeDiff = (currentFrame.timestamp - previousFrame.timestamp) / 1000; // segundos
    
    return timeDiff > 0 ? distance / timeDiff : 0;
  }

  private shouldCaptureFrame(analysis: Partial<FrameAnalysis>): {
    shouldCapture: boolean;
    captureReason: string;
  } {
    const reasons: string[] = [];
    let shouldCapture = false;

    // 1. Calidad excepcionalmente alta (>90%)
    if (analysis.quality && analysis.quality > 0.9) {
      shouldCapture = true;
      reasons.push('Excellent form quality');
    }

    // 2. Fases críticas del movimiento
    if (analysis.phase === 'transition') {
      shouldCapture = true;
      reasons.push('Critical movement phase');
    }

    // 3. Problemas significativos de técnica (<50%)
    if (analysis.quality && analysis.quality < 0.5) {
      shouldCapture = true;
      reasons.push('Technical issues detected');
    }

    // 4. Comparación con frame anterior significativamente mejor
    if (this.frameHistory.length > 0) {
      const lastFrame = this.frameHistory[this.frameHistory.length - 1];
      if (analysis.quality && lastFrame.quality && 
          analysis.quality - lastFrame.quality > 0.2) {
        shouldCapture = true;
        reasons.push('Significant improvement');
      }
    }

    // 5. Primera repetición o última
    if (this.frameHistory.length < 3) {
      shouldCapture = true;
      reasons.push('Initial movement pattern');
    }

    // 6. Intervalo regular (cada 5 frames)
    if (this.frameHistory.length % 5 === 0) {
      shouldCapture = true;
      reasons.push('Regular interval capture');
    }

    return {
      shouldCapture,
      captureReason: reasons.join(', ')
    };
  }

  private updateFrameHistory(analysis: FrameAnalysis): void {
    this.frameHistory.push(analysis);
    
    // Mantener solo los últimos frames
    if (this.frameHistory.length > this.maxFrames) {
      this.frameHistory.shift();
    }
  }

  getBestFrames(): FrameAnalysis[] {
    return this.frameHistory
      .filter(frame => frame.shouldCapture)
      .sort((a, b) => b.quality - a.quality)
      .slice(0, 5); // Top 5 frames
  }

  getProgressionAnalysis(): {
    trend: 'improving' | 'declining' | 'stable';
    averageQuality: number;
    bestPhase: string;
    recommendations: string[];
  } {
    if (this.frameHistory.length < 3) {
      return {
        trend: 'stable',
        averageQuality: 0,
        bestPhase: 'unknown',
        recommendations: ['Need more data for analysis']
      };
    }

    // Calcular tendencia
    const qualities = this.frameHistory.map(f => f.quality);
    const firstHalf = qualities.slice(0, Math.floor(qualities.length / 2));
    const secondHalf = qualities.slice(Math.floor(qualities.length / 2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    let trend: 'improving' | 'declining' | 'stable';
    if (secondAvg - firstAvg > 0.1) {
      trend = 'improving';
    } else if (firstAvg - secondAvg > 0.1) {
      trend = 'declining';
    } else {
      trend = 'stable';
    }

    // Encontrar mejor fase
    const phaseQualities: { [key: string]: number[] } = {};
    this.frameHistory.forEach(frame => {
      if (!phaseQualities[frame.phase]) {
        phaseQualities[frame.phase] = [];
      }
      phaseQualities[frame.phase].push(frame.quality);
    });

    let bestPhase = 'unknown';
    let bestPhaseQuality = 0;
    Object.entries(phaseQualities).forEach(([phase, qualities]) => {
      const avgQuality = qualities.reduce((a, b) => a + b, 0) / qualities.length;
      if (avgQuality > bestPhaseQuality) {
        bestPhaseQuality = avgQuality;
        bestPhase = phase;
      }
    });

    // Generar recomendaciones basadas en tendencia
    const recommendations = this.generateProgressionRecommendations(trend, bestPhase);

    return {
      trend,
      averageQuality: qualities.reduce((a, b) => a + b, 0) / qualities.length,
      bestPhase,
      recommendations
    };
  }

  private generateProgressionRecommendations(
    trend: 'improving' | 'declining' | 'stable',
    bestPhase: string
  ): string[] {
    const recommendations: string[] = [];

    switch (trend) {
      case 'improving':
        recommendations.push('Excellent progression! Keep current focus');
        recommendations.push(`Your ${bestPhase} phase is particularly strong`);
        recommendations.push('Consider increasing intensity gradually');
        break;
      case 'declining':
        recommendations.push('Focus on maintaining consistent form');
        recommendations.push('Reduce speed and prioritize control');
        recommendations.push('Check your setup and positioning');
        break;
      case 'stable':
        recommendations.push('Good consistency! Time to challenge yourself');
        recommendations.push('Try adding slight complexity or speed');
        recommendations.push('Focus on the weaker phases of movement');
        break;
    }

    return recommendations;
  }
}

// Clases auxiliares
class PhaseDetector {
  detectPhase(poseResults: PoseResults, exerciseType: string): FrameAnalysis['phase'] {
    const landmarks = poseResults.landmarks;
    
    // Lógica específica por ejercicio
    if (exerciseType.includes('squat')) {
      return this.detectSquatPhase(landmarks);
    } else if (exerciseType.includes('push')) {
      return this.detectPushUpPhase(landmarks);
    } else if (exerciseType.includes('plank')) {
      return 'transition'; // Plank es isométrico
    }
    
    return 'transition';
  }

  private detectSquatPhase(landmarks: PoseLandmark[]): FrameAnalysis['phase'] {
    const hipY = landmarks[24].y;
    const kneeY = landmarks[26].y;
    const ankleY = landmarks[28].y;
    
    // Calcular profundidad relativa
    const squatDepth = (kneeY - hipY) / (ankleY - hipY);
    
    if (squatDepth < 0.3) return 'setup';
    if (squatDepth < 0.6) return 'eccentric';
    if (squatDepth < 0.8) return 'transition';
    if (squatDepth < 0.95) return 'transition';
    return 'concentric';
  }

  private detectPushUpPhase(landmarks: PoseLandmark[]): FrameAnalysis['phase'] {
    const shoulderY = landmarks[12].y;
    const elbowY = landmarks[14].y;
    
    // Calcular ángulo del codo
    const elbowAngle = this.calculateAngle(
      landmarks[12], landmarks[14], landmarks[16]
    );
    
    if (elbowAngle > 160) return 'setup';
    if (elbowAngle > 120) return 'eccentric';
    if (elbowAngle > 90) return 'transition';
    if (elbowAngle > 45) return 'transition';
    return 'concentric';
  }

  private calculateAngle(a: PoseLandmark, b: PoseLandmark, c: PoseLandmark): number {
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const bc = { x: c.x - b.x, y: c.y - b.y };
    
    const dotProduct = ab.x * bc.x + ab.y * bc.y;
    const magnitudeAB = Math.sqrt(ab.x * ab.x + ab.y * ab.y);
    const magnitudeBC = Math.sqrt(bc.x * bc.x + bc.y * bc.y);
    
    const cosAngle = dotProduct / (magnitudeAB * magnitudeBC);
    return Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
  }
}

class QualityAnalyzer {
  analyzeQuality(
    poseResults: PoseResults, 
    exerciseType: string, 
    phase: string
  ): number {
    let quality = 1.0;
    
    // Análisis base
    quality *= this.analyzePosture(poseResults.landmarks);
    quality *= this.analyzeAlignment(poseResults.landmarks, exerciseType);
    quality *= this.analyzeStability(poseResults.landmarks);
    quality *= this.analyzeRangeOfMotion(poseResults.landmarks, exerciseType, phase);
    
    return Math.max(0, Math.min(1, quality));
  }

  private analyzePosture(landmarks: PoseLandmark[]): number {
    // Evaluar alineación general
    const spineAlignment = this.calculateSpineAlignment(landmarks);
    return Math.max(0, 1 - spineAlignment * 2);
  }

  private analyzeAlignment(landmarks: PoseLandmark[], exerciseType: string): number {
    // Evaluar alineación específica del ejercicio
    if (exerciseType.includes('squat')) {
      return this.analyzeSquatAlignment(landmarks);
    } else if (exerciseType.includes('push')) {
      return this.analyzePushUpAlignment(landmarks);
    }
    return 1.0;
  }

  private analyzeStability(landmarks: PoseLandmark[]): number {
    // Evaluar estabilidad basada en movimiento mínimo de puntos clave
    return 0.9; // Simplificado por ahora
  }

  private analyzeRangeOfMotion(landmarks: PoseLandmark[], exerciseType: string, phase: string): number {
    // Evaluar rango de movimiento apropiado para la fase
    return 0.8; // Simplificado por ahora
  }

  private calculateSpineAlignment(landmarks: PoseLandmark[]): number {
    const shoulder = landmarks[12];
    const hip = landmarks[24];
    const ankle = landmarks[28];
    
    // Calcular desviación de línea recta
    const idealLine = Math.abs(shoulder.x - ankle.x);
    const actualDeviation = Math.abs(hip.x - ((shoulder.x + ankle.x) / 2));
    
    return actualDeviation / (idealLine + 0.001);
  }

  private analyzeSquatAlignment(landmarks: PoseLandmark[]): number {
    // Evaluar alineación de rodillas sobre dedos del pie
    const knee = landmarks[26];
    const ankle = landmarks[28];
    const hip = landmarks[24];
    
    const kneeAlignment = Math.abs(knee.x - ankle.x);
    const acceptableDeviation = 0.05; // 5% del ancho de cadera
    
    return Math.max(0, 1 - kneeAlignment / acceptableDeviation);
  }

  private analyzePushUpAlignment(landmarks: PoseLandmark[]): number {
    // Evaluar alineación de cuerpo en línea recta
    const shoulder = landmarks[12];
    const hip = landmarks[24];
    const ankle = landmarks[28];
    
    const bodyLine = Math.abs(shoulder.y - ankle.y);
    const hipDeviation = Math.abs(hip.y - ((shoulder.y + ankle.y) / 2));
    
    return Math.max(0, 1 - hipDeviation / (bodyLine * 0.1));
  }
}

class RecommendationEngine {
  generateRecommendations(
    quality: number,
    keyPoints: FrameAnalysis['keyPoints'],
    frameHistory: FrameAnalysis[]
  ): string[] {
    const recommendations: string[] = [];

    // Recomendaciones basadas en calidad
    if (quality < 0.5) {
      recommendations.push('Focus on basic form before increasing intensity');
    } else if (quality > 0.8) {
      recommendations.push('Excellent form! Ready to progress');
    }

    // Recomendaciones basadas en puntos clave
    if (keyPoints.symmetry < 80) {
      recommendations.push('Check for imbalances between left and right sides');
    }

    if (keyPoints.stability < 70) {
      recommendations.push('Work on core stability and control');
    }

    if (keyPoints.jointAngles.kneeValgus > 5) {
      recommendations.push('Focus on knee alignment - avoid valgus collapse');
    }

    // Recomendaciones basadas en historia
    if (frameHistory.length > 3) {
      const recentQuality = frameHistory.slice(-3).map(f => f.quality);
      const avgRecent = recentQuality.reduce((a, b) => a + b, 0) / recentQuality.length;
      
      if (avgRecent < quality - 0.2) {
        recommendations.push('Quality declining - take a short rest');
      }
    }

    return recommendations;
  }
}