# Plan del Proyecto: Plataforma de Alto Rendimiento con IA Avanzada (Entrenamiento Personal + 100% Gratis)

## Resumen ejecutivo
Esta herramienta es tu **academia personal de bolsillo** para desarrollar rendimiento élite, priorizando seguridad durante el crecimiento, calidad de movimiento (FMS), estabilidad multiplanar (Animal Flow) y fuerza/potencia específica. La diferenciación clave es que la app “ve y corrige” en tiempo real con visión por computadora (MediaPipe/MoveNet) ejecutada en el teléfono (Edge AI) para máxima privacidad, baja latencia y costo cero.

**Diseñada para coaches personales como tú** que quieren análisis profesional sin complejidad técnica. El objetivo práctico es entrenar como un club top: diagnóstico, prescripción, control de carga, medición, feedback técnico, y hábitos mentales; todo operable por ti mismo sin pagar infraestructura.

**Sin límites de edad**: Funciona para atletas de 8 a 80 años con parámetros completamente ajustables.

## Usuarios
- Atleta: niño U14 (13 años).
- Coach familiar: padre/tutor que programa, revisa métricas y decide cargas.

## Objetivos
- Mejorar rendimiento transferible a fútbol: velocidad, potencia, cambio de dirección y resiliencia.
- Disminuir riesgo de lesión con diagnóstico funcional y correcciones progresivas.
- Ajustar carga por maduración biológica (PHV) y señales de dolor/fatiga.
- Dar feedback técnico inmediato usando la cámara del celular.
- Mantener adherencia con gamificación moderna (streaks, economía estética, micro‑ligas).

## Principios de diseño
- Edge AI por defecto: el video no sale del teléfono a menos que ustedes lo compartan.
- Offline‑first: entrenar funciona sin internet; sincroniza cuando hay señal.
- Cero costo mensual: usar sólo servicios con tier gratuito y límites controlables.
- Seguridad primero: si hay dolor o banderas rojas, baja carga y prioriza movilidad/control.

## Alcance (MVP + evolutivo)
- Diagnóstico FMS guiado y puntaje automatizado (primero 2 tests, luego 7).
- Plan semanal inteligente (entrenos + descanso) según partidos y carga reportada.
- Biblioteca de entrenamiento: Animal Flow, movilidad, calistenia específica para fútbol.
- Métricas automáticas por cámara: técnica (ángulos), calidad de repetición, fatiga (pérdida de velocidad).
- Batería de tests físicos (CMJ, sprint 30m, 505, Yo‑Yo) con medición por sensores/cámara.
- Módulo mental (visualización + ritual de error “Flush It” + drills de reacción).
- Gamificación: avatar, streaks, loot boxes estéticos, “Sweat Coins”, micro‑ligas.

## Fuera de alcance (fase inicial)
- Entrenamiento con cargas externas pesadas y prescripción clínica.
- Telemedicina o diagnóstico médico.
- Social masivo abierto; se mantiene en “círculos privados” al inicio.

## Stack “de punta” y gratis (elección final)
### App móvil (núcleo)
- Flutter (Android/iOS) para rendimiento, cámara estable y UI fluida.
- Almacenamiento local: SQLite (offline‑first) + sincronización opcional.
- Notificaciones: Firebase Cloud Messaging (gratis).

### IA en el dispositivo (Edge AI)
- MediaPipe Pose (BlazePose) o MoveNet (Thunder/Lightning) en TensorFlow Lite.
- Modelos descargados en app; inferencia local a 30 FPS según dispositivo.

### Backend (mínimo y gratuito)
Opción A (recomendada para “cero mantenimiento”):
- Supabase: Auth + Postgres + Storage + Edge Functions (tiers gratuitos).

Opción B (si se requiere API propia):
- Fly.io: API (FastAPI) + Postgres pequeño en tier gratuito.
- Imágenes/archivos: Cloudflare R2 (tier gratuito) + CDN Cloudflare.

### Observabilidad y calidad (gratis)
- Sentry (tier gratuito) para errores en app.
- Grafana Cloud (tier gratuito) para métricas/logs del backend si usan Opción B.
- CI/CD: GitHub Actions + GHCR (gratis) si se construyen contenedores.

## Arquitectura funcional
### 1) Vigilancia de crecimiento y bio‑banding
- Registro de altura mensual.
- Estimación de estado: pre‑PHV / circa‑PHV / post‑PHV (semáforo de carga).
- Regla de oro (mandatoria): si crecimiento > 0.5 cm/mes o dolor rodilla/talón = SÍ -> bloqueo automático de pliometría y sprints máximos; se fuerza movilidad y core.

