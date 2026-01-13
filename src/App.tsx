import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EliteTrainingSystem } from './components/EliteTrainingSystem';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EliteTrainingSystem />} />
        <Route path="/athlete/:athleteId" element={<EliteTrainingSystem />} />
      </Routes>
    </Router>
  );
}

export default App;