import { Database } from 'sql.js';
import { PHVResult } from './phvCalculator';
import { ELITE_EXERCISES_COMPLETE } from '../data/eliteExercisesComplete';

export interface AthleteProfile {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  sport: string;
  position?: string;
  trainingYears: number;
  goals: string[];
  injuryHistory: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AthleteMeasurements {
  id: string;
  athleteId: string;
  date: string;
  height: number;
  weight: number;
  sittingHeight: number;
  legLength: number;
  armSpan: number;
  phvStatus: 'pre' | 'active' | 'post' | 'unknown';
  phvVelocity: number;
  growthRate: number;
  bioBand: 'red' | 'yellow' | 'green';
  restrictions: string[];
  notes: string;
}

export interface PHVHistoricalData {
  id: string;
  athleteId: string;
  measurements: AthleteMeasurements[];
  currentPHV: PHVResult;
  trend: 'accelerating' | 'decelerating' | 'stable' | 'unknown';
  nextAssessment: string;
  riskFactors: string[];
}

export interface Exercise {
  id: string;
  name: string;
  category: 'fms' | 'animal_flow' | 'calisthenics' | 'plyometrics' | 'strength' | 'mobility' | 'power' | 'speed';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  targetMuscles: string[];
  movementPattern: string;
  equipment: string[];
  instructions: string[];
  cues: string[];
  commonMistakes: string[];
  regressions: string[];
  progressions: string[];
  phvSafe: boolean;
  contraindications: string[];
  minAge: number;
  maxAge: number;
  eliteVariations: string[];
}

export interface TrainingSession {
  id: string;
  athleteId: string;
  date: string;
  phase: 'assessment' | 'correction' | 'development' | 'performance' | 'elite';
  exercises: SessionExercise[];
  duration: number;
  totalScore: number;
  averageQuality: number;
  fatigueLevel: number;
  painLevel: number;
  notes: string;
  weather?: string;
  location?: string;
  coach?: string;
}

export interface SessionExercise {
  exerciseId: string;
  sets: ExerciseSet[];
  restBetweenSets: number;
  tempo?: string;
  notes: string;
}

export interface ExerciseSet {
  id: string;
  repetitions: number;
  quality: number;
  valgoAngle?: number;
  kneeAngle?: number;
  hipAngle?: number;
  ankleAngle?: number;
  trunkAngle?: number;
  speed?: number;
  power?: number;
  videoUrl?: string;
  frameCapture?: string;
  aiAnalysis?: AIAnalysis;
  completed: boolean;
  timestamp: string;
}

export interface AIAnalysis {
  technique: {
    score: number;
    breakdown: {
      alignment: number;
      control: number;
      range: number;
      stability: number;
    };
  };
  keyPoints: {
    good: string[];
    improve: string[];
    critical: string[];
  };
  recommendations: string[];
  nextProgression: string;
  riskLevel: 'low' | 'medium' | 'high';
  eliteStandards: {
    current: number;
    target: number;
    gap: number;
  };
}

export interface EliteRoutine {
  id: string;
  name: string;
  sport: string;
  position?: string;
  level: 'development' | 'college' | 'professional' | 'elite';
  duration: number;
  phases: RoutinePhase[];
  goals: string[];
  prerequisites: string[];
  equipment: string[];
  coach?: string;
  team?: string;
  seasonPhase: 'pre' | 'in' | 'post' | 'off';
  eliteStandards?: EliteStandard[];
}

export interface RoutinePhase {
  name: string;
  order: number;
  exercises: PhaseExercise[];
  duration: number;
  intensity: 'low' | 'medium' | 'high' | 'max';
  rest: number;
  notes: string;
}

export interface PhaseExercise {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: number;
  tempo: string;
  load?: number;
  progression: string;
  eliteStandards?: EliteStandard[];
}

export interface EliteStandard {
  metric: string;
  beginner: number;
  intermediate: number;
  advanced: number;
  elite: number;
  professional: number;
}

class EliteDatabase {
  private static instance: EliteDatabase;
  private db: Database | null = null;
  private ready = false;

