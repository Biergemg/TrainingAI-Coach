import { EliteRoutine } from '../lib/database';

export const ELITE_ROUTINES_BY_SPORT: Record<string, EliteRoutine[]> = {
  // FÚTBOL - POSICIONES ESPECÍFICAS
  soccer: [
    {
      id: 'soccer_striker_elite',
      name: 'Rutina Striker Elite - Fútbol',
      sport: 'soccer',
      position: 'striker',
      level: 'elite',
      duration: 90,
      phases: [
        {
          name: 'Activación Neuromuscular',
          order: 1,
          exercises: [
            { exerciseId: 'fms_deep_squat_elite', sets: 2, reps: '10', rest: 60, tempo: '3-1-1', progression: 'perfect técnica' },
            { exerciseId: 'beast_crawl_elite', sets: 3, reps: '20 pasos', rest: 45, tempo: 'controlado', progression: 'aumentar velocidad' },
            { exerciseId: 'ape_reach_elite', sets: 2, reps: '10 cada lado', rest: 30, tempo: '3-1-1', progression: 'profundidad' }
          ],
          duration: 20,
          intensity: 'medium',
          rest: 60,
          notes: 'Foco en movilidad de cadera y activación de core'
        },
        {
          name: 'Potencia Explosiva',
          order: 2,
          exercises: [
            { exerciseId: 'box_jump_elite', sets: 4, reps: '6', rest: 120, tempo: 'explosivo', load: 0, progression: 'aumentar altura' },
            { exerciseId: 'bounding_elite', sets: 3, reps: '30m', rest: 90, tempo: 'máxima explosión', progression: 'aumentar distancia' },
            { exerciseId: 'single_leg_bounding_elite', sets: 3, reps: '20m cada pierna', rest: 90, tempo: 'explosivo', progression: 'aumentar distancia' }
          ],
          duration: 25,
          intensity: 'high',
          rest: 120,
          notes: 'CRÍTICO: Verificar PHV status antes. PROHIBIDO si PHV activo >6cm/año'
        },
        {
          name: 'Fuerza Funcional Elite',
          order: 3,
          exercises: [
            { exerciseId: 'nordic_curl_elite', sets: 3, reps: '8', rest: 120, tempo: '5-1-1', progression: 'aumentar rango' },
            { exerciseId: 'single_leg_deadlift_elite', sets: 3, reps: '10 cada pierna', rest: 90, tempo: '3-1-1', load: 20, progression: 'aumentar peso' },
            { exerciseId: 'copenhagen_plank_elite', sets: 3, reps: '45s cada lado', rest: 60, tempo: 'isométrico', progression: 'aumentar tiempo' }
          ],
          duration: 25,
          intensity: 'high',
          rest: 90,
          notes: 'Foco en prevención de lesiones. Nordic y Copenhagen PROHIBIDOS si PHV activo'
        },
        {
          name: 'Agilidad y Reactividad',
          order: 4,
          exercises: [
            { exerciseId: 'reactive_shuttle_elite', sets: 4, reps: '5 repeticiones', rest: 60, tempo: 'máxima reacción', progression: 'aumentar velocidad' },
            { exerciseId: 'switching_forms_elite', sets: 3, reps: '15 cambios', rest: 45, tempo: 'reactivo', progression: 'aumentar complejidad' },
            { exerciseId: 'lateral_bounding_elite', sets: 3, reps: '10 cada lado', rest: 90, tempo: 'explosivo', progression: 'aumentar distancia' }
          ],
          duration: 20,
          intensity: 'max',
          rest: 60,
          notes: 'Desarrollo de capacidad reactiva para cambios de dirección'
        }
      ],
      goals: ['Aumentar potencia de disparo', 'Mejorar explosividad en área', 'Reducir riesgo de lesión', 'Optimizar cambios de dirección'],
      prerequisites: ['Dominio técnico de ejercicios básicos', 'PHV assessment completo', 'FMS score >14', 'Mínimo 2 años de entrenamiento específico'],
      equipment: ['Barra olímpica', 'Placas', 'Cajas de salto', 'Medicine balls', 'Conos', 'Barras de dominadas', 'Banco'],
      coach: 'Entrenador de fuerza certificado nivel elite',
      seasonPhase: 'in',
      eliteStandards: [
        { metric: 'Box Jump', beginner: 45, intermediate: 60, advanced: 75, elite: 90, professional: 100 },
        { metric: '30m sprint', beginner: 4.5, intermediate: 4.2, advanced: 3.9, elite: 3.6, professional: 3.4 },
        { metric: 'Nordic Curl', beginner: 30, intermediate: 45, advanced: 60, elite: 75, professional: 85 }
      ]
    },
    {
      id: 'soccer_midfielder_elite',
      name: 'Rutina Centrocampista Elite - Fútbol',
      sport: 'soccer',
      position: 'midfielder',
      level: 'elite',
      duration: 85,
      phases: [
        {
          name: 'Preparación Neuromuscular',
          order: 1,
          exercises: [
            { exerciseId: 'fms_inline_lunge_elite', sets: 2, reps: '8 cada lado', rest: 60, tempo: '3-1-1', progression: 'perfect técnica' },
            { exerciseId: 'scorpion_roll_elite', sets: 2, reps: '10 cada lado', rest: 45, tempo: '3-1-1', progression: 'amplitud' },
            { exerciseId: 'crab_reach_elite', sets: 2, reps: '8 cada lado', rest: 30, tempo: '3-1-1', progression: 'alcance máximo' }
          ],
          duration: 18,
          intensity: 'medium',
          rest: 60,
          notes: 'Enfoque en movilidad rotacional y estabilidad lateral'
        },
        {
          name: 'Resistencia de Potencia',
          order: 2,
          exercises: [
            { exerciseId: 'bounding_elite', sets: 4, reps: '40m', rest: 60, tempo: 'sostenido explosivo', progression: 'mantener velocidad' },
            { exerciseId: 'medicine_ball_slam_elite', sets: 4, reps: '15', rest: 45, tempo: 'explosivo', load: 8, progression: 'aumentar velocidad' },
            { exerciseId: 'lateral_bounding_elite', sets: 3, reps: '12 cada lado', rest: 75, tempo: 'explosivo lateral', progression: 'aumentar distancia' }
          ],
          duration: 22,
          intensity: 'high',
          rest: 90,
          notes: 'Desarrollo de capacidad de mantener potencia durante partido completo'
        },
        {
          name: 'Fuerza Estabilizadora Elite',
          order: 3,
          exercises: [
            { exerciseId: 'single_leg_deadlift_elite', sets: 3, reps: '12 cada pierna', rest: 90, tempo: '3-1-1', load: 25, progression: 'aumentar peso' },
            { exerciseId: 'rotary_stability_elite', sets: 3, reps: '12 cada lado', rest: 60, tempo: '3-1-1', progression: 'ojos cerrados' },
            { exerciseId: 'lateral_lunge_elite', sets: 3, reps: '10 cada lado', rest: 75, tempo: '3-1-1', load: 20, progression: 'aumentar amplitud' }
          ],
          duration: 22,
          intensity: 'high',
          rest: 75,
          notes: 'Prevención de lesiones en cambios de dirección frecuentes'
        },
        {
          name: 'Capacidad Reactiva',
          order: 4,
          exercises: [
            { exerciseId: 'reactive_shuttle_elite', sets: 5, reps: '6 repeticiones', rest: 45, tempo: 'máxima reacción', progression: 'reducir tiempo de reacción' },
            { exerciseId: 'switching_forms_elite', sets: 4, reps: '20 cambios', rest: 30, tempo: 'reactivo', progression: 'aumentar velocidad de comando' },
            { exerciseId: 'traveling_forms_elite', sets: 2, reps: '40m total', rest: 60, tempo: 'fluido reactivo', progression: 'aumentar complejidad de transiciones' }
          ],
          duration: 23,
          intensity: 'max',
          rest: 45,
          notes: 'Simulación de decisiones rápidas bajo fatiga'
        }
      ],
      goals: ['Mantener potencia durante 90 minutos', 'Mejorar capacidad reactiva', 'Reducir fatiga en cambios de dirección', 'Optimizar visión periférica'],
      prerequisites: ['Excelente condición cardiovascular', 'PHV assessment', 'FMS score >16', 'Capacidad de VO2max >55 ml/kg/min'],
      equipment: ['Barra y placas', 'Medicine balls', 'Conos', 'Cinta para correr', 'Paralelas'],
      coach: 'Entrenador especializado en resistencia de potencia',
      seasonPhase: 'in',
      eliteStandards: [
        { metric: 'YoYo IR2', beginner: 16, intermediate: 18, advanced: 20, elite: 22, professional: 24 },
        { metric: 'Bounding 40m', beginner: 8.5, intermediate: 8.0, advanced: 7.5, elite: 7.0, professional: 6.5 },
        { metric: 'Reactive Shuttle', beginner: 1.2, intermediate: 1.0, advanced: 0.8, elite: 0.6, professional: 0.5 }
      ]
    },
    {
      id: 'soccer_defender_elite',
      name: 'Rutina Defensor Elite - Fútbol',
      sport: 'soccer',
      position: 'defender',
      level: 'elite',
      duration: 80,
      phases: [
        {
          name: 'Activación de Fuerza Bruta',
          order: 1,
          exercises: [
            { exerciseId: 'fms_deep_squat_elite', sets: 3, reps: '12', rest: 75, tempo: '3-1-1', progression: 'aumentar profundidad' },
            { exerciseId: 'loaded_beast_elite', sets: 3, reps: '15 explosivos', rest: 60, tempo: 'explosivo', progression: 'aumentar velocidad' },
            { exerciseId: 'dragon_squat_elite', sets: 2, reps: '8 cada lado', rest: 45, tempo: '3-1-1', progression: 'amplitud máxima' }
          ],
          duration: 20,
          intensity: 'medium',
          rest: 75,
          notes: 'Preparación para cargas máximas y cambios bruscos'
        },
        {
          name: 'Fuerza Máxima y Potencia',
          order: 2,
          exercises: [
            { exerciseId: 'deadlift_elite', sets: 4, reps: '5', rest: 180, tempo: '2-1-1', load: 150, progression: 'aumentar peso' },
            { exerciseId: 'box_jump_elite', sets: 4, reps: '5', rest: 120, tempo: 'explosivo', load: 0, progression: 'aumentar altura' },
            { exerciseId: 'overhead_press_elite', sets: 4, reps: '6', rest: 120, tempo: '2-1-1', load: 70, progression: 'aumentar peso' }
          ],
          duration: 30,
          intensity: 'max',
          rest: 180,
          notes: 'Desarrollo de fuerza bruta para duelos físicos'
        },
        {
          name: 'Resistencia de Fuerza',
          order: 3,
          exercises: [
            { exerciseId: 'back_squat_elite', sets: 4, reps: '8', rest: 150, tempo: '3-1-1', load: 120, progression: 'aumentar peso' },
            { exerciseId: 'bent_over_row_elite', sets: 4, reps: '8', rest: 90, tempo: '2-1-1', load: 80, progression: 'aumentar peso' },
            { exerciseId: 'pull_up_elite', sets: 4, reps: '12', rest: 90, tempo: '2-1-1', progression: 'aumentar velocidad' }
          ],
          duration: 25,
          intensity: 'high',
          rest: 120,
          notes: 'Capacidad de mantener fuerza durante partido completo'
        },
        {
          name: 'Resistencia Reactiva',
          order: 4,
          exercises: [
            { exerciseId: 'reactive_shuttle_elite', sets: 4, reps: '4 repeticiones', rest: 60, tempo: 'máxima reacción', progression: 'aumentar velocidad' },
            { exerciseId: 'lateral_bounding_elite', sets: 3, reps: '8 cada lado', rest: 75, tempo: 'explosivo', progression: 'aumentar distancia' },
            { exerciseId: 'traveling_forms_elite', sets: 2, reps: '20m', rest: 45, tempo: 'reactivo', progression: 'aumentar velocidad de transición' }
          ],
          duration: 15,
          intensity: 'high',
          rest: 60,
          notes: 'Capacidad de reaccionar bajo fatiga extrema'
        }
      ],
      goals: ['Aumentar fuerza para duelos físicos', 'Mejorar salto para cabeceos', 'Desarrollar resistencia de fuerza', 'Mantener reactividad bajo fatiga'],
      prerequisites: ['FMS score >12', 'PHV assessment', 'Mínimo 1.5x peso corporal en squat', 'Excelente técnica de levantamiento'],
      equipment: ['Barra olímpica completa', 'Placas', 'Cajas de salto', 'Rack de sentadillas', 'Banca'],
      coach: 'Entrenador de fuerza especializado en deportes de contacto',
      seasonPhase: 'in',
      eliteStandards: [
        { metric: 'Deadlift', beginner: 120, intermediate: 140, advanced: 160, elite: 180, professional: 200 },
        { metric: 'Squat', beginner: 100, intermediate: 120, advanced: 140, elite: 160, professional: 180 },
        { metric: 'Vertical Jump', beginner: 45, intermediate: 55, advanced: 65, elite: 75, professional: 85 }
      ]
    }
  ],

  // BALONCESTO - POSICIONES ESPECÍFICAS
  basketball: [
    {
      id: 'basketball_guard_elite',
      name: 'Rutina Base Elite - Baloncesto',
      sport: 'basketball',
      position: 'guard',
      level: 'elite',
      duration: 75,
      phases: [
        {
          name: 'Activación de Cadenas Musculares',
          order: 1,
          exercises: [
            { exerciseId: 'fms_shoulder_mobility_elite', sets: 2, reps: '10 cada lado', rest: 45, tempo: '3-1-1', progression: 'amplitud máxima' },
            { exerciseId: 'fms_active_straight_leg_raise_elite', sets: 2, reps: '12 cada pierna', rest: 45, tempo: '3-1-1', progression: 'velocidad controlada' },
            { exerciseId: 'ape_jumps_elite', sets: 2, reps: '12 explosivos', rest: 30, tempo: 'explosivo', progression: 'amplitud' }
          ],
          duration: 15,
          intensity: 'medium',
          rest: 60,
          notes: 'Enfoque en preparación para saltos explosivos y cambios de dirección'
        },
        {
          name: 'Potencia Vertical Elite',
          order: 2,
          exercises: [
            { exerciseId: 'depth_jump_elite', sets: 5, reps: '5', rest: 150, tempo: 'máxima explosión', progression: 'aumentar altura' },
            { exerciseId: 'single_leg_bounding_elite', sets: 4, reps: '25m cada pierna', rest: 120, tempo: 'explosivo unipodal', progression: 'mantener velocidad' },
            { exerciseId: 'medicine_ball_slam_elite', sets: 4, reps: '12', rest: 60, tempo: 'explosivo', load: 6, progression: 'aumentar velocidad' }
          ],
          duration: 28,
          intensity: 'max',
          rest: 150,
          notes: 'CRÍTICO: Verificar PHV. PROHIBIDO depth jumps si crecimiento >6cm/año'
        },
        {
          name: 'Fuerza Funcional de Tiro',
          order: 3,
          exercises: [
            { exerciseId: 'overhead_press_elite', sets: 4, reps: '8', rest: 120, tempo: '2-1-1', load: 60, progression: 'aumentar peso' },
            { exerciseId: 'single_leg_deadlift_elite', sets: 3, reps: '10 cada pierna', rest: 90, tempo: '3-1-1', load: 20, progression: 'aumentar peso' },
            { exerciseId: 'pull_up_elite', sets: 4, reps: '15', rest: 90, tempo: '2-1-1', progression: 'aumentar velocidad' }
          ],
          duration: 22,
          intensity: 'high',
          rest: 105,
          notes: 'Desarrollo de fuerza para tiros de larga distancia y resistencia de tiro'
        },
        {
          name: 'Agilidad y Reactividad de Élite',
          order: 4,
          exercises: [
            { exerciseId: 'reactive_shuttle_elite', sets: 6, reps: '5 repeticiones', rest: 45, tempo: 'máxima reacción', progression: 'reducir tiempo de reacción' },
            { exerciseId: 'switching_forms_elite', sets: 4, reps: '25 cambios', rest: 30, tempo: 'reactivo', progression: 'aumentar velocidad de comando' },
            { exerciseId: 'lateral_bounding_elite', sets: 4, reps: '8 cada lado', rest: 60, tempo: 'explosivo lateral', progression: 'aumentar distancia' }
          ],
          duration: 20,
          intensity: 'max',
          rest: 45,
          notes: 'Simulación de crossovers defensivos y cambios de dirección en ataque'
        }
      ],
      goals: ['Aumentar salto vertical >80cm', 'Mejorar agilidad lateral', 'Desarrollar resistencia de potencia', 'Optimizar tiros de 3 puntos bajo fatiga'],
      prerequisites: ['Salto vertical >55cm actual', 'PHV assessment completo', 'FMS score >16', 'Excelente técnica de aterrizaje'],
      equipment: ['Cajas de salto', 'Medicine balls', 'Conos', 'Barra y placas', 'Paralelas'],
      coach: 'Entrenador especializado en potencia vertical y agilidad',
      seasonPhase: 'in',
      eliteStandards: [
        { metric: 'Vertical Jump', beginner: 50, intermediate: 60, advanced: 70, elite: 80, professional: 90 },
        { metric: 'Lane Agility', beginner: 12.5, intermediate: 11.5, advanced: 10.5, elite: 9.5, professional: 8.5 },
        { metric: '3/4 Court Sprint', beginner: 3.5, intermediate: 3.3, advanced: 3.1, elite: 2.9, professional: 2.7 }
      ]
    },
    {
      id: 'basketball_forward_elite',
      name: 'Rutina Ala-Pívot Elite - Baloncesto',
      sport: 'basketball',
      position: 'forward',
      level: 'elite',
      duration: 80,
      phases: [
        {
          name: 'Activación de Potencia',
          order: 1,
          exercises: [
            { exerciseId: 'fms_rotary_stability_elite', sets: 3, reps: '10 cada lado', rest: 60, tempo: '3-1-1', progression: 'ojos cerrados' },
            { exerciseId: 'loaded_beast_elite', sets: 3, reps: '12 explosivos', rest: 45, tempo: 'explosivo', progression: 'aumentar velocidad' },
            { exerciseId: 'scorpion_roll_elite', sets: 2, reps: '8 cada lado', rest: 30, tempo: '3-1-1', progression: 'amplitud máxima' }
          ],
          duration: 16,
          intensity: 'medium',
          rest: 60,
          notes: 'Preparación para contacto físico y saltos en área'
        },
        {
          name: 'Fuerza de Contacto',
          order: 2,
          exercises: [
            { exerciseId: 'back_squat_elite', sets: 5, reps: '6', rest: 180, tempo: '2-1-1', load: 140, progression: 'aumentar peso' },
            { exerciseId: 'deadlift_elite', sets: 4, reps: '5', rest: 180, tempo: '2-1-1', load: 160, progression: 'aumentar peso' },
            { exerciseId: 'bench_press_elite', sets: 4, reps: '8', rest: 120, tempo: '2-1-1', load: 100, progression: 'aumentar peso' }
          ],
          duration: 32,
          intensity: 'max',
          rest: 180,
          notes: 'Desarrollo de fuerza para duelos físicos en pintura y rebotes'
        },
        {
          name: 'Potencia de Salto Continuo',
          order: 3,
          exercises: [
            { exerciseId: 'box_jump_elite', sets: 5, reps: '8', rest: 90, tempo: 'explosivo', load: 0, progression: 'aumentar altura' },
            { exerciseId: 'bounding_elite', sets: 4, reps: '35m', rest: 75, tempo: 'sostenido explosivo', progression: 'mantener altura de salto' },
            { exerciseId: 'depth_jump_elite', sets: 3, reps: '4', rest: 120, tempo: 'máxima explosión', progression: 'aumentar altura' }
          ],
          duration: 22,
          intensity: 'high',
          rest: 95,
          notes: 'Capacidad de saltar repetidamente con mínima pérdida de altura'
        },
        {
          name: 'Resistencia de Potencia',
          order: 4,
          exercises: [
            { exerciseId: 'medicine_ball_slam_elite', sets: 5, reps: '20', rest: 30, tempo: 'máxima velocidad', load: 8, progression: 'mantener velocidad' },
            { exerciseId: 'reactive_shuttle_elite', sets: 4, reps: '4 repeticiones', rest: 60, tempo: 'máxima reacción', progression: 'aumentar velocidad' },
            { exerciseId: 'traveling_forms_elite', sets: 2, reps: '30m', rest: 45, tempo: 'fluido', progression: 'aumentar velocidad de transición' }
          ],
          duration: 15,
          intensity: 'high',
          rest: 60,
          notes: 'Mantener potencia durante juego completo con fatiga'
        }
      ],
      goals: ['Aumentar fuerza para duelos físicos', 'Mejorar salto repetitivo', 'Desarrollar resistencia de potencia', 'Optimizar capacidad de contacto'],
      prerequisites: ['FMS score >14', 'PHV assessment', 'Mínimo 1.8x peso corporal en squat', 'Excelente técnica de levantamiento'],
      equipment: ['Barra olímpica completa', 'Placas', 'Cajas de salto', 'Medicine balls', 'Rack completo'],
      coach: 'Entrenador de fuerza especializado en deportes de contacto',
      seasonPhase: 'in',
      eliteStandards: [
        { metric: 'Squat', beginner: 120, intermediate: 140, advanced: 160, elite: 180, professional: 200 },
        { metric: 'Bench Press', beginner: 80, intermediate: 100, advanced: 120, elite: 140, professional: 160 },
        { metric: 'Repeated Jump', beginner: 50, intermediate: 55, advanced: 60, elite: 65, professional: 70 }
      ]
    }
  ],

  // TENIS - ESPECÍFICO PARA DEPORTES DE RAQUETA
  tennis: [
    {
      id: 'tennis_singles_elite',
      name: 'Rutina Singles Elite - Tenis',
      sport: 'tennis',
      position: 'singles',
      level: 'elite',
      duration: 70,
      phases: [
        {
          name: 'Activación de Cadenas Rotacionales',
          order: 1,
          exercises: [
            { exerciseId: 'fms_shoulder_mobility_elite', sets: 3, reps: '12 cada lado', rest: 45, tempo: '3-1-1', progression: 'velocidad de tiro' },
            { exerciseId: 'fms_rotary_stability_elite', sets: 3, reps: '12 cada lado', rest: 45, tempo: '3-1-1', progression: 'ojos cerrados' },
            { exerciseId: 'scorpion_roll_elite', sets: 2, reps: '10 cada lado', rest: 30, tempo: '3-1-1', progression: 'amplitud máxima' }
          ],
          duration: 14,
          intensity: 'medium',
          rest: 60,
          notes: 'Preparación específica para servicio y golpes rotacionales'
        },
        {
          name: 'Potencia Rotacional Elite',
          order: 2,
          exercises: [
            { exerciseId: 'medicine_ball_slam_elite', sets: 5, reps: '15 cada lado', rest: 60, tempo: 'máxima velocidad', load: 6, progression: 'aumentar velocidad de tiro' },
            { exerciseId: 'lateral_bounding_elite', sets: 4, reps: '10 cada lado', rest: 75, tempo: 'explosivo lateral', progression: 'aumentar distancia' },
            { exerciseId: 'single_leg_bounding_elite', sets: 3, reps: '20m cada pierna', rest: 90, tempo: 'explosivo', progression: 'mantener velocidad' }
          ],
          duration: 24,
          intensity: 'high',
          rest: 75,
          notes: 'Desarrollo de potencia para servicio y golpes de fondo'
        },
        {
          name: 'Fuerza de Base Estabilizadora',
          order: 3,
          exercises: [
            { exerciseId: 'single_leg_deadlift_elite', sets: 4, reps: '10 cada pierna', rest: 90, tempo: '3-1-1', load: 25, progression: 'aumentar peso' },
            { exerciseId: 'overhead_press_elite', sets: 4, reps: '8', rest: 90, tempo: '2-1-1', load: 55, progression: 'aumentar peso' },
            { exerciseId: 'pull_up_elite', sets: 4, reps: '15', rest: 75, tempo: '2-1-1', progression: 'aumentar velocidad' }
          ],
          duration: 22,
          intensity: 'high',
          rest: 85,
          notes: 'Base de fuerza para soportar repeticiones de golpes de alta intensidad'
        },
        {
          name: 'Reactividad y Agilidad Específica',
          order: 4,
          exercises: [
            { exerciseId: 'reactive_shuttle_elite', sets: 6, reps: '6 repeticiones', rest: 30, tempo: 'máxima reacción', progression: 'reducir tiempo de reacción' },
            { exerciseId: 'switching_forms_elite', sets: 4, reps: '30 cambios', rest: 20, tempo: 'reactivo', progression: 'aumentar velocidad de comando' },
            { exerciseId: 'lateral_bounding_elite', sets: 4, reps: '12 cada lado', rest: 45, tempo: 'explosivo lateral', progression: 'aumentar velocidad de cambio' }
          ],
          duration: 20,
          intensity: 'max',
          rest: 30,
          notes: 'Simulación de movimientos laterales y reacciones de tenis'
        }
      ],
      goals: ['Aumentar velocidad de servicio >200km/h', 'Mejorar potencia de golpes de fondo', 'Desarrollar resistencia de tiro', 'Optimizar velocidad de reacción'],
      prerequisites: ['FMS score >16', 'PHV assessment', 'Excelente técnica de tiro', 'Mínimo 3 años de entrenamiento específico'],
      equipment: ['Medicine balls', 'Conos', 'Barra y placas', 'Paralelas', 'Cuerda para saltar'],
      coach: 'Entrenador especializado en tenis de alto rendimiento',
      seasonPhase: 'in',
      eliteStandards: [
        { metric: 'Serve Speed (km/h)', beginner: 160, intermediate: 180, advanced: 200, elite: 220, professional: 240 },
        { metric: 'Forehand Power', beginner: 120, intermediate: 140, advanced: 160, elite: 180, professional: 200 },
        { metric: 'Lateral Movement', beginner: 1.0, intermediate: 0.8, advanced: 0.6, elite: 0.4, professional: 0.3 }
      ]
    }
  ]
};

