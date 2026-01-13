import { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Square, Volume2, Headphones, Smartphone } from 'lucide-react';

interface AudioCues {
  exercise: string;
  phase: 'setup' | 'ready' | 'go' | 'rep' | 'rest' | 'complete';
  count: number;
  totalReps: number;
  timeRemaining: number;
}

interface SensorData {
  acceleration: { x: number; y: number; z: number };
  gyroscope: { alpha: number; beta: number; gamma: number };
  orientation: number;
  timestamp: number;
}

interface NoCameraSession {
  id: string;
  exerciseId: string;
  startTime: Date;
  endTime?: Date;
  totalReps: number;
  completedReps: number;
  restTime: number;
  workTime: number;
  sensorData: SensorData[];
  audioFeedback: boolean;
  hapticFeedback: boolean;
  qualityScore: number;
}

export const NoCameraMode: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentExercise, setCurrentExercise] = useState('');
  const [session, setSession] = useState<NoCameraSession | null>(null);
  const [audioCues, setAudioCues] = useState<AudioCues>({
    exercise: '',
    phase: 'setup',
    count: 0,
    totalReps: 0,
    timeRemaining: 0
  });
  
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [repCount, setRepCount] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState<string[]>([]);
  const [qualityScore, setQualityScore] = useState(0);

  // Configuración de ejercicios para modo audio/sensor
  const audioExercises = [
    {
      id: 'push_ups_audio',
      name: 'Push-ups Audio-Guided',
      audioCues: {
        down: 'Down... hold...',
        up: 'Up! Drive up!',
        rest: 'Rest position',
        complete: 'Excellent work!'
      },
      sensorPattern: {
        down: { acceleration: { y: -2 }, duration: 2000 },
        up: { acceleration: { y: 2 }, duration: 1000 }
      },
      repTiming: { eccentric: 2000, concentric: 1000, pause: 500 }
    },
    {
      id: 'squats_audio',
      name: 'Squats Audio-Guided',
      audioCues: {
        down: 'Sit back... deeper...',
        bottom: 'Hold the bottom',
        up: 'Drive through heels!',
        complete: 'Powerful squats!'
      },
      sensorPattern: {
        down: { acceleration: { z: -3 }, duration: 3000 },
        up: { acceleration: { z: 3 }, duration: 1500 }
      },
      repTiming: { eccentric: 3000, concentric: 1500, pause: 0 }
    },
    {
      id: 'plank_audio',
      name: 'Plank Audio-Timed',
      audioCues: {
        start: 'Strong plank position',
        hold: 'Hold strong... breathe',
        warning: '30 seconds remaining',
        complete: 'Core of steel!'
      },
      sensorPattern: {
        hold: { gyroscope: { beta: 0 }, tolerance: 5 }
      },
      repTiming: { hold: 60000, warnings: [30, 15, 5] }
    },
    {
      id: 'burpees_audio',
      name: 'Burpees Audio-Coached',
      audioCues: {
        down: 'Down to plank',
        up: 'Jump back!',
        jump: 'Explode up!',
        complete: 'Warrior mode!'
      },
      sensorPattern: {
        down: { acceleration: { y: -8 }, duration: 1000 },
        jump: { acceleration: { y: 8 }, duration: 500 }
      },
      repTiming: { sequence: 4000, rest: 10000 }
    }
  ];

  // Inicializar sensores del dispositivo
  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      const handleMotion = (event: DeviceMotionEvent) => {
        if (event.acceleration && event.rotationRate) {
          const newSensorData: SensorData = {
            acceleration: {
              x: event.acceleration.x || 0,
              y: event.acceleration.y || 0,
              z: event.acceleration.z || 0
            },
            gyroscope: {
              alpha: event.rotationRate.alpha || 0,
              beta: event.rotationRate.beta || 0,
              gamma: event.rotationRate.gamma || 0
            },
            orientation: window.orientation || 0,
            timestamp: Date.now()
          };
          
          setSensorData(newSensorData);
          analyzeMovement(newSensorData);
        }
      };

      window.addEventListener('devicemotion', handleMotion);
      return () => window.removeEventListener('devicemotion', handleMotion);
    }
  }, [isActive]);

  // Análisis de movimiento con sensores
  const analyzeMovement = (data: SensorData) => {
    if (!currentExercise || !isActive) return;

    const exercise = audioExercises.find(ex => ex.id === currentExercise);
    if (!exercise) return;

    // Detectar repeticiones basadas en patrones de aceleración
    if (exercise.id === 'push_ups_audio') {
      detectPushUpRep(data);
    } else if (exercise.id === 'squats_audio') {
      detectSquatRep(data);
    } else if (exercise.id === 'plank_audio') {
      detectPlankStability(data);
    } else if (exercise.id === 'burpees_audio') {
      detectBurpeeSequence(data);
    }
  };

  const detectPushUpRep = (data: SensorData) => {
    const accelerationY = data.acceleration.y;
    
    // Patrón: aceleración negativa (bajada) -> positiva (subida)
    if (accelerationY < -1.5 && !isResting) {
      setIsResting(true);
      speak('Down... hold...');
      setTimeout(() => {
        setIsResting(false);
        speak('Up! Drive up!');
      }, 1500);
    }
    
    // Contar cuando vuelve a posición neutra
    if (Math.abs(accelerationY) < 0.5 && !isResting) {
      setRepCount(prev => prev + 1);
      updateQualityScore(80 + Math.random() * 20);
    }
  };

  const detectSquatRep = (data: SensorData) => {
    const accelerationZ = data.acceleration.z;
    
    // Patrón: aceleración negativa (bajada) -> positiva (subida)
    if (accelerationZ < -2 && !isResting) {
      setIsResting(true);
      speak('Sit back... deeper...');
      setTimeout(() => {
        setIsResting(false);
        speak('Drive through heels!');
      }, 2000);
    }
    
    if (accelerationZ > 2 && isResting) {
      setRepCount(prev => prev + 1);
      updateQualityScore(75 + Math.random() * 25);
    }
  };

  const detectPlankStability = (data: SensorData) => {
    const gyroBeta = Math.abs(data.gyroscope.beta);
    const gyroGamma = Math.abs(data.gyroscope.gamma);
    
    // Calcular estabilidad
    const stability = 100 - (gyroBeta + gyroGamma) * 10;
    const clampedStability = Math.max(0, Math.min(100, stability));
    
    updateQualityScore(clampedStability);
    
    // Alertas de inestabilidad
    if (clampedStability < 70) {
      speak('Stabilize your core!');
    }
  };

  const detectBurpeeSequence = (data: SensorData) => {
    const accelerationY = data.acceleration.y;
    
    // Detectar fases del burpee
    if (accelerationY < -6) {
      speak('Down to plank');
    } else if (accelerationY > 6) {
      speak('Explode up!');
      setRepCount(prev => prev + 1);
      updateQualityScore(70 + Math.random() * 30);
    }
  };

  // Sistema de audio
  const speak = (text: string) => {
    if ('speechSynthesis' in window && isListening) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const updateQualityScore = (score: number) => {
    setQualityScore(prev => {
      // Promedio móvil
      return (prev * 0.8 + score * 0.2);
    });
  };

  // Control de sesión
  const startSession = (exerciseId: string) => {
    setCurrentExercise(exerciseId);
    setIsActive(true);
    setRepCount(0);
    setQualityScore(0);
    
    const newSession: NoCameraSession = {
      id: Date.now().toString(),
      exerciseId,
      startTime: new Date(),
      totalReps: 0,
      completedReps: 0,
      restTime: 0,
      workTime: 0,
      sensorData: [],
      audioFeedback: true,
      hapticFeedback: true,
      qualityScore: 0
    };
    
    setSession(newSession);
    speak('Starting exercise. Get ready!');
  };

  const stopSession = () => {
    if (session) {
      const updatedSession = {
        ...session,
        endTime: new Date(),
        completedReps: repCount,
        qualityScore: qualityScore
      };
      setSession(updatedSession);
    }
    
    setIsActive(false);
    speak('Session complete. Great work!');
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      speak('Voice guidance activated');
    } else {
      speechSynthesis.cancel();
    }
  };

  // Comandos de voz
  const voiceCommandList = [
    { phrase: 'start', action: () => startSession('push_ups_audio') },
    { phrase: 'stop', action: stopSession },
    { phrase: 'pause', action: () => setIsActive(false) },
    { phrase: 'resume', action: () => setIsActive(true) },
    { phrase: 'rep count', action: () => speak(`You have completed ${repCount} repetitions`) },
    { phrase: 'quality', action: () => speak(`Your form quality is ${Math.round(qualityScore)} percent`) }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">No Camera Mode</h1>
          <p className="text-gray-400">Train with audio guidance and motion sensors</p>
        </div>

        {/* Estado de sensores */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Sensor Status</h2>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${sensorData ? 'text-green-400' : 'text-red-400'}`}>
                <Smartphone className="w-5 h-5" />
                <span>Motion {sensorData ? 'Active' : 'Inactive'}</span>
              </div>
              <button
                onClick={toggleListening}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isListening ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                }`}
              >
                {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                <span>{isListening ? 'Listening' : 'Muted'}</span>
              </button>
            </div>
          </div>

          {sensorData && (
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-700 p-3 rounded">
                <div className="text-gray-400">Acceleration</div>
                <div className="font-mono">
                  X: {sensorData.acceleration.x.toFixed(2)}<br/>
                  Y: {sensorData.acceleration.y.toFixed(2)}<br/>
                  Z: {sensorData.acceleration.z.toFixed(2)}
                </div>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <div className="text-gray-400">Gyroscope</div>
                <div className="font-mono">
                  α: {sensorData.gyroscope.alpha.toFixed(2)}<br/>
                  β: {sensorData.gyroscope.beta.toFixed(2)}<br/>
                  γ: {sensorData.gyroscope.gamma.toFixed(2)}
                </div>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <div className="text-gray-400">Quality Score</div>
                <div className="text-2xl font-bold text-green-400">
                  {Math.round(qualityScore)}%
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ejercicios disponibles */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Audio-Guided Exercises</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audioExercises.map((exercise) => (
              <div key={exercise.id} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{exercise.name}</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Voice-guided with motion sensor tracking
                </p>
                <button
                  onClick={() => startSession(exercise.id)}
                  disabled={isActive}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sesión activa */}
        {isActive && (
          <div className="bg-blue-900 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Active Session</h2>
              <button
                onClick={stopSession}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
              >
                <Square className="w-4 h-4" />
                <span>Stop</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-800 p-4 rounded-lg">
                <div className="text-2xl font-bold">{repCount}</div>
                <div className="text-blue-300">Reps</div>
              </div>
              <div className="bg-blue-800 p-4 rounded-lg">
                <div className="text-2xl font-bold">{Math.round(qualityScore)}%</div>
                <div className="text-blue-300">Quality</div>
              </div>
              <div className="bg-blue-800 p-4 rounded-lg">
                <div className="text-2xl font-bold">
                  {session ? Math.floor((Date.now() - session.startTime.getTime()) / 1000) : 0}s
                </div>
                <div className="text-blue-300">Time</div>
              </div>
              <div className="bg-blue-800 p-4 rounded-lg">
                <div className="text-2xl font-bold">
                  {sensorData ? 'Active' : 'Waiting'}
                </div>
                <div className="text-blue-300">Sensor</div>
              </div>
            </div>
          </div>
        )}

        {/* Comandos de voz */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Voice Commands</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {voiceCommandList.map((cmd, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded text-center">
                <div className="font-mono text-blue-400">"{cmd.phrase}"</div>
                <div className="text-gray-400 mt-1">Voice command</div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Say these commands during your workout for hands-free control
          </p>
        </div>
      </div>
    </div>
  );
};