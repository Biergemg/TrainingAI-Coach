import { create } from 'zustand';

export interface Exercise {
  id: string;
  name: string;
  category: 'fms' | 'animal_flow' | 'calisthenics' | 'plyometrics';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
  instructions: string[];
}

export interface Session {
  id: string;
  date: string;
  exerciseId: string;
  repetitions: number;
  quality: number;
  notes: string;
  painLevel: number;
  fatigueLevel: number;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  experience: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
}

interface TrainingState {
  user: UserProfile | null;
  exercises: Exercise[];
  sessions: Session[];
  currentExercise: Exercise | null;
  isTrainingActive: boolean;
  detectionMetrics: {
    valgoAngle: number;
    kneeAngle: number;
    hipAngle: number;
    quality: number;
  };
  achievements: string[];
  streak: number;
}

interface TrainingActions {
  setUser: (user: UserProfile) => void;
  setCurrentExercise: (exercise: Exercise) => void;
  startTraining: () => void;
  stopTraining: () => void;
  addSession: (session: Session) => void;
  updateDetectionMetrics: (metrics: Partial<TrainingState['detectionMetrics']>) => void;
  addAchievement: (achievement: string) => void;
  updateStreak: (days: number) => void;
}

const initialExercises: Exercise[] = [
  {
    id: 'deep-squat',
    name: 'Deep Squat',
    category: 'fms',
    difficulty: 'beginner',
    targetMuscles: ['quadriceps', 'glutes', 'hamstrings'],
    instructions: [
      'Pies separados al ancho de cadera',
      'Bajar manteniendo espalda recta',
      'Rodillas alineadas con pies',
      'Subir controladamente'
    ]
  },
  {
    id: 'animal-flow-crab',
    name: 'Animal Flow - Crab',
    category: 'animal_flow',
    difficulty: 'intermediate',
    targetMuscles: ['shoulders', 'core', 'glutes'],
    instructions: [
      'Posición de cangrejo',
      'Mantener core activado',
      'Mover extremidades coordinadamente',
      'Mantener ritmo constante'
    ]
  },
  {
    id: 'nordic-curl',
    name: 'Nordic Curl',
    category: 'calisthenics',
    difficulty: 'advanced',
    targetMuscles: ['hamstrings', 'glutes'],
    instructions: [
      'Asegurar tobillos',
      'Mantener torso recto',
      'Bajar lentamente',
      'Controlar la bajada'
    ]
  }
];

export const useTrainingStore = create<TrainingState & TrainingActions>((set) => ({
  user: null,
  exercises: initialExercises,
  sessions: [],
  currentExercise: null,
  isTrainingActive: false,
  detectionMetrics: {
    valgoAngle: 0,
    kneeAngle: 0,
    hipAngle: 0,
    quality: 0,
  },
  achievements: [],
  streak: 0,

  setUser: (user) => set({ user }),
  setCurrentExercise: (exercise) => set({ currentExercise: exercise }),
  startTraining: () => set({ isTrainingActive: true }),
  stopTraining: () => set({ isTrainingActive: false }),
  addSession: (session) => set((state) => ({ 
    sessions: [...state.sessions, session] 
  })),
  updateDetectionMetrics: (metrics) => set((state) => ({
    detectionMetrics: { ...state.detectionMetrics, ...metrics }
  })),
  addAchievement: (achievement) => set((state) => ({
    achievements: [...state.achievements, achievement]
  })),
  updateStreak: (days) => set({ streak: days }),
}));