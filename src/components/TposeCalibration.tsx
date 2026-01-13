import React, { useState, useEffect, useRef } from 'react';
import { Camera, Timer, CheckCircle, AlertTriangle } from 'lucide-react';

interface CalibrationResult {
  success: boolean;
  scale: number;
  landmarks: any[];
  timestamp: string;
  quality: number;
}

interface TPoseCalibrationProps {
  onCalibrationComplete: (result: CalibrationResult) => void;
  onSkip: () => void;
  isRequired?: boolean;
}

export const TPoseCalibration: React.FC<TPoseCalibrationProps> = ({
  onCalibrationComplete,
  onSkip,
  isRequired = true
}) => {
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [currentStep, setCurrentStep] = useState(0);
  const [calibrationResults, setCalibrationResults] = useState<CalibrationResult[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const steps = [
    {
      title: 'Posición T-Pose Frontal',
      description: 'Brazos extendidos completamente horizontal, palmas hacia abajo',
      instruction: 'Mantén esta posición 3 segundos'
    },
    {
      title: 'Posición T-Pose Lateral Derecha',
      description: 'Gira 90° derecha, brazos extendidos',
      instruction: 'Mantén esta posición 3 segundos'
    },
    {
      title: 'Posición T-Pose Lateral Izquierda',
      description: 'Gira 90° izquierda, brazos extendidos',
      instruction: 'Mantén esta posición 3 segundos'
    },
    {
      title: 'Posición de Referencia',
      description: 'Brazos relajados a los lados, postura natural',
      instruction: 'Mantén esta posición 3 segundos'
    }
  ];

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: 1280, 
          height: 720,
          facingMode: 'user'
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startCalibration = () => {
    setIsCalibrating(true);
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          captureCalibrationFrame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const captureCalibrationFrame = async () => {
    try {
      // Simular detección de pose con MediaPipe
      const mockLandmarks = generateMockLandmarks();
      const mockScale = calculateMockScale(mockLandmarks);
      const mockQuality = calculateMockQuality(mockLandmarks);

      const result: CalibrationResult = {
        success: mockQuality > 0.8,
        scale: mockScale,
        landmarks: mockLandmarks,
        timestamp: new Date().toISOString(),
        quality: mockQuality
      };

      setCalibrationResults(prev => [...prev, result]);
      
      if (currentStep < steps.length - 1) {
        // Siguiente paso
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setCountdown(3);
          setIsCalibrating(false);
        }, 1000);
      } else {
        // Calibración completa
        const finalResult = calculateFinalCalibration();
        onCalibrationComplete(finalResult);
      }
    } catch (error) {
      console.error('Calibration error:', error);
      setIsCalibrating(false);
    }
  };

  const generateMockLandmarks = () => {
    // Simular landmarks de MediaPipe para T-Pose
    const basePositions = {
      nose: { x: 0.5, y: 0.3, z: 0, visibility: 0.99 },
      left_shoulder: { x: 0.3, y: 0.5, z: 0, visibility: 0.99 },
      right_shoulder: { x: 0.7, y: 0.5, z: 0, visibility: 0.99 },
      left_elbow: { x: 0.2, y: 0.5, z: 0, visibility: 0.99 },
      right_elbow: { x: 0.8, y: 0.5, z: 0, visibility: 0.99 },
      left_wrist: { x: 0.1, y: 0.5, z: 0, visibility: 0.99 },
      right_wrist: { x: 0.9, y: 0.5, z: 0, visibility: 0.99 },
      left_hip: { x: 0.4, y: 0.7, z: 0, visibility: 0.99 },
      right_hip: { x: 0.6, y: 0.7, z: 0, visibility: 0.99 },
      left_knee: { x: 0.4, y: 0.85, z: 0, visibility: 0.99 },
      right_knee: { x: 0.6, y: 0.85, z: 0, visibility: 0.99 },
      left_ankle: { x: 0.4, y: 1.0, z: 0, visibility: 0.99 },
      right_ankle: { x: 0.6, y: 1.0, z: 0, visibility: 0.99 }
    };

    // Añadir variabilidad realista
    const variation = 0.05;
    return Object.entries(basePositions).map(([name, pos]) => ({
      name,
      x: pos.x + (Math.random() - 0.5) * variation,
      y: pos.y + (Math.random() - 0.5) * variation,
      z: pos.z + (Math.random() - 0.5) * variation * 0.5,
      visibility: Math.max(0.95, pos.visibility - Math.random() * 0.05)
    }));
  };

  const calculateMockScale = (landmarks: any[]): number => {
    // Calcular escala basada en distancia hombro-hombro y altura
    const leftShoulder = landmarks.find(l => l.name === 'left_shoulder');
    const rightShoulder = landmarks.find(l => l.name === 'right_shoulder');
    const nose = landmarks.find(l => l.name === 'nose');
    const leftAnkle = landmarks.find(l => l.name === 'left_ankle');

    const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x);
    const bodyHeight = Math.abs(leftAnkle.y - nose.y);
    
    return (shoulderWidth * bodyHeight) * 100; // Escala normalizada
  };

  const calculateMockQuality = (landmarks: any[]): number => {
    // Evaluar calidad de T-Pose
    let score = 100;
    
    // Verificar alineación de hombros
    const leftShoulder = landmarks.find(l => l.name === 'left_shoulder');
    const rightShoulder = landmarks.find(l => l.name === 'right_shoulder');
    const shoulderLevel = Math.abs(leftShoulder.y - rightShoulder.y);
    if (shoulderLevel > 0.05) score -= 20;
    
    // Verificar extensión de brazos
    const leftElbow = landmarks.find(l => l.name === 'left_elbow');
    const rightElbow = landmarks.find(l => l.name === 'right_elbow');
    const elbowBend = Math.abs(leftElbow.y - leftShoulder.y) + Math.abs(rightElbow.y - rightShoulder.y);
    if (elbowBend > 0.1) score -= 30;
    
    // Verificar visibilidad
    const avgVisibility = landmarks.reduce((sum, l) => sum + l.visibility, 0) / landmarks.length;
    if (avgVisibility < 0.95) score -= 25;
    
    return Math.max(0, score);
  };

  const calculateFinalCalibration = (): CalibrationResult => {
    const validResults = calibrationResults.filter(r => r.success);
    
    if (validResults.length === 0) {
      return {
        success: false,
        scale: 0,
        landmarks: [],
        timestamp: new Date().toISOString(),
        quality: 0
      };
    }
    
    const avgScale = validResults.reduce((sum, r) => sum + r.scale, 0) / validResults.length;
    const avgQuality = validResults.reduce((sum, r) => sum + r.quality, 0) / validResults.length;
    
    return {
      success: avgQuality > 75,
      scale: avgScale,
      landmarks: validResults[validResults.length - 1].landmarks,
      timestamp: new Date().toISOString(),
      quality: avgQuality
    };
  };

  const resetCalibration = () => {
    setCurrentStep(0);
    setCalibrationResults([]);
    setIsCalibrating(false);
    setCountdown(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Camera className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">CALIBRACIÓN T-POSE</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Calibración obligatoria para detección precisa de movimiento
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-sm font-medium ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                Paso {index + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Paso actual */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600 mb-2">{steps[currentStep].description}</p>
          <p className="text-blue-600 font-medium">{steps[currentStep].instruction}</p>
        </div>

        {/* Video y calibración */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-64 object-cover rounded-lg border-4 border-gray-200"
            />
            
            {isCalibrating && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="text-center text-white">
                  <Timer className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                  <div className="text-6xl font-bold">{countdown}</div>
                  <p className="text-lg mt-2">Mantén la posición</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Instrucciones de calibración:</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Brazos completamente extendidos</li>
                <li>• Postura erguida y estable</li>
                <li>• Mirada al frente</li>
                <li>• Respiración normal</li>
              </ul>
            </div>

            {calibrationResults.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-900">Calibración {currentStep + 1}</span>
                </div>
                <p className="text-green-800 text-sm">
                  Calidad: {calibrationResults[calibrationResults.length - 1].quality.toFixed(1)}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Controles */}
        <div className="flex justify-between">
          {!isCalibrating && (
            <button
              onClick={startCalibration}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              Iniciar Calibración
            </button>
          )}

          <div className="flex space-x-4">
            <button
              onClick={resetCalibration}
              className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reiniciar
            </button>
            
            {!isRequired && (
              <button
                onClick={onSkip}
                className="px-4 py-3 bg-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-300 transition-colors"
              >
                Saltar
              </button>
            )}
          </div>
        </div>

        {/* Advertencia de obligatoriedad */}
        {isRequired && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-800 font-medium">
                Esta calibración es obligatoria para garantizar mediciones precisas
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};