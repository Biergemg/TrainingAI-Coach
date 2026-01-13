import { Exercise } from '../lib/database';

export const ELITE_EXERCISES: Exercise[] = [
  // FMS COMPLETO - 7 ejercicios
  {
    id: 'fms_deep_squat_elite',
    name: 'Deep Squat Assessment - Elite',
    category: 'fms',
    difficulty: 'elite',
    targetMuscles: ['Full Body', 'Core', 'Lower Body'],
    movementPattern: 'Squat Pattern',
    equipment: ['None'],
    instructions: [
      'Coloca los pies al ancho de caderas',
      'Extiende los brazos completamente sobre la cabeza',
      'Desciende en squat manteniendo talones en el suelo',
      'Mantén torso erguido y brazos extendidos',
      'La espalda baja debe mantenerse neutra',
      'Las rodillas deben alinearse con los dedos del pie',
      'Regresa a posición inicial controladamente'
    ],
    cues: ['Talones pegados al suelo', 'Rodillas hacia afuera', 'Torso erguido', 'Brazos extendidos'],
    commonMistakes: ['Talones se levantan', 'Rodillas valgas', 'Torso se inclina hacia adelante', 'Brazos caen'],
    regressions: ['Squat con soporte', 'Squat parcial', 'Sin brazos extendidos'],
    progressions: ['Overhead squat con peso', 'Single leg deep squat', 'Deep squat isométrico'],
    phvSafe: true,
    contraindications: ['Lesiones recientes de rodilla', 'Problemas de cadera severos'],
    minAge: 8,
    maxAge: 80,
    eliteVariations: ['Overhead Deep Squat 20kg', 'Single Leg Deep Squat', 'Deep Squat 2min Isometric']
  },
  
  {
    id: 'fms_hurdle_step_elite',
    name: 'Hurdle Step Assessment - Elite',
    category: 'fms',
    difficulty: 'elite',
    targetMuscles: ['Hip Flexors', 'Core', 'Single Leg Stability', 'Balance'],
    movementPattern: 'Step Pattern',
    equipment: ['Hurdle 30cm'],
    instructions: [
      'Colócate frente al hurdle con pies juntos',
      'Paso alternado sobre el hurdle',
      'Mantén postura erguida durante todo el movimiento',
      'Toca el talón al suelo detrás del hurdle',
      'Regresa a posición inicial sin compensaciones',
      'Alterna piernas con cada repetición'
    ],
    cues: ['Postura alta', 'Movimiento controlado', 'Rodilla de apoyo estable'],
    commonMistakes: ['Postura se inclina', 'Rodilla de apoyo valga', 'No tocar talón', 'Compensaciones en torso'],
    regressions: ['Step bajo', 'Con soporte', 'Sin hurdle'],
    progressions: ['Hurdle 45cm', 'Weighted vest', 'Eyes closed'],
    phvSafe: true,
    contraindications: ['Problemas de equilibrio severos', 'Lesiones de tobillo recientes'],
    minAge: 10,
    maxAge: 80,
    eliteVariations: ['Hurdle 45cm Weighted', 'Eyes Closed Hurdle', 'Dynamic Hurdle Series']
  },

  // CALISTENIA ÉLITE - 15 ejercicios
  {
    id: 'nordic_curl_elite',
    name: 'Nordic Hamstring Curl - Elite',
    category: 'strength',
    difficulty: 'elite',
    targetMuscles: ['Hamstrings', 'Glutes', 'Core'],
    movementPattern: 'Knee Flexion',
    equipment: ['Nordic Bench', 'Partner', 'Weight Vest'],
    instructions: [
      'Arrodíllate con tobillos asegurados',
      'Mantén línea recta de rodillas a cabeza',
      'Baja controladamente hacia adelante',
      'Usa mínima asistencia de manos',
      'Contrae fuertemente isquiotibiales',
      'Regresa a posición inicial',
      'Mantén caderas extendidas todo el tiempo'
    ],
    cues: ['Caderas extendidas', 'Core contraído', 'Descenso controlado', 'Mínima asistencia'],
    commonMistakes: ['Caderas se flexionan', 'Caída sin control', 'Demasiada ayuda de brazos', 'No mantener línea recta'],
    regressions: ['Asistencia de banda', 'Rango parcial', 'Con manos'],
    progressions: ['Sin manos', 'Weighted vest', 'Single leg'],
    phvSafe: false,
    contraindications: ['PHV activo', 'Historia de lesiones de rodilla', 'Dolor en isquiotibiales'],
    minAge: 16,
    maxAge: 35,
    eliteVariations: ['Nordic 20kg', 'Single Leg Nordic', 'Nordic 3s Eccentric']
  },

  {
    id: 'copenhagen_plank_elite',
    name: 'Copenhagen Plank - Elite',
    category: 'strength',
    difficulty: 'elite',
    targetMuscles: ['Adductors', 'Core', 'Obliques', 'Shoulders'],
    movementPattern: 'Isometric Hold',
    equipment: ['Bench', 'Weight Plate'],
    instructions: [
      'Acuéstate de lado con cadera en el banco',
      'Pierna superior en el banco, inferior colgando',
      'Levanta cadera formando línea recta',
      'Mantén posición isométrica',
      'Contrae adductores y core',
      'Respiración controlada',
      'Alterna lados'
    ],
    cues: ['Cadera arriba', 'Core apretado', 'Adductores activos', 'Línea recta'],
    commonMistakes: ['Cadera cae', 'No mantener línea', 'Respiración irregular', 'Pierna superior no activa'],
    regressions: ['Rodilla apoyada', 'Rango corto', 'Con soporte'],
    progressions: ['Pierna extendida', 'Weight on hip', 'Dynamic version'],
    phvSafe: false,
    contraindications: ['PHV activo', 'Dolor en ingle', 'Problemas de cadera'],
    minAge: 15,
    maxAge: 40,
    eliteVariations: ['Copenhagen 45s', 'Weight 10kg', 'Single Arm Copenhagen']
  },

  // PLYOMETRÍA ÉLITE - 10 ejercicios (con restricciones PHV)
  {
    id: 'depth_jump_elite',
    name: 'Depth Jump - Elite',
    category: 'plyometrics',
    difficulty: 'elite',
    targetMuscles: ['Quadriceps', 'Calves', 'Glutes', 'Core'],
    movementPattern: 'Reactive Power',
    equipment: ['Box 45-60cm', 'Force Plate'],
    instructions: [
      'Párate en el box con pies al ancho de caderas',
      'Paso hacia adelante (no salto)',
      'Aterriza en ambos pies simultáneamente',
      'Amortiguación mínima',
      'Reacción inmediata hacia arriba',
      'Máxima altura y mínimo tiempo de contacto',
      'Aterriza suavemente'
    ],
    cues: ['Paso no salto', 'Aterrizaje suave', 'Reacción rápida', 'Máxima altura'],
    commonMistakes: ['Saltar desde el box', 'Aterrizaje duro', 'Tiempo de contacto largo', 'No reaccionar'],
    regressions: ['Step down', 'Lower box', 'No jump'],
    progressions: ['Higher box', 'Weighted vest', 'Multiple jumps'],
    phvSafe: false,
    contraindications: ['PHV activo', 'Banda roja', 'Menos de 16 años', 'Historia de lesiones'],
    minAge: 16,
    maxAge: 30,
    eliteVariations: ['Depth Jump 60cm', 'Weighted 10kg', 'Depth Jump to Hurdle']
  },

  {
    id: 'bounding_elite',
    name: 'Bounding Series - Elite',
    category: 'plyometrics',
    difficulty: 'elite',
    targetMuscles: ['Hip Flexors', 'Calves', 'Glutes', 'Hamstrings'],
    movementPattern: 'Elastic Power',
    equipment: ['Cones', 'Timing System'],
    instructions: [
      'Inicia con carrera suave',
      'Conversión de energía elástica',
      'Zancadas largas y potentes',
      'Fase aérea máxima',
      'Aterrizaje en media planta',
      'Ciclo de estiramiento-acortamiento',
      'Mantener velocidad de desplazamiento'
    ],
    cues: ['Zancadas largas', 'Fase aérea', 'Aterrizaje suave', 'Elasticidad'],
    commonMistakes: ['Zancadas cortas', 'Aterrizaje duro', 'No fase aérea', 'Pérdida de velocidad'],
    regressions: ['Skipping', 'Shorter bounds', 'Lower intensity'],
    progressions: ['Triple bounds', 'Weighted', 'Uphill'],
    phvSafe: false,
    contraindications: ['PHV activo', 'Banda roja', 'Menos de 15 años'],
    minAge: 15,
    maxAge: 35,
    eliteVariations: ['Bounding 30m', 'Weighted 5kg', 'Uphill Bounding']
  },

  // MOBILIDAD ÉLITE - 8 ejercicios
  {
    id: 'overhead_squat_mobility',
    name: 'Overhead Squat Mobility - Elite',
    category: 'mobility',
    difficulty: 'elite',
    targetMuscles: ['Shoulders', 'Thoracic Spine', 'Hips', 'Ankles'],
    movementPattern: 'Full Body Mobility',
    equipment: ['PVC Pipe', 'Weight Plate'],
    instructions: [
      'Sostén barra/PVC sobre cabeza con agarre amplio',
      'Desciende en squat manteniendo brazos extendidos',
      'Mantén barra sobre línea de pies',
      'Torso erguido durante todo el movimiento',
      'Talones planos en el suelo',
      'Rodillas alineadas con pies',
      'Regresa controladamente'
    ],
    cues: ['Brazos extendidos', 'Barra sobre pies', 'Torso erguido', 'Talones abajo'],
    commonMistakes: ['Brazos caen', 'Barra adelanta', 'Torso se inclina', 'Talones se levantan'],
    regressions: ['Squat sin peso', 'Front squat', 'Box squat'],
    progressions: ['Overhead squat 20kg', 'Pause overhead squat', 'Overhead squat walk'],
    phvSafe: true,
    contraindications: ['Problemas de hombro severos', 'Limitación de movilidad tóracica'],
    minAge: 10,
    maxAge: 80,
    eliteVariations: ['Overhead Squat 30kg', '2min Overhead Hold', 'Overhead Walking Lunge']
  },

  // STRENGTH ÉLITE - 10 ejercicios
  {
    id: 'single_leg_rdl_elite',
    name: 'Single Leg RDL - Elite',
    category: 'strength',
    difficulty: 'elite',
    targetMuscles: ['Hamstrings', 'Glutes', 'Core', 'Balance'],
    movementPattern: 'Hip Hinge',
    equipment: ['Barbell', 'Dumbbells', 'Kettlebell'],
    instructions: [
      'Párate en una pierna con ligera flexión',
      'Mantén espalda neutra y core activo',
      'Baja el peso manteniendo pierna extendida atrás',
      'Siente estiramiento en isquiotibiales',
      'Contrae glúteos para regresar',
      'Mantén cadera cuadrada',
      'Alterna piernas'
    ],
    cues: ['Espalda neutra', 'Core activo', 'Cadera cuadrada', 'Pierna extendida'],
    commonMistakes: ['Espalda redondea', 'Cadera rota', 'No sentir estiramiento', 'Pérdida de balance'],
    regressions: ['Bilateral RDL', 'Bodyweight', 'Support'],
    progressions: ['Single leg 40kg', 'Deficit RDL', 'Single leg clean'],
    phvSafe: true,
    contraindications: ['Problemas de balance severos', 'Lesiones de espalda baja'],
    minAge: 14,
    maxAge: 50,
    eliteVariations: ['Single Leg RDL 40kg', 'Deficit 15cm', 'Single Leg Power Clean']
  },

  // POWER ÉLITE - 5 ejercicios
  {
    id: 'power_clean_elite',
    name: 'Power Clean - Elite',
    category: 'power',
    difficulty: 'elite',
    targetMuscles: ['Full Body', 'Posterior Chain', 'Shoulders'],
    movementPattern: 'Olympic Lift',
    equipment: ['Barbell', 'Bumper Plates', 'Platform'],
    instructions: [
      'Agarrar barra con agarre amplio',
      'Mantener espalda neutra y hombros sobre barra',
      'Extender caderas y rodillas simultáneamente',
      'Encoger hombros rápidamente',
      'Recepción en cuclillas parciales',
      'Mantener codos altos',
      'Estabilizar antes de bajar'
    ],
    cues: ['Espalda neutra', 'Extensión completa', 'Encoger hombros', 'Recepción estable'],
    commonMistakes: ['Espalda redondea', 'No extensión completa', 'Recepción inestable', 'Codos bajos'],
    regressions: ['Clean pull', 'Front squat', 'High pull'],
    progressions: ['Full clean', 'Split clean', 'Clean and jerk'],
    phvSafe: false,
    contraindications: ['PHV activo', 'Menos de 16 años', 'Falta de técnica'],
    minAge: 16,
    maxAge: 35,
    eliteVariations: ['Power Clean 100kg', 'Complex Clean', 'Clean to Thruster']
  },

  // SPEED ÉLITE - 5 ejercicios
  {
    id: 'resisted_sprint_elite',
    name: 'Resisted Sprint - Elite',
    category: 'speed',
    difficulty: 'elite',
    targetMuscles: ['Hip Flexors', 'Quadriceps', 'Calves', 'Core'],
    movementPattern: 'Acceleration',
    equipment: ['Sled', 'Resistance Bands', 'Timing Gates'],
    instructions: [
      'Ángulo de 45° en posición de salida',
      'Primero pasos cortos y rápidos',
      'Progresión a zancadas completas',
      'Mantener tensión en cuerda/resistencia',
      'Fase de aceleración de 10-20m',
      'Máxima intensidad durante resistencia',
      'Recuperación completa entre repeticiones'
    ],
    cues: ['Ángulo 45°', 'Pasos rápidos', 'Máxima intensidad', 'Recuperación completa'],
    commonMistakes: ['Posición alta', 'Pasos largos iniciales', 'Falta de intensidad', 'Recuperación insuficiente'],
    regressions: ['Sprint sin resistencia', 'Menor resistencia', 'Distancia corta'],
    progressions: ['Más resistencia', 'Hill sprint', 'Weighted vest'],
    phvSafe: false,
    contraindications: ['PHV activo', 'Banda roja', 'Menos de 15 años'],
    minAge: 15,
    maxAge: 30,
    eliteVariations: ['Resisted 20kg', 'Hill Resisted', 'Band Resisted']
  }
];