### 2) Diagnóstico FMS con IA Avanzada (Modo Coach Personal)
- **Captura Inteligente**: La IA identifica automáticamente los frames clave (máxima profundidad, ángulos críticos) sin que tengas que revisar video completo.
- **Análisis Progresivo**: Empieza con detección básica (valgo >5%) y evoluciona a análisis de patrones completos a tu ritmo.
- **Modo Experto**: Puedes sobrescribir cualquier detección de la IA y entrenar el modelo con tus propios criterios - la app aprende de tus correcciones.
- **Comparativas Temporales**: Visualiza la evolución de cada ángulo y patrón de movimiento semana a semana con gráficos automáticos.
- Sin restricciones de edad: Funciona para atletas de 8 a 80 años con parámetros ajustables.

### 3) Entrenamiento: Animal Flow (integración multiplanar)
- Activaciones, FSS, traveling forms, switches y flows.
- Flujos de recuperación “Match Day +1” (15 min) sin fatiga metabólica.

### 4) Entrenamiento: Calistenia Adaptativa (Todas las Edades)
- **Progresiones Inteligentes**: La IA ajusta automáticamente la dificultad según edad, nivel y feedback previo.
- Isquios: Nordic Fall Controlado (negativas) o Razor Curl Asistido; medir "ángulo de ruptura" - ajustable para cualquier edad.
- Rodilla/ACL: Pistol Squat con detección de valgo - sensibilidad configurable por edad.
- Aductores: Copenhagen Plank con progresiones automáticas basadas en tu progreso.
- Tren superior: Flexiones con progresiones (apoyado de rodillas -> normal -> diamante -> explosiva).
- Control de calidad: Stop automático cuando detecta fatiga técnica, no solo pérdida de velocidad.

### 5) Batería de pruebas y benchmarks personalizables
- Tests adaptativos: CMJ, sprint, COD, resistencia - selecciona los que uses.
- Benchmarks por edad/genero/nivel o crea tus propios estándares.
- Comparativas históricas: tu progreso vs tus propios récords, no vs élite U14.

### 6) Factor mental y cognitivo
- Visualización guiada por rol: defensor / mediocampista / delantero.
- Ritual de error “Flush It” gamificado.
- Entrenamiento estroboscópico usando la pantalla (sin hardware caro).

### 7) Gamificación y adherencia (Gen Alpha)
- Avatar “Digital Twin” con progresión estética.
- Streaks y loot boxes estéticas (sin pay‑to‑win).
- Sweat Coins por esfuerzo real.
- Micro‑ligas por nivel/peso/edad biológica y privacidad controlada.

## Datos y métricas (modelo mínimo)
- Perfil atleta: edad, posición, lateralidad, altura, estado PHV estimado.
- Sesión: tipo (FMS/AF/calistenia/test/mental), duración, RPE, dolor, notas del coach.
- Métricas técnicas: ángulos clave, valgo rodilla, rango cadera, velocidad concéntrica.
- Progreso: scores FMS, benchmarks, adherencia (streak), carga semanal.

## Seguridad, privacidad y control parental
- Privacidad por defecto: análisis en dispositivo; subida de video desactivada por defecto.
- Controles del coach: qué se comparte, con quién, y cuándo.
- Banderas rojas: dolor reportado, caída de performance sostenida, crecimiento rápido, asimetrías marcadas -> protocolo de descarga.

## Roadmap (12 semanas, enfocadas al valor real)
### Semana 1–2: Base de datos y UX manual (victorias rápidas)
- Login/Perfil del coach y atleta, incluyendo inputs de altura/peso y calendario.
- Biblioteca de ejercicios offline (videos/gifs locales) lista y usable.
- Registro de sesiones manual (RPE, dolor, notas) y reportes simples.

### Semana 3–4: Integración TFLite mínima (presencia + contador)
- Cámara: detectar “usuario en cuadro” y guiar colocación (smart timer).
- Contador estable de 1 ejercicio (sentadilla) y guardado de sesión.
- FMS híbrido: IA extrae frame clave (punto más bajo) y el coach asigna score manual en la app.

### Semana 5–6: Análisis Inteligente Personalizado
- Módulo de detección de patrones: La IA identifica tus debilidades específicas y sugiere focos de entrenamiento.
- Sistema de progresión adaptativa: Ajusta automáticamente la dificultad según tu evolución.
- Alertas inteligentes: Detecta sobreentrenamiento, compensaciones o riesgos específicos para tu perfil.
- Sin restricciones de edad: Los parámetros se ajustan a tu edad y nivel real, no a estándares U14.

