
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import VersusMode from './pages/versus-mode/VersusMode';
import './Animations.css';
import Location from './pages/location/Location';
import GaragePage from './pages/garage/GaragePage';
import GuessGame from './pages/guess-game/GuessGame';
import BattleGame from './pages/battle-game/BattleGame';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/versus-mode" element={<VersusMode />} />
          <Route path="/versus-mode" element={<VersusMode />} />
          <Route path="/location" element={<Location />} />
          <Route path="/garage" element={<GaragePage />} />
          <Route path="/minigames/guess" element={<GuessGame />} />
          <Route path="/minigames/battle" element={<BattleGame />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