// RUTINAS ÉLITE POR DEPORTE Y POSICIÓN
export const ELITE_ROUTINES = {
  soccer: {
    striker: [
      {
        id: 'striker_power_routine',
        name: 'Striker Power Development - Elite',
        sport: 'Soccer',
        position: 'Striker',
        level: 'elite',
        duration: 90,
        phases: [
          {
            name: 'Activation & Mobility',
            order: 1,
            exercises: ['fms_deep_squat_elite', 'overhead_squat_mobility'],
            duration: 15,
            intensity: 'low',
            rest: 30,
            notes: 'Prepare body for high-intensity work'
          },
          {
            name: 'Power Development',
            order: 2,
            exercises: ['depth_jump_elite', 'bounding_elite', 'power_clean_elite'],
            duration: 45,
            intensity: 'max',
            rest: 180,
            notes: 'Explosive power for finishing'
          },
          {
            name: 'Speed & Acceleration',
            order: 3,
            exercises: ['resisted_sprint_elite'],
            duration: 20,
            intensity: 'max',
            rest: 240,
            notes: 'First 10m acceleration'
          },
          {
            name: 'Strength & Stability',
            order: 4,
            exercises: ['single_leg_rdl_elite', 'copenhagen_plank_elite'],
            duration: 10,
            intensity: 'high',
            rest: 90,
            notes: 'Unilateral strength for cutting'
          }
        ],
        goals: ['Explosive finishing', 'First step acceleration', 'Cutting power'],
        prerequisites: ['Advanced strength base', 'Good mobility', 'No PHV restrictions'],
        equipment: ['Olympic bar', 'Boxes', 'Sled', 'Timing system'],
        seasonPhase: 'pre',
        coach: 'Elite Performance Coach'
      }
    ],
    midfielder: [
      {
        id: 'midfielder_engine_routine',
        name: 'Midfielder Engine - Elite',
        sport: 'Soccer',
        position: 'Midfielder',
        level: 'elite',
        duration: 120,
        phases: [
          {
            name: 'Mobility & Activation',
            order: 1,
            exercises: ['fms_hurdle_step_elite', 'overhead_squat_mobility'],
            duration: 20,
            intensity: 'low',
            rest: 30,
            notes: 'Multi-directional mobility'
          },
          {
            name: 'Aerobic Power',
            order: 2,
            exercises: ['bounding_elite'], // Modified for endurance
            duration: 60,
            intensity: 'medium',
            rest: 60,
            notes: 'Repeat sprint ability'
          },
          {
            name: 'Strength Endurance',
            order: 3,
            exercises: ['single_leg_rdl_elite', 'copenhagen_plank_elite'],
            duration: 25,
            intensity: 'medium',
            rest: 45,
            notes: 'Core and unilateral endurance'
          },
          {
            name: 'Recovery & Mobility',
            order: 4,
            exercises: ['overhead_squat_mobility'],
            duration: 15,
            intensity: 'low',
            rest: 30,
            notes: 'Active recovery'
          }
        ],
        goals: ['Repeat sprint ability', 'Multi-directional strength', 'Core endurance'],
        prerequisites: ['Good aerobic base', 'Movement quality', 'No injuries'],
        equipment: ['Hurdles', 'Core equipment', 'Heart rate monitor'],
        seasonPhase: 'in',
        coach: 'Endurance Specialist'
      }
    ]
  },
  
  basketball: {
    guard: [
      {
        id: 'guard_explosiveness_routine',
        name: 'Guard Explosiveness - Elite',
        sport: 'Basketball',
        position: 'Guard',
        level: 'elite',
        duration: 75,
        phases: [
          {
            name: 'Dynamic Warm-up',
            order: 1,
            exercises: ['fms_deep_squat_elite', 'overhead_squat_mobility'],
            duration: 10,
            intensity: 'low',
            rest: 15,
            notes: 'Basketball-specific mobility'
          },
          {
            name: 'First Step Power',
            order: 2,
            exercises: ['resisted_sprint_elite', 'bounding_elite'],
            duration: 30,
            intensity: 'max',
            rest: 180,
            notes: '0-10m acceleration'
          },
          {
            name: 'Vertical Power',
            order: 3,
            exercises: ['depth_jump_elite', 'power_clean_elite'],
            duration: 25,
            intensity: 'max',
            rest: 240,
            notes: 'Vertical jump development'
          },
          {
            name: 'Change of Direction',
            order: 4,
            exercises: ['single_leg_rdl_elite'],
            duration: 10,
            intensity: 'high',
            rest: 60,
            notes: 'Cutting mechanics'
          }
        ],
        goals: ['First step quickness', 'Vertical explosiveness', 'Change of direction speed'],
        prerequisites: ['Advanced training age', 'Good landing mechanics', 'No PHV restrictions'],
        equipment: ['Sled', 'Boxes', 'Olympic bar', 'Timing system'],
        seasonPhase: 'pre',
        coach: 'Basketball Performance Coach'
      }
    ]
  }
};