### Semana 7–8: Métricas élite por cámara
- Nordic “ángulo de ruptura”, valgo rodilla, calidad de rep.
- Tests CMJ y sprint 30m con detección start/stop.

### Semana 9–10: Mental + gamificación fuerte
- Visualizaciones por rol y “Flush It”.
- Streaks, Sweat Coins, loot boxes estéticas.

### Semana 11–12: Benchmarks + micro‑ligas privadas
- Radar plot élite U14 y reporte mensual para coach.
- Micro‑ligas privadas con control parental y ranking por métricas seguras.

## Entregables
- App móvil instalable (Android primero; iOS si tienen Mac o servicio de build).
- Motor de pose y corrección en tiempo real (on‑device).
- Panel simple del coach dentro de la app: plan, carga, banderas rojas, progreso.
- Reporte mensual automático (PDF/compartible) de progreso y riesgos.

## Métricas clave (para saber si “funciona”)
- Adherencia: sesiones/semana y streaks.
- Riesgo: dolor reportado y asimetrías FMS a la baja.
- Rendimiento: CMJ, 30m, 505, Yo‑Yo (tendencia mensual).
- Técnica: reducción de valgo y mejora de rangos/ángulos objetivo.

## Riesgos y mitigaciones
- Captura mala de cámara: smart timer que no inicia hasta encuadre correcto + guía de ángulo.
- Limitaciones 2D: instrucciones de posición (45°) y suavizado temporal.
- Fatiga/crecimiento: semáforo PHV + descarga automática + énfasis movilidad.
- Motivación: gamificación estética + micro‑ligas por nivel, no por “top mundial”.

## Próximo paso inmediato (para arrancar hoy)
- Definir el dispositivo principal (Android recomendado por flexibilidad con IA on‑device).
- Definir 2 objetivos de 8 semanas: uno de rendimiento (ej. sprint) y uno de salud (ej. movilidad/asimetrías).
- Empezar con el MVP FMS (2 pruebas) + 3 sesiones semanales (2 fuerza/calistenia, 1 AF/movilidad) y registrar datos.

## Alcance full (hasta “terminado”)
### Experiencia del atleta (app)
- Home: sesión de hoy, estado de carga, “semáforo PHV”, streak.
- Entrenar: guía de colocación del teléfono, smart timer, audio en tiempo real, conteo de reps, stop por técnica/fatiga.
- Técnica en vivo: feedback por voz y vibración; overlay de esqueleto no es parte del MVP (se prioriza latencia y temperatura del teléfono).
- Modo sin cámara: toggle “Modo Cámara” vs “Modo Sensor/Audio”; guía por voz, cronómetro y opcional acelerómetro para conteo básico.
- Biblioteca: rutinas por objetivo (velocidad, COD, potencia, movilidad, core, aductores, isquios), y por contexto (pre‑partido, post‑partido, descarga).
- Tests: CMJ, sprint 30m, 505, Yo‑Yo IRT1, salto a una pierna, RSIs básicos (según device).
- Mental: visualización por rol, “Flush It”, drills de reacción/estroboscópicos, respiración corta pre‑partido.
- Progreso: radar plot, tendencias, récords personales, consistencia, “hoy vs hace 4 semanas”.

### Experiencia del coach (padre/tutor)
- Panel: plan semanal editable, calendario de partido/entrenos, adherencia, banderas rojas.
- Carga: RPE, dolor, sueño/energía (rápido, 10 segundos), alertas de sobrecarga.
- Reportes: reporte semanal y mensual (compartible) con progreso y riesgos.
- Reglas: bloqueo/desbloqueo de módulos (ej. pliometría) según FMS/PHV/dolor.

### Diagnóstico funcional (FMS full)
- 7 pruebas guiadas y puntuadas con registro izquierdo/derecho y asimetrías:
  - Deep Squat, Hurdle Step, In‑Line Lunge, Shoulder Mobility, Active Straight‑Leg Raise, Trunk Stability Push‑Up, Rotary Stability.
- Motor correctivo:
  - Ruta correctiva 2–4 semanas por patrón con progresiones y criterios de salida.
  - Bloqueo automático de ejercicios de alta intensidad dependientes del patrón fallado.

### Entrenamiento físico (full)
- Animal Flow completo:
  - Wrist mobs, activations (Beast/Crab), FSS, traveling forms, switches, flows.
  - Flujos Match Day -1 (taper) y Match Day +1 (recovery).
