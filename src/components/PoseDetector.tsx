import React, { useRef, useEffect, useState } from 'react';

interface PoseLandmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

interface PoseResults {
  landmarks: PoseLandmark[];
  poseWorldLandmarks: PoseLandmark[];
}

export const PoseDetector: React.FC<{
  onPoseDetected: (results: PoseResults) => void;
  isActive: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
}> = ({ onPoseDetected, isActive, videoRef: externalVideoRef }) => {
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = externalVideoRef || internalVideoRef;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);

  useEffect(() => {
    if (isActive && !isModelLoaded) {
      initializePoseDetection();
    }
  }, [isActive, isModelLoaded]);

  const initializePoseDetection = async () => {
    try {
      // Simular carga del modelo MediaPipe
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsModelLoaded(true);
      startCamera();
    } catch (error) {
      console.error('Error initializing pose detection:', error);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          startDetection();
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startDetection = () => {
    const detectPose = () => {
      if (videoRef.current && canvasRef.current && isActive) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Dibujar video en canvas
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          
          // Simular detección de puntos clave
          const mockLandmarks = generateMockLandmarks(canvas.width, canvas.height);
          
          // Dibujar puntos y conexiones
          drawLandmarks(ctx, mockLandmarks);
          drawConnections(ctx, mockLandmarks);
          
          // Análisis de ángulos
          const analysis = analyzePose(mockLandmarks);
          drawAnalysis(ctx, analysis);
          
          // Contador de detecciones
          setDetectionCount(prev => prev + 1);
          
          // Notificar resultados
          onPoseDetected({
            landmarks: mockLandmarks,
            poseWorldLandmarks: mockLandmarks
          });
        }
      }
      
      if (isActive) {
        requestAnimationFrame(detectPose);
      }
    };
    
    detectPose();
  };

  const generateMockLandmarks = (width: number, height: number): PoseLandmark[] => {
    const centerX = width / 2;
    const centerY = height / 2;
    
    return [
      // Nariz
      { x: centerX, y: centerY - 200, z: 0, visibility: 0.9 },
      // Hombros
      { x: centerX - 50, y: centerY - 150, z: 0, visibility: 0.9 },
      { x: centerX + 50, y: centerY - 150, z: 0, visibility: 0.9 },
      // Caderas
      { x: centerX - 40, y: centerY - 50, z: 0, visibility: 0.9 },
      { x: centerX + 40, y: centerY - 50, z: 0, visibility: 0.9 },
      // Rodillas
      { x: centerX - 35, y: centerY + 50, z: 0, visibility: 0.8 },
      { x: centerX + 35, y: centerY + 50, z: 0, visibility: 0.8 },
      // Tobillos
      { x: centerX - 30, y: centerY + 150, z: 0, visibility: 0.7 },
      { x: centerX + 30, y: centerY + 150, z: 0, visibility: 0.7 },
    ];
  };

  const drawLandmarks = (ctx: CanvasRenderingContext2D, landmarks: PoseLandmark[]) => {
    landmarks.forEach((landmark, index) => {
      if (landmark.visibility > 0.5) {
        ctx.beginPath();
        ctx.arc(landmark.x, landmark.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = index < 2 ? '#ff0000' : '#00ff00';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, landmarks: PoseLandmark[]) => {
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    
    // Conexiones principales (simuladas)
    const connections = [
      [0, 1], [0, 2], // nariz a hombros
      [1, 3], [2, 4], // hombros a caderas
      [3, 5], [4, 6], // caderas a rodillas
      [5, 7], [6, 8], // rodillas a tobillos
    ];
    
    connections.forEach(([start, end]) => {
      if (landmarks[start] && landmarks[end] && 
          landmarks[start].visibility > 0.5 && 
          landmarks[end].visibility > 0.5) {
        ctx.beginPath();
        ctx.moveTo(landmarks[start].x, landmarks[start].y);
        ctx.lineTo(landmarks[end].x, landmarks[end].y);
        ctx.stroke();
      }
    });
  };

  const analyzePose = (landmarks: PoseLandmark[]) => {
    // Análisis simplificado de ángulos
    const leftKnee = landmarks[5];
    const rightKnee = landmarks[6];
    const leftHip = landmarks[3];
    const rightHip = landmarks[4];
    
    // Calcular valgo (ángulo entre cadera y rodilla)
    const leftValgo = calculateAngle(leftHip, leftKnee);
    const rightValgo = calculateAngle(rightHip, rightKnee);
    
    return {
      leftValgo,
      rightValgo,
      averageValgo: (leftValgo + rightValgo) / 2,
      quality: Math.max(0, 100 - Math.abs(leftValgo - rightValgo) * 2)
    };
  };

  const calculateAngle = (point1: PoseLandmark, point2: PoseLandmark): number => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const drawAnalysis = (ctx: CanvasRenderingContext2D, analysis: any) => {
    // Mostrar métricas en pantalla
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 10, 200, 80);
    ctx.fillStyle = '#000000';
    ctx.font = '14px Arial';
    ctx.fillText(`Valgo Izq: ${analysis.leftValgo.toFixed(1)}°`, 20, 30);
    ctx.fillText(`Valgo Der: ${analysis.rightValgo.toFixed(1)}°`, 20, 50);
    ctx.fillText(`Calidad: ${analysis.quality.toFixed(0)}%`, 20, 70);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-2">Video en Vivo</h4>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover"
              />
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                  <p className="text-white text-sm">Activar detección de poses</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-700 mb-2">Análisis de IA</h4>
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                width={320}
                height={240}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                FPS: {detectionCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">85°</div>
          <div className="text-sm text-green-700">Ánglo Rodilla</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">3°</div>
          <div className="text-sm text-yellow-700">Valgo Promedio</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">92%</div>
          <div className="text-sm text-blue-700">Calidad</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">30</div>
          <div className="text-sm text-purple-700">FPS</div>
        </div>
      </div>
    </div>
  );
};