# TrainingAI Coach

Una aplicación web de análisis de técnica deportiva con IA para entrenamiento personal. Desarrollada con React, TypeScript y MediaPipe para detección de poses en tiempo real.

## Características Principales

### 🎯 Análisis de Movimiento en Tiempo Real
- **Detección de poses** usando MediaPipe
- **Análisis de valgo** de rodilla durante ejercicios
- **Calidad de movimiento** medida en porcentaje
- **Alertas instantáneas** cuando la técnica no es óptima

### 📊 Progreso y Estadísticas
- **Seguimiento de progreso** semana a semana
- **Métricas detalladas** de cada sesión
- **Logros y objetivos** personalizados
- **Análisis de tendencias** para mejorar la técnica

### 📚 Biblioteca de Ejercicios
- **FMS (Functional Movement Screen)** para evaluación básica
- **Animal Flow** para movilidad y control corporal
- **Calistenia** progresiva y adaptativa
- **Plyometría** con controles de seguridad

### 🔒 Privacidad y Seguridad
- **Procesamiento local** - los datos no salen de tu dispositivo
- **Modo offline** completo
- **Sin cuentas obligatorias** - empieza a entrenar inmediatamente
- **Control total** sobre tus datos

## Instalación y Uso

### Requisitos Previos
- Node.js 18+ 
- Navegador moderno con soporte para WebRTC
- Cámara web o cámara del dispositivo móvil

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd training-ai-coach

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

### Uso
1. **Abrir la aplicación** en tu navegador
2. **Permitir acceso a la cámara** cuando se solicite
3. **Seleccionar un ejercicio** de la biblioteca
4. **Posicionarte** frente a la cámara
5. **Realizar el ejercicio** mientras la IA analiza tu técnica
6. **Ver las métricas** y mejorar con cada sesión

## Características Técnicas

### Stack Tecnológico
- **Frontend**: React 18 + TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: Zustand
- **IA**: MediaPipe Pose
- **PWA**: Service Worker para modo offline
- **Build**: Vite

### Arquitectura
- **Componentes modulares** y reutilizables
- **Store centralizado** para estado de la aplicación
- **Detección de poses** en tiempo real (30 FPS)
- **Análisis de ángulos** y detección de valgo
- **Sistema de progresión** adaptativa

## Ejercicios Disponibles

### FMS (Functional Movement Screen)
- Deep Squat
- Hurdle Step
- Inline Lunge
- Shoulder Mobility
- Active Straight-Leg Raise
- Trunk Stability Push-up
- Rotary Stability

### Animal Flow
- Beast Reach
- Crab Reach
- Scorpion Reach
- Ape Reach
- Loaded Beast
- Front Step Through

### Calistenia
- Push-ups progresivos
- Squats con análisis de valgo
- Planks con control de forma
- Nordic curls con medición de ángulo

### Plyometría (con controles de seguridad)
- Saltos verticales (CMJ)
- Saltos de longitud
- Saltos laterales
- Ejercicios de reacción

## Seguridad y Privacidad

### Procesamiento Local
- Todos los análisis se realizan en tu dispositivo
- No se envían videos ni datos personales a servidores externos
- La IA corre completamente en tu navegador

### Controles de Seguridad
- **Detección de fatiga**: Se detiene automáticamente si la calidad baja
- **Alertas de valgo**: Notificaciones cuando la técnica no es óptima
- **Límites de repetición**: Previene sobreentrenamiento
- **Modo seguro**: Para principiantes o rehabilitación

### Datos Personales
- **Sin registro obligatorio**: Usa la app sin crear cuenta
- **Datos locales**: Toda la información se guarda en tu dispositivo
- **Exportación opcional**: Puedes exportar tus datos si lo deseas
- **Borrado completo**: Elimina todos tus datos cuando quieras

## Mejora Continua

### Feedback del Usuario
La aplicación aprende de tus patrones y:
- Ajusta la dificultad de los ejercicios
- Personaliza las recomendaciones
- Adapta los tiempos de descanso
- Sugiere ejercicios complementarios

### Análisis de Tendencias
- Identifica mejoras en la técnica
- Detecta patrones de fatiga
- Sugiere cambios en la rutina
- Predice posibles lesiones

## Soporte

### Problemas Comunes
1. **La cámara no funciona**: Asegúrate de dar permisos en tu navegador
2. **Detección lenta**: Cierra otras aplicaciones que usen la cámara
3. **Métricas inestables**: Mejora la iluminación del espacio
4. **App no responde**: Recarga la página o reinicia el navegador

### Requisitos del Sistema
- **Navegador**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Cámara**: Resolución mínima 640x480
- **Iluminación**: Ambiente bien iluminado sin sombras fuertes
- **Espacio**: 2x2 metros libres para movimiento

## Contribuir

¡Las contribuciones son bienvenidas! Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## Agradecimientos

- [MediaPipe](https://mediapipe.dev/) por la tecnología de detección de poses
- [React](https://reactjs.org/) por el framework frontend
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [Lucide](https://lucide.dev/) por los iconos

---

**TrainingAI Coach** - Tu asistente personal para un entrenamiento más inteligente y seguro. 💪✨