- Calistenia específica para fútbol:
  - Isquios: Nordic (progresiones), puentes isométricos, excéntricos.
  - Aductores: Copenhagen (palanca corta a larga), adductor rockbacks.
  - Rodilla/ACL: control de valgo (progresiones), single‑leg hinge, estabilidad.
  - Core: anti‑rotación, estabilidad lumbopélvica, “bracing” para sprints y duelos.
  - Tren superior: robustez de hombro/escápula, empuje explosivo, tracción con bandas.
- Periodización simple y efectiva:
  - Regla base: 2 sesiones fuerza/estructura + 1 sesión movilidad/Animal Flow (mínimo).
  - Si hay partido: sesión intensa martes, sesión ligera viernes, recovery domingo/lunes.
  - Descarga automática si fatiga/técnica cae o si crecimiento acelera.

### Visión por computadora y feedback (full)
- Captura:
  - Guía de ángulo (frontal, lateral, 45°), distancia, y “body-in-frame”.
  - Smart timer: no empieza hasta encuadre correcto y pose estable.
- Pose:
  - MediaPipe Pose o MoveNet en TensorFlow Lite.
  - Suavizado temporal y control de jitter.
- Calibración obligatoria:
  - T‑Pose de 3 segundos al inicio de cada sesión con cámara para normalizar distancias por escala (altura en píxeles).
- Métrica técnica:
  - Métricas robustas por comparación relativa, no “grados perfectos”.
  - Detección de valgo por desplazamiento relativo: si la rodilla se mueve >5% hacia adentro vs tobillo durante la bajada -> alerta.
  - Detección de compensaciones (cadera rota, tronco colapsa, rodilla adelantada).
- Conteo y calidad:
  - Conteo por fases (concéntrica/excéntrica) con umbrales de movimiento.
  - Stop de serie por pérdida de velocidad >20% o técnica degradada sostenida.

### Datos, privacidad y compartición (full)
- Default: guardar métricas y resultados; video sólo local (si se habilita).
- Export: CSV/PDF de progreso y tests.
- Compartir: links privados por sesión o por reporte (si usan backend).
- Modo privado: sin social, sin ranking, sólo coach‑atleta.

### Social (full, pero controlado)
- Micro‑ligas privadas: por nivel, edad biológica aproximada, o “grupo de amigos”.
- Leaderboards “sanos”: por adherencia, mejoras propias y técnica; no solo “más rápido”.

## Arquitectura técnica (detallada)
### App (Flutter)
- Módulos: Auth, Perfil, Cámara, Pose Engine, Reglas/Programación, Biblioteca, Tests, Mental, Reportes, Sincronización.
- Offline‑first:
  - SQLite como fuente de verdad local.
  - Cola de eventos para sincronización cuando haya internet.
- Audio/háptico:
  - Text‑to‑Speech nativo para feedback continuo.
  - Vibración corta para rep válida, larga para corrección.

### Motor de pose (pipeline)
- Frame -> landmarks -> smoothing -> features (ángulos/distancias) -> estado (fase rep) -> eventos (rep/alerta) -> persistencia (métricas).
- Calibración:
  - T‑Pose 3 segundos para escala (normalización) y ángulo.
  - Validación de luz y encuadre antes de iniciar.

### Backend (si se activa)
- Supabase recomendado:
  - Auth (coach/atleta), Postgres, Storage sólo para reportes (no video por defecto).
  - RLS para que sólo el coach vea los datos del atleta.
- Sin backend:
  - Todo local + export manual (PDF/CSV).

## Backlog full (épicas)
- App base offline‑first (perfiles, sesiones, calendario, biblioteca).
- Pose Engine on‑device (captura, calibración, estabilidad, performance).
- FMS full (7 pruebas, asimetrías, scoring, correctivos).
- Motor de reglas y seguridad (PHV, dolor, RPE, bloqueos).
- Programación semanal automática (por partido/descanso/objetivo).
- Calistenia fútbol (progresiones y medición por cámara donde aplique).
- Animal Flow (flows y recuperación post‑partido).
- Tests y benchmarks (CMJ/30m/505/Yo‑Yo) + radar plot y tendencias.
- Mental (visualización por rol, Flush It, drills cognitivos).
- Gamificación (avatar, streaks, monedas, loot estético).
- Reportes (semanal/mensual) y export/share.
- Micro‑ligas privadas (si se decide activar social).

## Roadmap hasta terminar (v1.0 “full”)
### Semana 13–16: FMS full + seguridad fuerte
- Completar 7 pruebas FMS y motor correctivo completo.
- Reglas de bloqueo y descarga más finas (PHV + dolor + fatiga).
- Reporte mensual automático listo para usar.