  static getInstance(): EliteDatabase {
    if (!EliteDatabase.instance) {
      EliteDatabase.instance = new EliteDatabase();
    }
    return EliteDatabase.instance;
  }

  async initialize(): Promise<void> {
    try {
      const SQL = await import('sql.js');
      const SQLJS = await SQL.default();
      this.db = new SQLJS.Database();
      
      this.createTables();
      this.seedEliteData();
      this.ready = true;
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private createTables(): void {
    if (!this.db) return;

    // Tabla de atletas
    this.db.run(`
      CREATE TABLE athletes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        height REAL NOT NULL,
        weight REAL NOT NULL,
        experience TEXT CHECK(experience IN ('beginner', 'intermediate', 'advanced', 'elite')) NOT NULL,
        sport TEXT NOT NULL,
        position TEXT,
        training_years INTEGER DEFAULT 0,
        goals TEXT,
        injury_history TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de mediciones (PHV)
    this.db.run(`
      CREATE TABLE measurements (
        id TEXT PRIMARY KEY,
        athlete_id TEXT REFERENCES athletes(id),
        date TEXT NOT NULL,
        height REAL NOT NULL,
        weight REAL NOT NULL,
        sitting_height REAL,
        leg_length REAL,
        arm_span REAL,
        phv_status TEXT CHECK(phv_status IN ('pre', 'active', 'post', 'unknown')),
        phv_velocity REAL,
        growth_rate REAL,
        bio_band TEXT CHECK(bio_band IN ('red', 'yellow', 'green')),
        restrictions TEXT,
        notes TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de ejercicios elite
    this.db.run(`
      CREATE TABLE exercises (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT CHECK(difficulty IN ('beginner', 'intermediate', 'advanced', 'elite')),
        target_muscles TEXT,
        movement_pattern TEXT,
        equipment TEXT,
        instructions TEXT,
        cues TEXT,
        common_mistakes TEXT,
        regressions TEXT,
        progressions TEXT,
        phv_safe BOOLEAN DEFAULT true,
        contraindications TEXT,
        min_age INTEGER,
        max_age INTEGER,
        elite_variations TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de sesiones
    this.db.run(`
      CREATE TABLE sessions (
        id TEXT PRIMARY KEY,
        athlete_id TEXT REFERENCES athletes(id),
        date TEXT NOT NULL,
        phase TEXT CHECK(phase IN ('assessment', 'correction', 'development', 'performance', 'elite')),
        duration INTEGER,
        total_score REAL,
        average_quality REAL,
        fatigue_level INTEGER,
        pain_level INTEGER,
        notes TEXT,
        weather TEXT,
        location TEXT,
        coach TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de rutinas elite
    this.db.run(`
      CREATE TABLE elite_routines (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        sport TEXT NOT NULL,
        position TEXT,
        level TEXT CHECK(level IN ('development', 'college', 'professional', 'elite')),
        duration INTEGER,
        goals TEXT,
        prerequisites TEXT,
        equipment TEXT,
        coach TEXT,
        team TEXT,
        season_phase TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  private seedEliteData(): void {
    if (!this.db) return;

    // Insertar ejercicios FMS completos
    const fmsExercises = [
      {
        id: 'fms_deep_squat',
        name: 'Deep Squat Assessment',
        category: 'fms',
        difficulty: 'elite',
        target_muscles: 'Full Body',
        movement_pattern: 'Squat Pattern',
        equipment: 'None',
        instructions: '1. Start with feet shoulder width apart\n2. Descend into full squat\n3. Maintain upright torso\n4. Heels remain flat\n5. Knees track over toes',
        cues: 'Chest up, Knees out, Heels down',
        elite_variations: 'Overhead Deep Squat, Single Leg Deep Squat',
        phv_safe: true,
        min_age: 8,
        max_age: 80
      },
      {
        id: 'fms_hurdle_step',
        name: 'Hurdle Step Assessment',
        category: 'fms',
        difficulty: 'elite',
        target_muscles: 'Hip Flexors, Core, Single Leg Stability',
        movement_pattern: 'Step Pattern',
        equipment: 'Hurdle',
        instructions: '1. Step over hurdle maintaining posture\n2. Controlled descent\n3. Alternate legs\n4. No compensation patterns',
        cues: 'Tall posture, Controlled movement',
        elite_variations: 'Weighted Hurdle Step, Dynamic Hurdle Step',
        phv_safe: true,
        min_age: 10,
        max_age: 80
      },
      {
        id: 'elite_nordic_curl',
        name: 'Nordic Hamstring Curl - Elite',
        category: 'strength',
        difficulty: 'elite',
        target_muscles: 'Hamstrings, Glutes, Core',
        movement_pattern: 'Knee Flexion',
        equipment: 'Nordic Bench, Partner',
        instructions: '1. Kneel with ankles secured\n2. Maintain straight line from knees to head\n3. Lower under control\n4. Use minimal assistance\n5. Return to start position',
        cues: 'Hips extended, Core braced, Controlled descent',
        elite_variations: 'Weighted Nordic, Single Leg Nordic, Banded Nordic',
        phv_safe: false, // Restricted during PHV
        contraindications: 'Active PHV, Hamstring injury history',
        min_age: 16,
        max_age: 35
      }
    ];

    fmsExercises.forEach(exercise => {
      this.db!.run(`
        INSERT INTO exercises (
          id, name, category, difficulty, target_muscles, movement_pattern,
          equipment, instructions, cues, elite_variations, phv_safe, min_age, max_age
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        exercise.id, exercise.name, exercise.category, exercise.difficulty,
        exercise.target_muscles, exercise.movement_pattern, exercise.equipment,
        exercise.instructions, exercise.cues, exercise.elite_variations,
        exercise.phv_safe ? 1 : 0, exercise.min_age, exercise.max_age
      ]);
    });
  }

  // Métodos de acceso a datos
  async getAthlete(id: string): Promise<AthleteProfile | null> {
    if (!this.db) return null;
    
    const result = this.db.exec(`
      SELECT * FROM athletes WHERE id = ?
    `, [id]);
    
    if (result.length === 0) return null;
    
    const row = result[0].values[0];
    return {
      id: row[0] as string,
      name: row[1] as string,
      age: row[2] as number,
      height: row[3] as number,
      weight: row[4] as number,
      experience: row[5] as 'beginner' | 'intermediate' | 'advanced' | 'elite',
      sport: row[6] as string,
      position: row[7] as string,
      trainingYears: row[8] as number,
      goals: JSON.parse(row[9] as string),
      injuryHistory: JSON.parse(row[10] as string),
      createdAt: row[11] as string,
      updatedAt: row[12] as string
    };
  }

  async saveAthlete(athlete: AthleteProfile): Promise<void> {
    if (!this.db) return;
    
    this.db.run(`
      INSERT OR REPLACE INTO athletes (
        id, name, age, height, weight, experience, sport, position,
        training_years, goals, injury_history, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [
      athlete.id, athlete.name, athlete.age, athlete.height, athlete.weight,
      athlete.experience, athlete.sport, athlete.position, athlete.trainingYears,
      JSON.stringify(athlete.goals), JSON.stringify(athlete.injuryHistory)
    ]);
  }

  async addAthlete(athlete: AthleteProfile): Promise<void> {
    await this.saveAthlete(athlete);
  }

  async getExercises(filters?: {
    category?: string;
    difficulty?: string;
    phvSafe?: boolean;
    sport?: string;
  }): Promise<Exercise[]> {
    if (!this.db) return [];
    
    let query = 'SELECT * FROM exercises WHERE 1=1';
    const params: any[] = [];
    
    if (filters?.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }
    
    if (filters?.difficulty) {
      query += ' AND difficulty = ?';
      params.push(filters.difficulty);
    }
    
    if (filters?.phvSafe !== undefined) {
      query += ' AND phv_safe = ?';
      params.push(filters.phvSafe);
    }
    
    query += ' ORDER BY difficulty, name';
    
    const result = this.db.exec(query, params);
    
    // Si no hay ejercicios en BD, usar los ejercicios elite completos
    if (!result.length || result[0].values.length === 0) {
      let filteredExercises = ELITE_EXERCISES_COMPLETE;

      if (filters?.category) {
        filteredExercises = filteredExercises.filter(ex => ex.category === filters.category);
      }
      if (filters?.difficulty) {
        filteredExercises = filteredExercises.filter(ex => ex.difficulty === filters.difficulty);
      }
      if (filters?.phvSafe !== undefined) {
        filteredExercises = filteredExercises.filter(ex => ex.phvSafe === filters.phvSafe);
      }

      return filteredExercises;
    }
    
    return result[0].values.map(row => ({
      id: row[0] as string,
      name: row[1] as string,
      category: row[2] as 'fms' | 'animal_flow' | 'calisthenics' | 'plyometrics' | 'strength' | 'mobility' | 'power' | 'speed',
      difficulty: row[3] as 'beginner' | 'intermediate' | 'advanced' | 'elite',
      targetMuscles: JSON.parse(row[4] as string),
      movementPattern: row[5] as string,
      equipment: JSON.parse(row[6] as string),
      instructions: JSON.parse(row[7] as string),
      cues: JSON.parse(row[8] as string),
      commonMistakes: JSON.parse(row[9] as string),
      regressions: JSON.parse(row[10] as string),
      progressions: JSON.parse(row[11] as string),
      phvSafe: row[12] === 1,
      contraindications: JSON.parse(row[13] as string),
      minAge: row[14] as number,
      maxAge: row[15] as number,
      eliteVariations: JSON.parse(row[16] as string)
    }));
  }

  async getSessions(athleteId: string, timeframe: string = '30d'): Promise<TrainingSession[]> {
    if (!this.db) return [];
    
    let days = 30;
    switch (timeframe) {
      case '7d': days = 7; break;
      case '30d': days = 30; break;
      case '90d': days = 90; break;
      case '1y': days = 365; break;
    }
    
    const result = this.db.exec(`
      SELECT * FROM sessions 
      WHERE athlete_id = ? 
      AND date >= datetime('now', '-' || ? || ' days')
      ORDER BY date DESC
    `, [athleteId, days]);
    
    if (result.length === 0) return [];
    
    return result[0].values.map(row => ({
      id: row[0] as string,
      athleteId: row[1] as string,
      date: row[2] as string,
      phase: row[3] as 'assessment' | 'correction' | 'development' | 'performance' | 'elite',
      duration: row[4] as number,
      totalScore: row[5] as number,
      averageQuality: row[6] as number,
      fatigueLevel: row[7] as number,
      painLevel: row[8] as number,
      notes: row[9] as string,
      weather: row[10] as string,
      location: row[11] as string,
      coach: row[12] as string,
      exercises: JSON.parse(row[13] as string)
    }));
  }

  async getSessionsByAthlete(athleteId: string): Promise<TrainingSession[]> {
    return this.getSessions(athleteId, '1y');
  }

  async saveSession(session: TrainingSession): Promise<void> {
    if (!this.db) return;
    
    this.db.run(`
      INSERT INTO sessions (
        id, athlete_id, date, phase, duration, total_score,
        average_quality, fatigue_level, pain_level, notes, weather, location, coach
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      session.id, session.athleteId, session.date, session.phase,
      session.duration, session.totalScore, session.averageQuality,
      session.fatigueLevel, session.painLevel, session.notes,
      session.weather, session.location, session.coach
    ]);
  }

  async getAthleteProgress(athleteId: string, days: number = 30): Promise<any> {
    if (!this.db) return null;
    
    const result = this.db.exec(`
      SELECT 
        DATE(date) as session_date,
        AVG(total_score) as avg_score,
        AVG(average_quality) as avg_quality,
        COUNT(*) as session_count,
        SUM(duration) as total_duration
      FROM sessions 
      WHERE athlete_id = ? 
        AND date >= datetime('now', '-${days} days')
      GROUP BY DATE(date)
      ORDER BY session_date DESC
    `, [athleteId]);
    
    if (result.length === 0) return null;
    
    return result[0].values.map(row => ({
      date: row[0],
      avgScore: row[1],
      avgQuality: row[2],
      sessionCount: row[3],
      totalDuration: row[4]
    }));
  }

  async savePHVMeasurement(measurement: AthleteMeasurements): Promise<void> {
    if (!this.db) return;
    
    this.db.run(`
      INSERT INTO measurements (
        id, athlete_id, date, height, weight, sitting_height, leg_length, arm_span,
        phv_status, phv_velocity, growth_rate, bio_band, restrictions, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      measurement.id, measurement.athleteId, measurement.date, measurement.height,
      measurement.weight, measurement.sittingHeight, measurement.legLength, measurement.armSpan,
      measurement.phvStatus, measurement.phvVelocity, measurement.growthRate, measurement.bioBand,
      JSON.stringify(measurement.restrictions), measurement.notes
    ]);
  }

  async getPHVHistory(athleteId: string, limit: number = 12): Promise<AthleteMeasurements[]> {
    if (!this.db) return [];
    
    const result = this.db.exec(`
      SELECT * FROM measurements 
      WHERE athlete_id = ? 
      ORDER BY date DESC 
      LIMIT ?
    `, [athleteId, limit]);
    
    if (result.length === 0) return [];
    
    return result[0].values.map(row => ({
      id: row[0] as string,
      athleteId: row[1] as string,
      date: row[2] as string,
      height: row[3] as number,
      weight: row[4] as number,
      sittingHeight: row[5] as number,
      legLength: row[6] as number,
      armSpan: row[7] as number,
      phvStatus: row[8] as 'pre' | 'active' | 'post' | 'unknown',
      phvVelocity: row[9] as number,
      growthRate: row[10] as number,
      bioBand: row[11] as 'red' | 'yellow' | 'green',
      restrictions: JSON.parse(row[12] as string),
      notes: row[13] as string
    }));
  }

  async getCurrentPHVStatus(athleteId: string): Promise<PHVHistoricalData | null> {
    const history = await this.getPHVHistory(athleteId, 6);
    if (history.length === 0) return null;
    
    const current = history[0];
    const { PHVCalculator } = await import('./phvCalculator');
    
    // Convertir a formato de cálculo PHV
    const phvCalc = {
      age: 0, // Se calculará dinámicamente
      height: current.height,
      sittingHeight: current.sittingHeight,
      legLength: current.legLength,
      weight: current.weight,
      armSpan: current.armSpan,
      date: current.date,
      previousMeasurements: history.slice(1).map(m => ({
        age: 0, // Se calculará dinámicamente
        height: m.height,
        sittingHeight: m.sittingHeight,
        legLength: m.legLength,
        weight: m.weight,
        armSpan: m.armSpan,
        date: m.date
      }))
    };
    
    const currentPHV = PHVCalculator.calculate(phvCalc);
    
    // Determinar tendencia
    const trend = this.calculatePHVTrend(history);
    
    return {
      id: `${athleteId}-phv-${Date.now()}`,
      athleteId,
      measurements: history,
      currentPHV,
      trend,
      nextAssessment: currentPHV.nextAssessmentDate,
      riskFactors: currentPHV.restrictions
    };
  }

  private calculatePHVTrend(history: AthleteMeasurements[]): 'accelerating' | 'decelerating' | 'stable' | 'unknown' {
    if (history.length < 3) return 'unknown';
    
    const recent = history.slice(0, 3);
    const avgGrowth = recent.reduce((sum, m) => sum + m.growthRate, 0) / recent.length;
    
    if (avgGrowth > 0.4) return 'accelerating';
    if (avgGrowth < 0.1) return 'decelerating';
    return 'stable';
  }

  isReady(): boolean {
    return this.ready;
  }
}

export { EliteDatabase };

export const eliteDB = new EliteDatabase();