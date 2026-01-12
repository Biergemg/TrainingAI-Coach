import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { CameraAI } from './components/CameraAI';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { Progress } from './components/Progress';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exercises" element={<ExerciseLibrary />} />
          <Route path="/camera" element={<CameraAI />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/achievements" element={<div>Logros - En desarrollo</div>} />
          <Route path="/settings" element={<div>Configuración - En desarrollo</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;