### Semana 17–20: Entrenamiento full + medición más sólida
- Progresiones completas de calistenia y AF.
- Mejoras en conteo/calidad por ejercicio (tolerancias por cámara).
- Benchmarks con validaciones y repetibilidad (consistencia).

### Semana 21–24: Pulido “élite” y cierre v1.0
- UX de cámara impecable (colocación, warnings, tutoriales cortos).
- Estabilidad, rendimiento, y “cero fricción” para sesiones.
- Criterios de terminado cumplidos y release v1.0.

## Criterios de terminado (v1.0)
- El atleta puede entrenar 3–5 veces/semana sin fricción y sin internet.
- FMS 7/7 con scoring y rutas correctivas utilizables.
- Plan semanal automático usable por el coach y editable.
- Tests básicos con tendencias y radar plot estable.
- Reporte semanal y mensual compartible.
- Privacidad por defecto (sin video en nube) y control parental claro.

## Estrategia para que sea 100% gratis en la práctica
- IA siempre en el teléfono: no se paga inferencia en servidores.
- No subir video: guardar sólo métricas/landmarks agregados y reportes.
- Usar Supabase sólo para autenticación/sync cuando haga falta; si no, todo local.
- Limitar Storage a PDFs y mini‑assets; el contenido pesado queda dentro de la app.

## Modelo de datos (mínimo pero completo)
### Local (SQLite)
- athlete: id, nombre, fecha_nacimiento, posición, lateralidad.
- athlete_measurements: id, athlete_id, date, height_cm, weight_kg, sitting_height_cm.
- session: id, athlete_id, fecha, tipo, duración, objetivo, RPE, dolor, sueño_energía, notas_coach.
- exercise_set: id, session_id, ejercicio, reps, tiempo, carga_relativa, stop_reason, técnica_score.
- pose_metric: id, session_id, ejercicio, métrica, valor, unidad, timestamp.
- test_result: id, athlete_id, test, valor, unidad, fecha, condiciones.
- fms_result: id, athlete_id, prueba, score, lado, dolor, fecha.
- rewards: id, athlete_id, coins, items, streak, fechas.

### Cloud (si se activa Supabase)
- Mismas entidades, con sincronización por athlete_id.
- Política: un coach es dueño del athlete y sólo ese coach puede leer/escribir.

## APIs / sincronización (si se activa backend)
- Auth: coach y atleta (atleta puede ir “sin login” si se usa sólo local).
- Sync: subir/bajar sesiones, resultados y reportes.
- Compartir: generar link privado a un reporte (expira) si se desea.

## Plan de pruebas y validación (para terminar bien)
- Pruebas de pose:
  - Repetibilidad: mismo ejercicio, misma sesión, variación dentro de tolerancia.
  - Robustez: luz baja/media, fondo con ruido, ropa holgada, distintos teléfonos.
  - Colocación: frontal/lateral/45° con guía y tasa de fallos baja.
- Pruebas de conteo:
  - Reps correctas contadas en rango esperado.
  - Falsos positivos bajos en pausas y transiciones.
- Pruebas de reglas:
  - Bloqueos por dolor/score FMS/PHV se aplican siempre.
  - Descargas automáticas no rompen el plan y quedan registradas.
- Pruebas de UX:
  - “Entrenar” en 2 toques desde Home.
  - Feedback audible sin mirar pantalla.
- Pruebas de datos:
  - Offline completo, luego sync sin duplicados.
  - Export PDF/CSV consistente.

## Despliegue y operación (gratis)
- Android:
  - Build local o CI con GitHub Actions.
  - Distribución privada: APK/AAB por link o track interno.
- iOS:
  - Requiere Mac para compilar/firma o un servicio de build; si no, se queda Android.
- Monitoreo:
  - Sentry para errores de app.
  - Si hay backend: métricas simples y alertas en Grafana Cloud.

## Límites gratis y cómo no pegarlos
- Supabase (free): usar Storage mínimo (sólo PDFs), no guardar video.
- Fly.io (free): sólo si de verdad se necesita API propia; si no, evitar backend.
- Cloudflare R2 (free): usar sólo si hay assets externos grandes; si no, empaquetar en app.

## Post‑v1.0 (opcional, si quieren ir todavía más élite)
- Multi‑ángulo: capturar dos vistas (dos teléfonos) y fusionar métricas.
- Personalización avanzada por rol y calendario competitivo.
- Modelos por ejercicio: detectores especializados para 10–15 ejercicios clave.
- Modo “academia”: varios atletas, 1 coach, con privacidad por grupo.
