import { Exercise } from '../lib/database';

export const ELITE_EXERCISES_COMPLETE: Exercise[] = [
  // FMS - Functional Movement Screen (7 ejercicios base + 14 variaciones = 21)
  {
    id: 'fms_deep_squat_elite',
    name: 'Deep Squat Assessment - Elite',
    category: 'fms',
    difficulty: 'elite',
    targetMuscles: ['cuádriceps', 'glúteos', 'core', 'tórax', 'hombros'],
    movementPattern: 'squat_pattern',
    equipment: ['ninguno'],
    instructions: [
      'Párate con los pies al ancho de cadera, dedos hacia adelante',
      'Levanta los brazos por encima de la cabeza con codos extendidos',
      'Baja hacia una sentadilla profunda manteniendo talones en el suelo',
      'Mantén el pecho erguido y brazos detrás de las orejas',
      'Regresa a posición inicial sin perder alineación'
    ],
    cues: [
      'Talones pegados al suelo',
      'Rodillas alineadas con dedos del pie',
      'Espalda neutral',
      'Brazos detrás de las orejas'
    ],
    commonMistakes: [
      'Talones se levantan',
      'Rodillas valgas >5°',
      'Espalda se redondea',
      'Brazos caen hacia adelante'
    ],
    regressions: ['sentadilla a caja', 'sentadilla con talones elevados', 'sentadilla frontal'],
    progressions: ['sentadilla con peso', 'sentadilla unilateral', 'sentadilla profunda con carga'],
    phvSafe: true,
    contraindications: ['lesión aguda de rodilla', 'dolor de espalda severo'],
    minAge: 8,
    maxAge: 80,
    eliteVariations: ['overhead squat con 20kg', 'pistol squat', 'cossack squat']
  },
  {
    id: 'fms_hurdle_step_elite',
    name: 'Hurdle Step - Elite',
    category: 'fms',
    difficulty: 'elite',
    targetMuscles: ['glúteos', 'cuádriceps', 'core', 'estabilizadores de cadera'],
    movementPattern: 'single_leg_stability',
    equipment: ['barrera de 30cm'],
    instructions: [
      'Coloca una cuerda o barrera a la altura de la tibia',
      'Párate erguido con pies juntos detrás de la barrera',
      'Levanta una pierna y pasa por encima sin tocar',
      'Toca el talón al otro lado y regresa',
      'Repite 3 veces cada pierna'
    ],
    cues: [
      'Cadera nivelada',
      'Rodilla de apoyo estable',
      'Pie que pasa relajado',
      'Movimiento controlado'
    ],
    commonMistakes: [
      'Cadera se eleva',
      'Rodilla valga >5°',
      'Pérdida de balance',
      'Pie toca la barrera'
    ],
    regressions: ['step bajo', 'marcha estática', 'balance unipodal'],
    progressions: ['hurdle dinámico', 'hurdle con peso', 'hurdle en desnivel'],
    phvSafe: true,
    contraindications: ['inestabilidad de cadera', 'dolor de rodilla'],
    minAge: 10,
    maxAge: 80,
    eliteVariations: ['hurdle step con 40cm', 'hurdle step con giro', 'hurdle step cargado']
  },
  {
    id: 'fms_inline_lunge_elite',
    name: 'Inline Lunge - Elite',
    category: 'fms',
    difficulty: 'elite',
    targetMuscles: ['glúteos', 'cuádriceps', 'isquiotibiales', 'core'],
    movementPattern: 'split_stance',
    equipment: ['barra de 2m'],
    instructions: [
      'Coloca una barra vertical en el suelo',
      'Párate con talón de pie trasero alineado con dedos del pie delantero',
      'Baja hasta que la rodilla trasera casi toque el suelo',
      'Mantén torso erguido y barra cerca del cuerpo',
      'Regresa a posición inicial y repite'
    ],
    cues: [
      'Tallos alineados',
      'Torso vertical',
      'Rodilla no toca suelo',
      'Control del movimiento'
    ],
    commonMistakes: [
      'Pérdida de alineación',
      'Torso se inclina',
      'Rodilla trasera toca',
      'Falta control'
    ],
    regressions: ['split squat', 'lunge corto', 'lunge estático'],
    progressions: ['lunge dinámico', 'lunge con giro', 'lunge con peso'],
    phvSafe: true,
    contraindications: ['inestabilidad de tobillo', 'dolor de cadera'],
    minAge: 12,
    maxAge: 80,
    eliteVariations: ['inline lunge con 3m', 'inline lunge con giro', 'inline lunge cargado']
  },
  {
    id: 'fms_shoulder_mobility_elite',
    name: 'Shoulder Mobility - Elite',
    category: 'fms',
    difficulty: 'elite',
    targetMuscles: ['hombros', 'tórax', 'escápulas', 'core'],
    movementPattern: 'shoulder_flexibility',
    equipment: ['ninguno'],
    instructions: [
      'Forma puño con cada mano',
      'Coloca una mano sobre el hombro opuesto',
      'La otra mano detrás de la espalda',
      'Intenta que los puños se toquen',
      'Mide la distancia mínima entre puños'
    ],
    cues: [
      'Hombros relajados',
      'No compensar con cuello',
      'Movimiento lento',
      'Ambos lados iguales'
    ],
    commonMistakes: [
      'Compensación cervical',
      'Hombros elevados',
      'Movimiento brusco',
      'Desigualdad lateral'
    ],
    regressions: ['shoulder flexión simple', 'shoulder extensión simple', 'stretching básico'],
    progressions: ['shoulder dislocates', 'overhead mobility', 'shoulder circles'],
    phvSafe: true,
    contraindications: ['dolor de hombro', 'inestabilidad escapular'],
    minAge: 8,
    maxAge: 80,
    eliteVariations: ['shoulder mobility con banda', 'shoulder mobility dinámica', 'overhead squat assessment']
  },
  {
    id: 'fms_active_straight_leg_raise_elite',
    name: 'Active Straight Leg Raise - Elite',
    category: 'fms',
    difficulty: 'elite',
    targetMuscles: ['flexores de cadera', 'isquiotibiales', 'core'],
    movementPattern: 'hip_mobility',
    equipment: ['tabla de 30cm'],
    instructions: [
      'Acuéstate boca arriba con rodillas flexionadas',
      'Coloca una tabla vertical al lado de la cadera',
      'Extiende una pierna hacia el techo',
      'Mantén la otra pierna plana en el suelo',
      'Eleva hasta donde la movilidad lo permita'
    ],
    cues: [
      'Pierna extendida recta',
      'Talón hacia el techo',
      'Pelvis neutral',
      'Sin compensar con cuello'
    ],
    commonMistakes: [
      'Pierna se flexiona',
      'Pelvis se inclina',
      'Compensación cervical',
      'Movimiento brusco'
    ],
    regressions: ['leg raise asistido', 'stretching isquiotibiales', 'hip flexor stretch'],
    progressions: ['leg raise dinámico', 'leg raise con peso', 'leg raise en suspension'],
    phvSafe: true,
    contraindications: ['dolor de cadera', 'lesión de isquiotibiales'],
    minAge: 8,
    maxAge: 80,
    eliteVariations: ['active leg raise 90°', 'leg raise con resistencia', 'leg raise dinámico']
  },
  {
    id: 'fms_trunk_stability_pushup_elite',
    name: 'Trunk Stability Push-up - Elite',
    category: 'fms',
    difficulty: 'elite',
    targetMuscles: ['core', 'pectoral', 'tríceps', 'estabilizadores de cadera'],
    movementPattern: 'core_stability',
    equipment: ['ninguno'],
    instructions: [
      'Acuéstate boca abajo en posición de push-up',
      'Manos alineadas con la frente',
      'Cuerpo en línea recta desde cabeza a talones',
      'Realiza un push-up manteniendo alineación',
      'Pecho y cadera se levantan al mismo tiempo'
    ],
    cues: [
      'Cuerpo en tabla',
      'Sin sacudidas',
      'Core activado',
      'Movimiento controlado'
    ],
    commonMistakes: [
      'Cadera se hunde',
      'Cuello se extiende',
      'Push-up con sacudida',
      'Falta control core'
    ],
    regressions: ['push-up de rodillas', 'plancha frontal', 'bird dog'],
    progressions: ['push-up declinado', 'push-up con giro', 'push-up dinámico'],
    phvSafe: true,
    contraindications: ['dolor de espalda', 'inestabilidad de core'],
    minAge: 10,
    maxAge: 80,
    eliteVariations: ['push-up 50 reps', 'push-up con peso', 'push-up clap']
  },
  {
    id: 'fms_rotary_stability_elite',
    name: 'Rotary Stability - Elite',
    category: 'fms',
    difficulty: 'elite',
    targetMuscles: ['core', 'glúteos', 'hombros', 'estabilizadores'],
    movementPattern: 'rotational_stability',
    equipment: ['ninguno'],
    instructions: [
      'Comienza en posición de cuadrupedia',
      'Extiende brazo y pierna opuestos simultáneamente',
      'Mantén cadera y hombros nivelados',
      'Toca codo con rodilla bajo el cuerpo',
      'Regresa a posición extendida sin perder balance'
    ],
    cues: [
      'Core activado',
      'Cadera estable',
      'Movimiento controlado',
      'Sin compensar'
    ],
    commonMistakes: [
      'Cadera se inclina',
      'Hombro se eleva',
      'Movimiento brusco',
      'Falta control'
    ],
    regressions: ['bird dog simple', 'dead bug', 'plancha lateral'],
    progressions: ['rotary con peso', 'rotary dinámico', 'rotary en suspension'],
    phvSafe: true,
    contraindications: ['dolor de espalda', 'inestabilidad de core'],
    minAge: 10,
    maxAge: 80,
    eliteVariations: ['rotary stability 20 reps', 'rotary con resistencia', 'rotary dinámico']
  },
  
  // Animal Flow - Movimientos animales (8 ejercicios)
  {
    id: 'animal_beast_elite',
    name: 'Beast Crawl - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['core', 'hombros', 'cuádriceps', 'estabilizadores'],
    movementPattern: 'quadruped_movement',
    equipment: ['colchoneta'],
    instructions: [
      'Comienza en posición de cuadrupedia',
      'Levantas rodillas 2-3cm del suelo',
      'Mantén espalda neutral y core activado',
      'Crawlea hacia adelante contralateralmente',
      '10 pasos adelante, 10 pasos atrás'
    ],
    cues: [
      'Rodillas ligeramente elevadas',
      'Espalda neutral',
      'Core activado',
      'Movimiento controlado'
    ],
    commonMistakes: [
      'Cadera se eleva demasiado',
      'Espalda se redondea',
      'Rodillas muy altas',
      'Movimiento brusco'
    ],
    regressions: ['beast hold', 'bird dog', 'plancha de rodillas'],
    progressions: ['beast con giro', 'beast lateral', 'beast dinámico'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'dolor de muñeca'],
    minAge: 8,
    maxAge: 80,
    eliteVariations: ['beast crawl 50m', 'beast crawl con giro', 'beast crawl lateral']
  },
  {
    id: 'animal_crab_elite',
    name: 'Crab Walk - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['glúteos', 'tríceps', 'core', 'hombros posteriores'],
    movementPattern: 'inverted_quadruped',
    equipment: ['colchoneta'],
    instructions: [
      'Siéntate con pies planos y manos detrás',
      'Eleva cadera formando mesa',
      'Crawlea hacia adelante con movimiento controlado',
      'Mantén cadera elevada y core activado',
      '10 pasos adelante, 10 pasos atrás'
    ],
    cues: [
      'Cadera elevada',
      'Core activado',
      'Hombros hacia abajo',
      'Movimiento fluido'
    ],
    commonMistakes: [
      'Cadera se hunde',
      'Hombros se elevan',
      'Cuello se extiende',
      'Movimiento brusco'
    ],
    regressions: ['crab hold', 'glute bridge', 'reverse plank'],
    progressions: ['crab con giro', 'crab lateral', 'crab dinámico'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'dolor de muñeca'],
    minAge: 8,
    maxAge: 80,
    eliteVariations: ['crab walk 50m', 'crab walk con giro', 'crab walk lateral']
  },
  {
    id: 'animal_ape_elite',
    name: 'Ape Reach - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['isquiotibiales', 'glúteos', 'core', 'hombros'],
    movementPattern: 'deep_squat_mobility',
    equipment: ['colchoneta'],
    instructions: [
      'Comienza en sentadilla profunda',
      'Coloca manos en el suelo adelante',
      'Empuja con las manos y extiende piernas',
      'Regresa a sentadilla profunda',
      'Repite 10-15 veces fluidamente'
    ],
    cues: [
      'Sentadilla profunda',
      'Piernas se extienden',
      'Core activado',
      'Movimiento fluido'
    ],
    commonMistakes: [
      'No baja suficiente',
      'Piernas no se extienden',
      'Espalda se redondea',
      'Movimiento brusco'
    ],
    regressions: ['deep squat', 'cossack squat', 'world greatest stretch'],
    progressions: ['ape con giro', 'ape lateral', 'ape dinámico'],
    phvSafe: true,
    contraindications: ['problemas de cadera', 'dolor de espalda'],
    minAge: 10,
    maxAge: 80,
    eliteVariations: ['ape reach 20 reps', 'ape reach con giro', 'ape reach dinámico']
  },
  {
    id: 'animal_scorpion_elite',
    name: 'Scorpion - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['core', 'glúteos', 'isquiotibiales', 'espalda baja'],
    movementPattern: 'rotational_mobility',
    equipment: ['colchoneta'],
    instructions: [
      'Acuéstate boca abajo con brazos extendidos',
      'Lleva talón hacia mano opuesta',
      'Gira cadera y pierna sobre el cuerpo',
      'Regresa y repite del otro lado',
      '10 repeticiones cada lado'
    ],
    cues: [
      'Talón hacia mano opuesta',
      'Giro de cadera',
      'Hombros en el suelo',
      'Movimiento controlado'
    ],
    commonMistakes: [
      'Hombros se levantan',
      'Giro limitado',
      'Movimiento brusco',
      'Falta control'
    ],
    regressions: ['cat cow', 'bird dog', 'glute stretch'],
    progressions: ['scorpion dinámico', 'scorpion con giro', 'scorpion invertido'],
    phvSafe: true,
    contraindications: ['problemas de espalda', 'dolor de cadera'],
    minAge: 10,
    maxAge: 80,
    eliteVariations: ['scorpion 15 reps', 'scorpion dinámico', 'scorpion con giro']
  },
  {
    id: 'animal_crocodile_elite',
    name: 'Crocodile - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['core', 'hombros', 'tríceps', 'estabilizadores'],
    movementPattern: 'prone_movement',
    equipment: ['colchoneta'],
    instructions: [
      'Comienza en posición de plancha baja',
      'Crawlea hacia adelante con movimiento de reptil',
      'Mantén cuerpo bajo y core activado',
      'Movimiento controlado y fluido',
      '10 pasos adelante, 10 pasos atrás'
    ],
    cues: [
      'Cuerpo bajo',
      'Core activado',
      'Movimiento controlado',
      'Fluido y constante'
    ],
    commonMistakes: [
      'Cadera se eleva',
      'Cuerpo muy alto',
      'Movimiento brusco',
      'Falta control'
    ],
    regressions: ['plancha baja', 'mountain climbers', 'bear crawl'],
    progressions: ['crocodile con giro', 'crocodile lateral', 'crocodile dinámico'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'dolor de muñeca'],
    minAge: 12,
    maxAge: 80,
    eliteVariations: ['crocodile 50m', 'crocodile con giro', 'crocodile lateral']
  },
  {
    id: 'animal_duck_elite',
    name: 'Duck Walk - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['cuádriceps', 'glúteos', 'core', 'tobillos'],
    movementPattern: 'deep_squat_locomotion',
    equipment: ['colchoneta'],
    instructions: [
      'Comienza en sentadilla profunda',
      'Mantén torso erguido y core activado',
      'Camina hacia adelante en sentadilla',
      'Mantén talones en el suelo',
      '10 pasos adelante, 10 pasos atrás'
    ],
    cues: [
      'Sentadilla profunda',
      'Torso erguido',
      'Talones en suelo',
      'Movimiento controlado'
    ],
    commonMistakes: [
      'No baja suficiente',
      'Talones se levantan',
      'Torso se inclina',
      'Movimiento brusco'
    ],
    regressions: ['deep squat', 'cossack squat', 'wall squat'],
    progressions: ['duck walk con peso', 'duck walk lateral', 'duck walk dinámico'],
    phvSafe: true,
    contraindications: ['problemas de rodilla', 'dolor de tobillo'],
    minAge: 12,
    maxAge: 80,
    eliteVariations: ['duck walk 50m', 'duck walk con peso', 'duck walk lateral']
  },
  {
    id: 'animal_bear_elite',
    name: 'Bear Crawl - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['core', 'hombros', 'cuádriceps', 'estabilizadores'],
    movementPattern: 'quadruped_locomotion',
    equipment: ['colchoneta'],
    instructions: [
      'Comienza en posición de cuadrupedia',
      'Levanta rodillas 2-3cm del suelo',
      'Mantén espalda neutral y core activado',
      'Crawlea hacia adelante contralateralmente',
      '20 metros total'
    ],
    cues: [
      'Rodillas ligeramente elevadas',
      'Espalda neutral',
      'Core activado',
      'Movimiento controlado'
    ],
    commonMistakes: [
      'Cadera se eleva demasiado',
      'Espalda se redondea',
      'Rodillas muy altas',
      'Movimiento brusco'
    ],
    regressions: ['bear hold', 'bird dog', 'plancha de rodillas'],
    progressions: ['bear con giro', 'bear lateral', 'bear dinámico'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'dolor de muñeca'],
    minAge: 8,
    maxAge: 80,
    eliteVariations: ['bear crawl 100m', 'bear crawl con giro', 'bear crawl lateral']
  },
  {
    id: 'animal_ostrich_elite',
    name: 'Ostrich - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['isquiotibiales', 'glúteos', 'core', 'espalda'],
    movementPattern: 'flexibility_balance',
    equipment: ['colchoneta'],
    instructions: [
      'Párate con pies juntos',
      'Inclina torso hacia adelante',
      'Extiende una pierna hacia atrás',
      'Mantén equilibrio y alineación',
      'Regresa y repite del otro lado'
    ],
    cues: [
      'Torso paralelo al suelo',
      'Pierna extendida atrás',
      'Core activado',
      'Equilibrio estable'
    ],
    commonMistakes: [
      'Torso no paralelo',
      'Pierna se flexiona',
      'Pérdida de equilibrio',
      'Alineación incorrecta'
    ],
    regressions: ['single leg deadlift', 'good morning', 'balance unipodal'],
    progressions: ['ostrich con giro', 'ostrich dinámico', 'ostrich con peso'],
    phvSafe: true,
    contraindications: ['problemas de equilibrio', 'dolor de espalda'],
    minAge: 12,
    maxAge: 80,
    eliteVariations: ['ostrich 10 reps', 'ostrich dinámico', 'ostrich con peso']
  },

  // Calistenia - Ejercicios de peso corporal (8 ejercicios)
  {
    id: 'cali_pullup_elite',
    name: 'Pull-up - Elite',
    category: 'calisthenics',
    difficulty: 'elite',
    targetMuscles: ['espalda', 'bíceps', 'hombros posteriores', 'core'],
    movementPattern: 'vertical_pull',
    equipment: ['barra de dominadas'],
    instructions: [
      'Cuelga de la barra con agarre prono',
      'Mantén core activado y cuerpo recto',
      'Tira hasta que barba pase la barra',
      'Baja controlado sin balancear',
      'Repite 10-15 veces'
    ],
    cues: [
      'Core activado',
      'Cuerpo recto',
      'Barba a la barra',
      'Control en bajada'
    ],
    commonMistakes: [
      'Balanceo excesivo',
      'No baja completo',
      'Core relajado',
      'Movimiento brusco'
    ],
    regressions: ['assisted pull-up', 'negative pull-ups', 'lat pulldown'],
    progressions: ['weighted pull-up', 'one-arm pull-up', 'muscle-up'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'débil en dominadas'],
    minAge: 12,
    maxAge: 60,
    eliteVariations: ['pull-up 20 reps', 'weighted pull-up 20kg', 'one-arm pull-up']
  },
  {
    id: 'cali_pushup_elite',
    name: 'Push-up - Elite',
    category: 'calisthenics',
    difficulty: 'elite',
    targetMuscles: ['pectoral', 'tríceps', 'hombros anteriores', 'core'],
    movementPattern: 'horizontal_push',
    equipment: ['ninguno'],
    instructions: [
      'Comienza en posición de plancha alta',
      'Mantén core activado y cuerpo recto',
      'Baja hasta que pecho casi toque el suelo',
      'Empuja de vuelta a posición inicial',
      'Repite 25-30 veces'
    ],
    cues: [
      'Core activado',
      'Cuerpo en línea',
      'Pecho al suelo',
      'Empuje controlado'
    ],
    commonMistakes: [
      'Cadera se hunde',
      'No baja suficiente',
      'Cuello se extiende',
      'Movimiento brusco'
    ],
    regressions: ['push-up de rodillas', 'incline push-up', 'wall push-up'],
    progressions: ['decline push-up', 'one-arm push-up', 'planche push-up'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'débil en push-ups'],
    minAge: 10,
    maxAge: 60,
    eliteVariations: ['push-up 50 reps', 'one-arm push-up', 'planche push-up']
  },
  {
    id: 'cali_dip_elite',
    name: 'Dip - Elite',
    category: 'calisthenics',
    difficulty: 'elite',
    targetMuscles: ['tríceps', 'pectoral inferior', 'hombros anteriores'],
    movementPattern: 'vertical_push',
    equipment: ['paralelas', 'banco'],
    instructions: [
      'Sostente de las paralelas con brazos extendidos',
      'Mantén core activado y cuerpo recto',
      'Baja hasta que hombros estén por debajo de codos',
      'Empuja de vuelta a posición inicial',
      'Repite 15-20 veces'
    ],
    cues: [
      'Core activado',
      'Cuerpo recto',
      'Hombros bajan',
      'Empuje controlado'
    ],
    commonMistakes: [
      'Balanceo excesivo',
      'No baja suficiente',
      'Core relajado',
      'Movimiento brusco'
    ],
    regressions: ['bench dip', 'assisted dip', 'negative dips'],
    progressions: ['weighted dip', 'ring dip', 'korean dip'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'débil en dips'],
    minAge: 14,
    maxAge: 60,
    eliteVariations: ['dip 25 reps', 'weighted dip 20kg', 'ring dip']
  },
  {
    id: 'cali_row_elite',
    name: 'Bodyweight Row - Elite',
    category: 'calisthenics',
    difficulty: 'elite',
    targetMuscles: ['espalda', 'bíceps', 'hombros posteriores', 'core'],
    movementPattern: 'horizontal_pull',
    equipment: ['barra baja', 'anillas'],
    instructions: [
      'Acuéstate bajo la barra con pecho alineado',
      'Sostén la barra con agarre supino',
      'Mantén core activado y cuerpo recto',
      'Tira hasta que pecho toque la barra',
      'Repite 15-20 veces'
    ],
    cues: [
      'Core activado',
      'Cuerpo recto',
      'Pecho a la barra',
      'Control en bajada'
    ],
    commonMistakes: [
      'Cadera se hunde',
      'No tira suficiente',
      'Core relajado',
      'Movimiento brusco'
    ],
    regressions: ['inverted row asistida', 'cable row', 'dumbbell row'],
    progressions: ['front lever row', 'one-arm row', 'weighted row'],
    phvSafe: true,
    contraindications: ['problemas de espalda', 'débil en rows'],
    minAge: 12,
    maxAge: 60,
    eliteVariations: ['row 25 reps', 'front lever row', 'one-arm row']
  },
  {
    id: 'cali_squat_elite',
    name: 'Bodyweight Squat - Elite',
    category: 'calisthenics',
    difficulty: 'elite',
    targetMuscles: ['cuádriceps', 'glúteos', 'core', 'isquiotibiales'],
    movementPattern: 'squat_pattern',
    equipment: ['ninguno'],
    instructions: [
      'Párate con pies al ancho de cadera',
      'Mantén core activado y torso erguido',
      'Baja hasta que muslos estén paralelos al suelo',
      'Empuja con talones para regresar',
      'Repite 50-60 veces'
    ],
    cues: [
      'Core activado',
      'Torso erguido',
      'Muslos paralelos',
      'Empuje con talones'
    ],
    commonMistakes: [
      'Rodillas valgas',
      'No baja suficiente',
      'Torso se inclina',
      'Talones se levantan'
    ],
    regressions: ['chair squat', 'wall squat', 'quarter squat'],
    progressions: ['jump squat', 'pistol squat', 'shrimp squat'],
    phvSafe: true,
    contraindications: ['problemas de rodilla', 'dolor de espalda'],
    minAge: 8,
    maxAge: 70,
    eliteVariations: ['squat 100 reps', 'pistol squat', 'shrimp squat']
  },
  {
    id: 'cali_lunge_elite',
    name: 'Bodyweight Lunge - Elite',
    category: 'calisthenics',
    difficulty: 'elite',
    targetMuscles: ['cuádriceps', 'glúteos', 'isquiotibiales', 'core'],
    movementPattern: 'split_stance',
    equipment: ['ninguno'],
    instructions: [
      'Párate erguido con pies juntos',
      'Da un paso adelante largo',
      'Baja hasta que la rodilla trasera casi toque el suelo',
      'Empuja con el pie delantero para regresar',
      'Repite 20-25 veces cada pierna'
    ],
    cues: [
      'Paso largo',
      'Rodilla no toca',
      'Torso erguido',
      'Empuje controlado'
    ],
    commonMistakes: [
      'Paso corto',
      'Rodilla trasera toca',
      'Torso se inclina',
      'Falta control'
    ],
    regressions: ['split squat', 'step-up', 'reverse lunge'],
    progressions: ['jump lunge', 'pistol squat', 'bulgarian split squat'],
    phvSafe: true,
    contraindications: ['problemas de cadera', 'dolor de rodilla'],
    minAge: 10,
    maxAge: 70,
    eliteVariations: ['lunge 30 reps', 'jump lunge', 'bulgarian split squat']
  },
  {
    id: 'cali_planche_elite',
    name: 'Planche - Elite',
    category: 'calisthenics',
    difficulty: 'elite',
    targetMuscles: ['hombros anteriores', 'core', 'tríceps', 'estabilizadores'],
    movementPattern: 'horizontal_plank',
    equipment: ['paralelas', 'suelo'],
    instructions: [
      'Comienza en posición de plancha alta',
      'Inclina hombros hacia adelante',
      'Eleva pies del suelo lentamente',
      'Mantén cuerpo paralelo al suelo',
      'Sostén 10-15 segundos'
    ],
    cues: [
      'Hombros adelante',
      'Core activado',
      'Cuerpo paralelo',
      'Control total'
    ],
    commonMistakes: [
      'Hombros no adelante',
      'Pies muy altos',
      'Core relajado',
      'Falta control'
    ],
    regressions: ['planche lean', 'tuck planche', 'frog stand'],
    progressions: ['straddle planche', 'full planche', 'planche push-up'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'débil en plancha'],
    minAge: 16,
    maxAge: 50,
    eliteVariations: ['planche 30s', 'straddle planche', 'planche push-up']
  },

  // Pliometría - Ejercicios explosivos (8 ejercicios)
  {
    id: 'plyo_jump_squat_elite',
    name: 'Jump Squat - Elite',
    category: 'plyometrics',
    difficulty: 'elite',
    targetMuscles: ['cuádriceps', 'glúteos', 'isquiotibiales', 'pantorrillas'],
    movementPattern: 'vertical_jump',
    equipment: ['ninguno'],
    instructions: [
      'Comienza en posición de sentadilla',
      'Mantén core activado y torso erguido',
      'Explota hacia arriba con máxima potencia',
      'Aterriza suavemente en sentadilla',
      'Repite 20-25 veces'
    ],
    cues: [
      'Explosión máxima',
      'Aterrizaje suave',
      'Core activado',
      'Control total'
    ],
    commonMistakes: [
      'Aterrizaje duro',
      'Rodillas valgas',
      'No baja suficiente',
      'Falta control'
    ],
    regressions: ['bodyweight squat', 'quarter jump squat', 'step-up'],
    progressions: ['weighted jump squat', 'box jump', 'depth jump'],
    phvSafe: false,
    contraindications: ['problemas de rodilla', 'PHV activo'],
    minAge: 16,
    maxAge: 50,
    eliteVariations: ['jump squat 30 reps', 'weighted jump squat', 'depth jump']
  },
  {
    id: 'plyo_box_jump_elite',
    name: 'Box Jump - Elite',
    category: 'plyometrics',
    difficulty: 'elite',
    targetMuscles: ['cuádriceps', 'glúteos', 'isquiotibiales', 'pantorrillas'],
    movementPattern: 'vertical_jump',
    equipment: ['caja de 60cm'],
    instructions: [
      'Párate frente a la caja en posición de sentadilla',
      'Carga energía en los glúteos y cuádriceps',
      'Explota hacia arriba con brazos ayudando',
      'Aterriza suavemente en la caja en sentadilla',
      'Baja controlado y repite 15-20 veces'
    ],
    cues: [
      'Carga explosiva',
      'Brazos ayudan',
      'Aterrizaje suave',
      'Control total'
    ],
    commonMistakes: [
      'Caja muy alta',
      'Aterrizaje duro',
      'Falta carga',
      'No controla bajada'
    ],
    regressions: ['step-up', 'jump squat', 'low box jump'],
    progressions: ['high box jump', 'weighted box jump', 'depth jump to box'],
    phvSafe: false,
    contraindications: ['problemas de rodilla', 'miedo a saltar', 'PHV activo'],
    minAge: 16,
    maxAge: 45,
    eliteVariations: ['box jump 80cm', 'weighted box jump', 'depth jump to box']
  },
  {
    id: 'plyo_broad_jump_elite',
    name: 'Broad Jump - Elite',
    category: 'plyometrics',
    difficulty: 'elite',
    targetMuscles: ['glúteos', 'isquiotibiales', 'cuádriceps', 'pantorrillas'],
    movementPattern: 'horizontal_jump',
    equipment: ['ninguno'],
    instructions: [
      'Párate con pies al ancho de cadera',
      'Carga energía en sentadilla profunda',
      'Balancea brazos hacia atrás',
      'Explota hacia adelante con máxima potencia',
      'Aterriza suavemente en sentadilla y mide distancia'
    ],
    cues: [
      'Carga máxima',
      'Brazos ayudan',
      'Explosión horizontal',
      'Aterrizaje suave'
    ],
    commonMistakes: [
      'Falta carga',
      'Aterrizaje duro',
      'No mide distancia',
      'Falta control'
    ],
    regressions: ['jump squat', 'step jump', 'standing long jump'],
    progressions: ['weighted broad jump', 'triple jump', 'bounding'],
    phvSafe: false,
    contraindications: ['problemas de cadera', 'PHV activo'],
    minAge: 16,
    maxAge: 50,
    eliteVariations: ['broad jump 3m', 'weighted broad jump', 'triple jump']
  },
  {
    id: 'plyo_lunge_jump_elite',
    name: 'Lunge Jump - Elite',
    category: 'plyometrics',
    difficulty: 'elite',
    targetMuscles: ['cuádriceps', 'glúteos', 'isquiotibiales', 'pantorrillas'],
    movementPattern: 'split_jump',
    equipment: ['ninguno'],
    instructions: [
      'Comienza en posición de lunge',
      'Mantén torso erguido y core activado',
      'Explota hacia arriba y cambia piernas en el aire',
      'Aterriza suavemente en lunge opuesto',
      'Repite 20-30 veces alternando'
    ],
    cues: [
      'Cambio en el aire',
      'Aterrizaje suave',
      'Core activado',
      'Control total'
    ],
    commonMistakes: [
      'Aterrizaje duro',
      'No cambia piernas',
      'Torso se inclina',
      'Falta control'
    ],
    regressions: ['alternating lunge', 'step-up', 'split squat'],
    progressions: ['weighted lunge jump', 'lunge jump to box', 'skater jump'],
    phvSafe: false,
    contraindications: ['problemas de cadera', 'inestabilidad de rodilla', 'PHV activo'],
    minAge: 16,
    maxAge: 50,
    eliteVariations: ['lunge jump 30 reps', 'weighted lunge jump', 'skater jump']
  },
  {
    id: 'plyo_depth_jump_elite',
    name: 'Depth Jump - Elite',
    category: 'plyometrics',
    difficulty: 'elite',
    targetMuscles: ['pantorrillas', 'cuádriceps', 'glúteos', 'isquiotibiales'],
    movementPattern: 'reactive_jump',
    equipment: ['caja de 45cm'],
    instructions: [
      'Párate en la caja con pies al ancho de cadera',
      'Baja controlado al suelo',
      'Aterriza y explota inmediatamente hacia arriba',
      'Mantén contacto con suelo mínimo',
      'Repite 10-15 veces'
    ],
    cues: [
      'Caída controlada',
      'Contacto mínimo',
      'Explosión inmediata',
      'Control total'
    ],
    commonMistakes: [
      'Pausa en aterrizaje',
      'No explode',
      'Caja muy alta',
      'Falta control'
    ],
    regressions: ['drop jump', 'step down jump', 'low depth jump'],
    progressions: ['high depth jump', 'depth jump to box', 'depth jump with hurdle'],
    phvSafe: false,
    contraindications: ['problemas de tobillo', 'PHV activo'],
    minAge: 18,
    maxAge: 45,
    eliteVariations: ['depth jump 60cm', 'depth jump to box', 'depth jump with hurdle']
  },
  {
    id: 'plyo_skater_jump_elite',
    name: 'Skater Jump - Elite',
    category: 'plyometrics',
    difficulty: 'elite',
    targetMuscles: ['glúteos', 'isquiotibiales', 'cuádriceps', 'pantorrillas'],
    movementPattern: 'lateral_jump',
    equipment: ['ninguno'],
    instructions: [
      'Comienza en posición de semisentadilla',
      'Salta hacia un lado aterrizando en una pierna',
      'Balancea brazo opuesto hacia atrás',
      'Salta inmediatamente al lado opuesto',
      'Repite 20-30 veces alternando'
    ],
    cues: [
      'Salto lateral',
      'Aterrizaje unipodal',
      'Brazo contrario',
      'Control total'
    ],
    commonMistakes: [
      'Aterrizaje duro',
      'No balancea brazo',
      'Pausa entre saltos',
      'Falta control'
    ],
    regressions: ['side step', 'lateral step-up', 'single leg hop'],
    progressions: ['weighted skater jump', 'skater jump to box', 'single leg bound'],
    phvSafe: false,
    contraindications: ['problemas de cadera', 'inestabilidad de tobillo', 'PHV activo'],
    minAge: 16,
    maxAge: 50,
    eliteVariations: ['skater jump 30 reps', 'weighted skater jump', 'single leg bound']
  },
  {
    id: 'plyo_tuck_jump_elite',
    name: 'Tuck Jump - Elite',
    category: 'plyometrics',
    difficulty: 'elite',
    targetMuscles: ['cuádriceps', 'glúteos', 'core', 'pantorrillas'],
    movementPattern: 'vertical_jump',
    equipment: ['ninguno'],
    instructions: [
      'Comienza en posición de sentadilla',
      'Explota hacia arriba con máxima potencia',
      'Trae rodillas hacia el pecho en el aire',
      'Aterriza suavemente en sentadilla',
      'Repite 15-20 veces'
    ],
    cues: [
      'Rodillas al pecho',
      'Explosión máxima',
      'Aterrizaje suave',
      'Control total'
    ],
    commonMistakes: [
      'Rodillas no suben',
      'Aterrizaje duro',
      'Falta explosión',
      'No controla'
    ],
    regressions: ['jump squat', 'high knee jump', 'power skip'],
    progressions: ['weighted tuck jump', 'tuck jump to box', 'double tuck jump'],
    phvSafe: false,
    contraindications: ['problemas de rodilla', 'PHV activo'],
    minAge: 16,
    maxAge: 45,
    eliteVariations: ['tuck jump 25 reps', 'weighted tuck jump', 'tuck jump to box']
  },
  {
    id: 'plyo_pogo_jump_elite',
    name: 'Pogo Jump - Elite',
    category: 'plyometrics',
    difficulty: 'elite',
    targetMuscles: ['pantorrillas', 'cuádriceps', 'glúteos', 'isquiotibiales'],
    movementPattern: 'ankle_dominant_jump',
    equipment: ['ninguno'],
    instructions: [
      'Párate con pies al ancho de cadera',
      'Mantén rodillas casi extendidas',
      'Salta con movimiento de tobillo principal',
      'Mantén contacto con suelo mínimo',
      'Repite 50-60 veces rápidamente'
    ],
    cues: [
      'Tobillos activos',
      'Rodillas extendidas',
      'Contacto mínimo',
      'Ritmo rápido'
    ],
    commonMistakes: [
      'Rodillas se flexionan',
      'Contacto prolongado',
      'Ritmo lento',
      'Falta elasticidad'
    ],
    regressions: ['calf raises', 'ankle hops', 'mini jumps'],
    progressions: ['weighted pogo jumps', 'single leg pogo', 'pogo with hurdle'],
    phvSafe: false,
    contraindications: ['problemas de tobillo', 'PHV activo'],
    minAge: 14,
    maxAge: 50,
    eliteVariations: ['pogo jump 100 reps', 'single leg pogo', 'weighted pogo jumps']
  },

  // Ejercicios Elite Avanzados (10 ejercicios)
  {
    id: 'dragon_squat_elite',
    name: 'Dragon Squat - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['cuádriceps', 'glúteos', 'cadera', 'core', 'isquiotibiales'],
    movementPattern: 'rotational_squat_pattern',
    equipment: ['colchoneta'],
    instructions: [
      'Comienza en posición de cuclillas',
      'Gira el torso y lleva un codo al suelo',
      'Mira hacia arriba',
      'Regresa al centro',
      'Repite del otro lado alternando'
    ],
    cues: [
      'Rotación máxima',
      'Codo al suelo',
      'Mira hacia arriba',
      'Alternancia fluida'
    ],
    commonMistakes: [
      'Rotación limitada',
      'Codo no toca',
      'No mirar arriba',
      'Falta alternancia'
    ],
    regressions: ['deep squat', 'cossack squat', 'world greatest stretch'],
    progressions: ['dragon squat con peso', 'dragon squat dinámico', 'dragon squat con salto'],
    phvSafe: true,
    contraindications: ['problemas de cadera', 'dolor de espalda'],
    minAge: 12,
    maxAge: 80,
    eliteVariations: ['dragon squat 10 reps lado', 'dragon squat con peso', 'dragon squat dinámico']
  },
  {
    id: 'traveling_forms_elite',
    name: 'Traveling Forms - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['core', 'hombros', 'cadera', 'estabilizadores'],
    movementPattern: 'complex_animal_sequences',
    equipment: ['colchoneta', 'espacio'],
    instructions: [
      'Combina beast, crab y ape en secuencia fluida',
      'Transiciones sin parar',
      'Mantén técnica perfecta',
      '10 metros cada forma',
      'Versión elite: 3 rondas continuas'
    ],
    cues: [
      'Transiciones fluidas',
      'Técnica constante',
      'Ritmo constante',
      'Control total'
    ],
    commonMistakes: [
      'Paradas entre formas',
      'Pérdida de técnica',
      'Ritmo irregular',
      'Falta control'
    ],
    regressions: ['individual animal forms', 'shorter distances', 'slower pace'],
    progressions: ['traveling forms con giro', 'traveling forms con salto', 'traveling forms invertidos'],
    phvSafe: true,
    contraindications: ['fatiga severa', 'falta de coordinación'],
    minAge: 12,
    maxAge: 80,
    eliteVariations: ['traveling forms 30m', 'traveling forms con giro', 'traveling forms invertidos']
  },
  {
    id: 'switching_forms_elite',
    name: 'Switching Forms - Elite',
    category: 'animal_flow',
    difficulty: 'elite',
    targetMuscles: ['core', 'sistema nervioso', 'estabilizadores'],
    movementPattern: 'reactive_animal_transitions',
    equipment: ['colchoneta'],
    instructions: [
      'Comienza en una forma animal',
      'Cambia a otra forma por comando',
      'Mantén técnica y control',
      'Transiciones rápidas y fluidas',
      '20 cambios por sesión'
    ],
    cues: [
      'Reacción rápida',
      'Técnica constante',
      'Control total',
      'Transiciones fluidas'
    ],
    commonMistakes: [
      'Reacción lenta',
      'Pérdida de técnica',
      'Transiciones bruscas',
      'Falta control'
    ],
    regressions: ['fewer transitions', 'visual cues', 'slower commands'],
    progressions: ['switching forms complejo', 'switching forms multitarea', 'switching forms con decisión'],
    phvSafe: true,
    contraindications: ['falta de concentración', 'fatiga mental'],
    minAge: 10,
    maxAge: 80,
    eliteVariations: ['switching forms 20 cambios', 'switching forms multitarea', 'switching forms con decisión']
  },
  {
    id: 'deadlift_elite',
    name: 'Deadlift - Elite',
    category: 'strength',
    difficulty: 'elite',
    targetMuscles: ['glúteos', 'isquiotibiales', 'espalda baja', 'trapezios'],
    movementPattern: 'hip_hinge',
    equipment: ['barra olímpica', 'placas'],
    instructions: [
      'Párate con pies al ancho de cadera',
      'Barra sobre metatarsianos',
      'Agarre justo fuera de piernas',
      'Mantén espalda neutral y core activado',
      'Empuje con talones y extiende caderas'
    ],
    cues: [
      'Espalda neutral',
      'Core activado',
      'Empuje con talones',
      'Extensión completa'
    ],
    commonMistakes: [
      'Espalda se redondea',
      'Barra alejada',
      'No extiende caderas',
      'Core relajado'
    ],
    regressions: ['kettlebell deadlift', 'trap bar deadlift', 'Romanian deadlift'],
    progressions: ['deficit deadlift', 'snatch grip deadlift', 'one-leg Romanian deadlift'],
    phvSafe: true,
    contraindications: ['dolor de espalda', 'inestabilidad de core'],
    minAge: 16,
    maxAge: 60,
    eliteVariations: ['deadlift 2.5x peso corporal', 'snatch grip deadlift', 'deficit deadlift']
  },
  {
    id: 'back_squat_elite',
    name: 'Back Squat - Elite',
    category: 'strength',
    difficulty: 'elite',
    targetMuscles: ['cuádriceps', 'glúteos', 'core', 'espalda baja'],
    movementPattern: 'squat_pattern',
    equipment: ['barra olímpica', 'placas', 'rack'],
    instructions: [
      'Coloca barra en trapecios',
      'Párate con pies al ancho de cadera',
      'Mantén core activado y torso erguido',
      'Baja hasta que muslos estén paralelos',
      'Empuja con talones para regresar'
    ],
    cues: [
      'Barra estable',
      'Core activado',
      'Paralelos completos',
      'Empuje con talones'
    ],
    commonMistakes: [
      'Barra inestable',
      'No baja paralelos',
      'Rodillas valgas',
      'Core relajado'
    ],
    regressions: ['goblet squat', 'front squat', 'box squat'],
    progressions: ['pause squat', 'tempo squat', 'one-leg squat'],
    phvSafe: true,
    contraindications: ['dolor de rodilla', 'inestabilidad de core'],
    minAge: 16,
    maxAge: 60,
    eliteVariations: ['back squat 2x peso corporal', 'pause squat', 'tempo squat 5s']
  },
  {
    id: 'bench_press_elite',
    name: 'Bench Press - Elite',
    category: 'strength',
    difficulty: 'elite',
    targetMuscles: ['pectoral', 'tríceps', 'hombros anteriores'],
    movementPattern: 'horizontal_push',
    equipment: ['banca', 'barra olímpica', 'placas'],
    instructions: [
      'Acuéstate en banca con pies en suelo',
      'Agarra barra con agarre amplio',
      'Mantén scapulas retraídas',
      'Baja hasta tocar pecho',
      'Empuja hasta extensión completa'
    ],
    cues: [
      'Scapulas retraídas',
      'Toque pecho',
      'Extensión completa',
      'Control total'
    ],
    commonMistakes: [
      'Scapulas no fijas',
      'No toca pecho',
      'Codos muy abiertos',
      'Falta control'
    ],
    regressions: ['dumbbell bench press', 'push-up', 'machine chest press'],
    progressions: ['close-grip bench press', 'incline bench press', 'one-arm push-up'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'dolor de pecho'],
    minAge: 16,
    maxAge: 60,
    eliteVariations: ['bench press 1.5x peso corporal', 'close-grip bench press', 'pause bench press']
  },
  {
    id: 'pull_up_elite',
    name: 'Pull-up - Elite',
    category: 'strength',
    difficulty: 'elite',
    targetMuscles: ['espalda', 'bíceps', 'hombros posteriores', 'core'],
    movementPattern: 'vertical_pull',
    equipment: ['barra de dominadas'],
    instructions: [
      'Cuelga de barra con agarre prono',
      'Mantén core activado',
      'Tira hasta que barba pase barra',
      'Baja controlado',
      'Repite 15-20 veces'
    ],
    cues: [
      'Core activado',
      'Barba a barra',
      'Control bajada',
      'Extensión completa'
    ],
    commonMistakes: [
      'Balanceo excesivo',
      'No baja completo',
      'Core relajado',
      'Movimiento brusco'
    ],
    regressions: ['assisted pull-up', 'lat pulldown', 'negative pull-ups'],
    progressions: ['weighted pull-up', 'one-arm pull-up', 'muscle-up'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'débil en dominadas'],
    minAge: 12,
    maxAge: 60,
    eliteVariations: ['pull-up 20 reps', 'weighted pull-up 20kg', 'one-arm pull-up']
  },
  {
    id: 'overhead_press_elite',
    name: 'Overhead Press - Elite',
    category: 'strength',
    difficulty: 'elite',
    targetMuscles: ['hombros', 'tríceps', 'core', 'trapecios'],
    movementPattern: 'vertical_push',
    equipment: ['barra olímpica', 'placas'],
    instructions: [
      'Párate con barra en deltoides',
      'Mantén core activado',
      'Empuja barra sobre cabeza',
      'Extiende completamente',
      'Baja controlado'
    ],
    cues: [
      'Core activado',
      'Barra vertical',
      'Extensión completa',
      'Control bajada'
    ],
    commonMistakes: [
      'Core relajado',
      'Barra adelante',
      'No extiende',
      'Falta control'
    ],
    regressions: ['dumbbell shoulder press', 'machine shoulder press', 'push press'],
    progressions: ['push press', 'split jerk', 'one-arm press'],
    phvSafe: true,
    contraindications: ['problemas de hombro', 'inestabilidad de core'],
    minAge: 16,
    maxAge: 60,
    eliteVariations: ['overhead press peso corporal', 'push press', 'split jerk']
  },
  {
    id: 'bent_over_row_elite',
    name: 'Bent Over Row - Elite',
    category: 'strength',
    difficulty: 'elite',
    targetMuscles: ['espalda', 'bíceps', 'hombros posteriores', 'core'],
    movementPattern: 'horizontal_pull',
    equipment: ['barra olímpica', 'placas'],
    instructions: [
      'Inclina torso 45 grados',
      'Mantén espalda neutral',
      'Tira barra al abdomen',
      'Controla bajada',
      'Repite 12-15 veces'
    ],
    cues: [
      'Espalda neutral',
      'Tira al abdomen',
      'Control bajada',
      'Core activado'
    ],
    commonMistakes: [
      'Espalda redondea',
      'No tira suficiente',
      'Core relajado',
      'Movimiento brusco'
    ],
    regressions: ['cable row', 'dumbbell row', 'inverted row'],
    progressions: ['t-bar row', 'one-arm row', 'weighted pull-up'],
    phvSafe: true,
    contraindications: ['dolor de espalda', 'inestabilidad de core'],
    minAge: 16,
    maxAge: 60,
    eliteVariations: ['bent over row 1.5x peso corporal', 't-bar row', 'one-arm row']
  }
];