// RUTINAS GENERALES DE ÉLITE
export const GENERAL_ELITE_ROUTINES: EliteRoutine[] = [
  {
    id: 'general_assessment_elite',
    name: 'Evaluación Completa Elite',
    sport: 'general',
    level: 'elite',
    duration: 45,
    phases: [
      {
        name: 'FMS Completo',
        order: 1,
        exercises: [
          { exerciseId: 'fms_deep_squat_elite', sets: 1, reps: '3', rest: 60, tempo: '3-1-1', progression: 'assessment' },
          { exerciseId: 'fms_hurdle_step_elite', sets: 1, reps: '3 cada lado', rest: 60, tempo: '3-1-1', progression: 'assessment' },
          { exerciseId: 'fms_inline_lunge_elite', sets: 1, reps: '3 cada lado', rest: 60, tempo: '3-1-1', progression: 'assessment' },
          { exerciseId: 'fms_shoulder_mobility_elite', sets: 1, reps: '3 cada lado', rest: 60, tempo: '3-1-1', progression: 'assessment' },
          { exerciseId: 'fms_active_straight_leg_raise_elite', sets: 1, reps: '3 cada lado', rest: 60, tempo: '3-1-1', progression: 'assessment' },
          { exerciseId: 'fms_trunk_stability_pushup_elite', sets: 1, reps: '3', rest: 60, tempo: '3-1-1', progression: 'assessment' },
          { exerciseId: 'fms_rotary_stability_elite', sets: 1, reps: '3 cada lado', rest: 60, tempo: '3-1-1', progression: 'assessment' }
        ],
        duration: 35,
        intensity: 'low',
        rest: 60,
        notes: 'Evaluación completa de patrones de movimiento. FMS score objetivo: >16 para elite'
      }
    ],
    goals: ['Identificar asimetrías', 'Detectar restricciones de movimiento', 'Establecer línea base', 'Prevenir lesiones'],
    prerequisites: ['Sin dolor actual', 'PHV assessment previo', 'Estado de reposo'],
    equipment: ['Barra de medición', 'Cinta métrica', 'Colchoneta'],
    coach: 'FMS certificado nivel 2',
    seasonPhase: 'pre',
    eliteStandards: [
      { metric: 'FMS Score', beginner: 12, intermediate: 14, advanced: 16, elite: 18, professional: 20 }
    ]
  },
  {
    id: 'general_recovery_elite',
    name: 'Recuperación Elite',
    sport: 'general',
    level: 'elite',
    duration: 30,
    phases: [
      {
        name: 'Recuperación Activa',
        order: 1,
        exercises: [
          { exerciseId: 'ape_reach_elite', sets: 2, reps: '15', rest: 30, tempo: 'lento', progression: 'relajación' },
          { exerciseId: 'crab_reach_elite', sets: 2, reps: '10 cada lado', rest: 30, tempo: 'lento', progression: 'relajación' },
          { exerciseId: 'scorpion_roll_elite', sets: 2, reps: '10 cada lado', rest: 30, tempo: 'lento', progression: 'relajación' },
          { exerciseId: 'traveling_forms_elite', sets: 1, reps: '20m lento', rest: 60, tempo: 'fluido', progression: 'relajación' }
        ],
        duration: 25,
        intensity: 'low',
        rest: 60,
        notes: 'Secuencia para recuperación activa post-partido o entrenamiento intenso'
      }
    ],
    goals: ['Reducir fatiga muscular', 'Mantener movilidad', 'Promover recuperación', 'Preparar para próxima sesión'],
    prerequisites: ['Post-entrenamiento o partido', 'Estado de fatiga moderada'],
    equipment: ['Colchoneta', 'Espacio tranquilo'],
    coach: 'Recuperación activa',
    seasonPhase: 'in',
    eliteStandards: [
      { metric: 'Perceived Recovery', beginner: 6, intermediate: 7, advanced: 8, elite: 9, professional: 10 }
    ]
  }
];