// ESTÁNDARES ÉLITE POR NIVEL
export const ELITE_STANDARDS = {
  fms_deep_squat: {
    metric: 'Deep Squat Score',
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    elite: 3,
    professional: 3
  },
  nordic_curl: {
    metric: 'Nordic Curl (reps)',
    beginner: 3,
    intermediate: 8,
    advanced: 12,
    elite: 15,
    professional: 20
  },
  depth_jump: {
    metric: 'Depth Jump Height (cm)',
    beginner: 30,
    intermediate: 40,
    advanced: 50,
    elite: 60,
    professional: 70
  },
  power_clean: {
    metric: 'Power Clean (% bodyweight)',
    beginner: 60,
    intermediate: 80,
    advanced: 100,
    elite: 120,
    professional: 140
  },
  resisted_sprint: {
    metric: '10m Resisted Sprint (s)',
    beginner: 2.2,
    intermediate: 2.0,
    advanced: 1.8,
    elite: 1.6,
    professional: 1.4
  }
};

// FUNCIONES AUXILIARES
export const getExercisesByCategory = (category: string): Exercise[] => {
  return ELITE_EXERCISES.filter(ex => ex.category === category);
};

export const getExercisesByDifficulty = (difficulty: string): Exercise[] => {
  return ELITE_EXERCISES.filter(ex => ex.difficulty === difficulty);
};

export const getPHVSafeExercises = (): Exercise[] => {
  return ELITE_EXERCISES.filter(ex => ex.phvSafe === true);
};

export const getRoutineBySportAndPosition = (sport: string, position: string) => {
  return ELITE_ROUTINES[sport]?.[position] || [];
};

export const getEliteStandard = (exerciseId: string, level: string): number => {
  const standard = ELITE_STANDARDS[exerciseId as keyof typeof ELITE_STANDARDS];
  if (!standard) return 0;
  
  const value = standard[level as keyof typeof standard];
  return typeof value === 'number' ? value : 0;
};